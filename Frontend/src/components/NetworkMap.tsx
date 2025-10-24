import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl, AttributionControl, Polygon, CircleMarker, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import stationSvg from "../assets/preset/symbols/general/station.svg";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Station = { id: string; name: string; lat: number; lng: number };

type NetworkMapProps = {
  size?: string;
  height?: string;
  showLegend?: boolean;
  horizontal?: boolean;
  blueprintStations?: Station[]; // you can pass stations extracted from your blueprint
  mapMode?: 'track' | 'live';
};

// Helper: create a small platform polygon near the station coordinate
function createPlatform(lat: number, lng: number, idx = 0): [number, number][] {
  // offset in degrees (approx). For production convert meters to degrees per latitude.
  const latOffset = 0.00025;
  const lngOffset = 0.00045;
  // alternate side for neighboring platforms
  const sign = idx % 2 === 0 ? 1 : -1;
  return [
    [lat - latOffset, lng - sign * lngOffset] as [number, number],
    [lat - latOffset, lng + sign * lngOffset] as [number, number],
    [lat + latOffset, lng + sign * lngOffset] as [number, number],
    [lat + latOffset, lng - sign * lngOffset] as [number, number],
  ];
}

function createTrainIcon(color = "#3DBE84", heading = 0, label?: string) {
  const size = 36;
  const html = `
    <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:18px;background:${color};color:#fff;border-radius:4px;transform:rotate(${heading}deg);font-size:10px;font-weight:600;padding:2px 4px;box-shadow:0 1px 4px rgba(0,0,0,0.4);">
      ${label || ""}
    </div>`;
  return L.divIcon({ html, className: "train-div-icon", iconSize: [size, 18], iconAnchor: [size / 2, 9] });
}

// Create a simple divIcon for station name labels. We position the label visually
// to the left of the station coordinate by applying a small pixel offset via CSS
// transform. The label is non-interactive and will be rendered in the stationPane.
function createStationLabelIcon(name: string) {
  const html = `
    <div class="station-label" style="color: white; font-weight:700; font-size:12px; padding:2px 6px; background: rgba(10,10,10,0.6); border-radius:4px; white-space:nowrap; box-shadow:0 1px 4px rgba(0,0,0,0.5);">
      ${name}
    </div>`;
  return L.divIcon({ html, className: 'station-name-divicon', iconSize: undefined, iconAnchor: [0, 8] });
}

function MapPanes() {
  const map = useMap();
  useEffect(() => {
    try {
      if (!map.getPane('tracksPane')) {
        map.createPane('tracksPane');
        const p = map.getPane('tracksPane');
        if (p) p.style.zIndex = '450';
      }
      if (!map.getPane('platformPane')) {
        map.createPane('platformPane');
        const p = map.getPane('platformPane');
        if (p) p.style.zIndex = '440';
      }
      if (!map.getPane('stationPane')) {
        map.createPane('stationPane');
        const p = map.getPane('stationPane');
        if (p) p.style.zIndex = '460';
      }
    } catch (e) {
      // ignore
    }
  }, [map]);
  return null;
}

export function NetworkMap({ size, height, showLegend = true, horizontal = false, blueprintStations, mapMode = 'live' }: NetworkMapProps) {
  const mapHeight = horizontal ? (height || "260px") : height || "500px";
  // Default blueprint: replace these with stations from your PDF/blueprint
  const defaultStations: Station[] = [
    { id: "S1", name: "Station A", lat: 19.4489, lng: 72.8203 },
    { id: "S2", name: "Station B", lat: 19.4689, lng: 72.8303 },
    { id: "S3", name: "Station C", lat: 19.4889, lng: 72.8403 },
  ];

  const stations = blueprintStations && blueprintStations.length > 0 ? blueprintStations : defaultStations;

  const center: [number, number] = horizontal ? [stations[0].lat, stations[0].lng] : [stations[Math.floor(stations.length / 2)].lat, stations[Math.floor(stations.length / 2)].lng];

  const route = useMemo(() => stations.map((s) => [s.lat, s.lng] as [number, number]), [stations]);

  const wrapperStyle: React.CSSProperties | undefined = { height: mapHeight };

  // station marker icon (from preset symbols)
  const stationIcon = L.icon({
    iconUrl: stationSvg,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    className: 'station-svg-icon'
  });

  // Simulated trains state
  const [trains, setTrains] = useState(() => [
    { id: "12951", posIndex: 0, t: 0.2, heading: 0, speed: 0.0006 },
    { id: "22626", posIndex: 1, t: 0.7, heading: 45, speed: 0.00045 },
  ] as Array<{ id: string; posIndex: number; t: number; heading: number; speed: number }>);

  // Animation loop to move trains along the route
  useEffect(() => {
    const iv = setInterval(() => {
      setTrains((prev) =>
        prev.map((tr) => {
          let { posIndex, t } = tr;
          t += tr.speed;
          if (t >= 1) {
            t = 0;
            posIndex = (posIndex + 1) % Math.max(1, route.length - 1);
          }
          // compute heading roughly toward next point
          const a = route[posIndex];
          const b = route[Math.min(posIndex + 1, route.length - 1)];
          const heading = Math.atan2(b[0] - a[0], b[1] - a[1]) * (180 / Math.PI) * -1 + 90;
          return { ...tr, posIndex, t, heading };
        })
      );
    }, 700);
    return () => clearInterval(iv);
  }, [route]);

  // Overpass (OSM) fetch for real track/platform/station/signal geometry inside bbox
  const [osmTracks, setOsmTracks] = useState<Array<[number, number][]> | null>(null);
  const [osmPlatforms, setOsmPlatforms] = useState<Array<[number, number][]> | null>(null);
  const [osmStations, setOsmStations] = useState<Array<{ id: string; name?: string; lat: number; lng: number }>>([]);
  const [osmSignals, setOsmSignals] = useState<Array<[number, number]>>([]);

  useEffect(() => {
    async function fetchOverpass() {
      try {
        const lats = stations.map((s) => s.lat);
        const lngs = stations.map((s) => s.lng);
        const south = Math.min(...lats) - 0.02;
        const north = Math.max(...lats) + 0.02;
        const west = Math.min(...lngs) - 0.02;
        const east = Math.max(...lngs) + 0.02;

        const query = `
[out:json][timeout:25];
(
  way["railway"~"rail|trunk|main|subway|preserved"](${south},${west},${north},${east});
  way["railway"="platform"](${south},${west},${north},${east});
  way["public_transport"="platform"](${south},${west},${north},${east});
  node["railway"~"station|halt"](${south},${west},${north},${east});
  node["railway"="signal"](${south},${west},${north},${east});
);
out body;
>;
out skel qt;`;

        const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Overpass request failed ' + res.status);
        const data = await res.json();

        const tracks: Array<[number, number][]> = [];
        const platforms: Array<[number, number][]> = [];
        const stationsNodes: Array<{ id: string; name?: string; lat: number; lng: number }> = [];
        const signalsNodes: Array<[number, number]> = [];

        // elements will include nodes and ways; process ways and nodes
        const elements = data.elements || [];
        for (const el of elements) {
          if (el.type === 'way' && el.geometry) {
            const coords: [number, number][] = el.geometry.map((g: any) => [g.lat, g.lon]);
            const tags = el.tags || {};
            const isPlatform = (tags.railway && tags.railway === 'platform') || tags.public_transport === 'platform' || tags.amenity === 'platform';
            const isTrack = tags.railway && (tags.railway === 'rail' || tags.railway === 'preserved' || tags.railway === 'subway');
            if (isPlatform) {
              // if closed ring, ensure a polygon
              platforms.push(coords);
            } else if (isTrack) {
              tracks.push(coords);
            }
          }

          if (el.type === 'node' && el.lat && el.lon) {
            const tags = el.tags || {};
            if (tags.railway && (tags.railway === 'station' || tags.railway === 'halt')) {
              stationsNodes.push({ id: String(el.id), name: tags.name || undefined, lat: el.lat, lng: el.lon });
            }
            if (tags.railway && tags.railway === 'signal') {
              signalsNodes.push([el.lat, el.lon]);
            }
          }
        }

        setOsmTracks(tracks.length ? tracks : null);
        setOsmPlatforms(platforms.length ? platforms : null);
        setOsmStations(stationsNodes);
        setOsmSignals(signalsNodes);
      } catch (err) {
        // fail silently — map will still show schematic route
        console.error('Overpass fetch failed', err);
      }
    }

    fetchOverpass();
  }, [stations]);

  // compute train positions by interpolating
  function interp(a: [number, number], b: [number, number], t: number): [number, number] {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  }

  // Deduplicate stations by rounding coordinates to avoid double labels
  function dedupeStations(list: Array<{ id: string; name?: string; lat: number; lng: number }>) {
    const seen = new Set<string>();
    const out: Array<{ id: string; name?: string; lat: number; lng: number }> = [];
    for (const s of list) {
      const key = `${s.lat.toFixed(6)}|${s.lng.toFixed(6)}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(s);
      }
    }
    return out;
  }

  // Find nearest segment index on route to point (lat,lng)
  function nearestSegmentIndex(routePoints: [number, number][], lat: number, lng: number) {
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < routePoints.length - 1; i++) {
      const a = routePoints[i];
      const b = routePoints[i + 1];
      // project point onto segment (simple planar math, fine for small areas)
      const ax = a[1], ay = a[0];
      const bx = b[1], by = b[0];
      const px = lng, py = lat;
      const vx = bx - ax, vy = by - ay;
      const wx = px - ax, wy = py - ay;
      const c1 = vx * wx + vy * wy;
      const c2 = vx * vx + vy * vy;
      const t = c2 === 0 ? 0 : Math.max(0, Math.min(1, c1 / c2));
      const projx = ax + vx * t;
      const projy = ay + vy * t;
      const dx = projx - px;
      const dy = projy - py;
      const distSq = dx * dx + dy * dy;
      if (distSq < bestDist) {
        bestDist = distSq;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  // Compute a small perpendicular offset (in degrees) to place labels beside the track
  function labelPositionAlongSegment(a: [number, number], b: [number, number], lat: number, lng: number, distanceDeg = 0.00065) {
    // segment vector (lng, lat)
    const vx = b[1] - a[1];
    const vy = b[0] - a[0];
    // perpendicular (left side) = (-vy, vx)
    const perpX = -vy;
    const perpY = vx;
    const len = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
    const ux = perpX / len;
    const uy = perpY / len;
    // label position
    return [lat + uy * distanceDeg, lng + ux * distanceDeg] as [number, number];
  }

  return (
    <div className={`w-full h-full ${size ? size : "min-h-[400px]"}`} style={wrapperStyle}>
      <div className="rounded-lg overflow-hidden border border-white/10 h-full">
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true} zoomControl={false} attributionControl={false} preferCanvas={true}>
          <MapPanes />
          <ZoomControl position="topright" />
          <AttributionControl position="bottomright" />

          <TileLayer url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, &copy; <a href="https://openrailwaymap.org/">OpenRailwayMap</a>' />
          {/* use OpenRailwayMap tiles for live mode; still useful as base for track mode */}

          {/* Overpass-provided tracks (preferred) */}
          {osmTracks && osmTracks.length > 0 ? (
            osmTracks.map((coords, idx) => (
              <React.Fragment key={`ot-${idx}`}>
                {/* dark base */}
                <Polyline pane="tracksPane" positions={coords as any} pathOptions={{ color: '#081018', weight: 12, opacity: 0.95, lineCap: 'round', lineJoin: 'round' }} />
                {/* bright centerline */}
                <Polyline pane="tracksPane" positions={coords as any} pathOptions={{ color: '#1DB954', weight: 6, opacity: 0.95, lineCap: 'round', lineJoin: 'round' }} />
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              <Polyline positions={route as any} pathOptions={{ color: '#081018', weight: 14, opacity: 0.95, lineCap: 'round', lineJoin: 'round' }} />
              <Polyline positions={route as any} pathOptions={{ color: '#1DB954', weight: 6, opacity: 0.95, lineCap: 'round', lineJoin: 'round' }} />
            </React.Fragment>
          )}

          {/* Overpass platforms or synthetic platforms */}
          {osmPlatforms && osmPlatforms.length > 0 ? (
            osmPlatforms.map((poly, i) => (
              <Polygon
                key={`plat-${i}`}
                pane="platformPane"
                positions={poly as any}
                pathOptions={{ color: '#D9D9D9', weight: 1, fillColor: '#2B2B2B', fillOpacity: 0.95, lineJoin: 'round' }}
              />
            ))
          ) : (
            stations.map((s, i) => (
              <Polygon
                key={`plat-syn-${s.id}-${i}`}
                pane="platformPane"
                positions={createPlatform(s.lat, s.lng, i) as any}
                pathOptions={{ color: '#D9D9D9', weight: 1, fillColor: '#2B2B2B', fillOpacity: 0.95, lineJoin: 'round' }}
              />
            ))
          )}

          {/* Stations: prefer Overpass nodes; dedupe nearby duplicates and compute perpendicular label offsets */}
          {(() => {
            const rawStations = (osmStations && osmStations.length > 0) ? osmStations : stations.map((s) => ({ id: s.id, name: s.name, lat: s.lat, lng: s.lng }));
            const unique = dedupeStations(rawStations);
            const placedNames = new Set<string>();
            return unique.map((s, i) => {
              // create label text and divIcon
              const labelText = s.name || "";
              // prevent rendering repeated identical labels at very close coordinates
              const nameKey = `${labelText?.toLowerCase() || ''}:${s.lat.toFixed(5)}|${s.lng.toFixed(5)}`;
              if (placedNames.has(nameKey)) return null;
              placedNames.add(nameKey);

              // compute label position using nearest segment and perpendicular offset
              let labelPos: [number, number] = [s.lat, s.lng];
              if (route.length >= 2) {
                const segIdx = Math.min(nearestSegmentIndex(route, s.lat, s.lng), Math.max(0, route.length - 2));
                const a = route[segIdx];
                const b = route[Math.min(segIdx + 1, route.length - 1)];
                labelPos = labelPositionAlongSegment(a, b, s.lat, s.lng, horizontal ? 0.0012 : 0.00065);
              } else {
                // fallback small left offset
                labelPos = [s.lat, s.lng - (horizontal ? 0.0010 : 0.0006)];
              }

              const labelHtml = `<div style="white-space:nowrap;color:#0EA5A3;font-weight:700;font-size:${mapMode === 'track' ? 11 : 12}px;text-shadow:0 1px 2px rgba(0,0,0,0.9);padding:0 6px;">${labelText}</div>`;
              const labelIcon = L.divIcon({ html: labelHtml, className: 'station-label-div', iconSize: undefined, iconAnchor: [0, 10] });

              return (
                <React.Fragment key={`st-${s.id}-${i}`}>
                  {/* station symbol using preset SVG icon */}
                  <Marker position={[s.lat, s.lng]} pane="stationPane" interactive={false} zIndexOffset={500} icon={stationIcon} />

                  {/* label marker (non-interactive) placed beside track in stationPane so it renders above tracks */}
                  <Marker position={labelPos as any} icon={labelIcon} pane="stationPane" interactive={false} zIndexOffset={2000} />

                  {/* show popup only in live mode on the station symbol */}
                  {mapMode === 'live' && (
                    <Marker position={[s.lat, s.lng]} pane="stationPane" interactive={true} zIndexOffset={1500}>
                      <Popup>
                        <div>
                          <strong>{s.name}</strong>
                          <div>ID: {s.id}</div>
                          <div>Lat: {s.lat.toFixed(6)}</div>
                          <div>Lng: {s.lng.toFixed(6)}</div>
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </React.Fragment>
              );
            });
          })()}

          {/* Signals from Overpass or synthetic mid-segment and trains (live mode only) */}
          {(() => {
            const signalPoints: Array<[number, number]> = (osmSignals && osmSignals.length > 0)
              ? osmSignals
              : route
                  .map((pt, idx) => {
                    if (idx === route.length - 1) return null;
                    const a = pt;
                    const b = route[idx + 1];
                    const mid: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
                    return mid;
                  })
                  .filter((p): p is [number, number] => p !== null);

            const signalMarkers = signalPoints.map((pt, i) => {
              const radius = mapMode === 'track' ? 6 : 4;
              const color = i % 3 === 0 ? "#3DBE84" : i % 3 === 1 ? "#FDB813" : "#E63946";
              return <CircleMarker key={`sig-${i}`} center={pt as any} radius={radius} pathOptions={{ color, fillColor: color }} />;
            });

            const trainMarkers = mapMode === 'live' ? trains.map((tr) => {
              const a = route[tr.posIndex];
              const b = route[Math.min(tr.posIndex + 1, route.length - 1)];
              const pos = interp(a, b, tr.t);
              return (
                <Marker key={tr.id} position={pos as any} icon={createTrainIcon("#3DBE84", tr.heading, tr.id)}>
                  <Popup>
                    <div>
                      <div className="font-bold">{tr.id}</div>
                      <div>Heading: {Math.round(tr.heading)}°</div>
                    </div>
                  </Popup>
                </Marker>
              );
            }) : [];

            return (<>{signalMarkers}{trainMarkers}</>);
          })()}

          {/* optional legend overlay */}
          {showLegend && (
            <div style={{ position: "absolute", right: 12, bottom: 50, zIndex: 4000, background: "rgba(10,10,10,0.6)", padding: "8px", borderRadius: 6, color: "#fff", fontSize: 12 }}>
              <div style={{ marginBottom: 6, fontWeight: 700 }}>Legend</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 12, height: 6, background: "#1DB954" }} /> <div>Track</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, background: "#3DBE84" }} /> <div>Signal - Go</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, background: "#E63946" }} /> <div>Signal - Stop</div>
              </div>
            </div>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
