import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl, AttributionControl } from "react-leaflet";
import L from "leaflet";

// Use CDN icon URLs to avoid bundler image import issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const stations = [
  { name: "Virar", lat: 19.4489, lng: 72.8203 },
  { name: "Palghar", lat: 19.6781, lng: 72.7576 },
  { name: "Boisar", lat: 19.7936, lng: 72.7047 },
  { name: "Valsad", lat: 20.6096, lng: 72.9199 },
  { name: "Vapi", lat: 20.3579, lng: 72.9043 },
  { name: "Navsari", lat: 20.9467, lng: 72.9522 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
];

export function NetworkMap({ size, height, showLegend = true, horizontal = false }: { size?: string; height?: string; showLegend?: boolean; horizontal?: boolean }) {
  const mapHeight = horizontal ? (height || "260px") : height || "500px";
  const center: [number, number] = horizontal ? [20.6, 72.9] : [20.5, 72.9];
  const polyline: [number, number][] = stations.map((s) => [s.lat, s.lng]);

  const wrapperStyle: React.CSSProperties | undefined = { height: mapHeight };

  return (
    <div className={`w-full h-full ${size ? size : "min-h-[400px]"}`} style={wrapperStyle}>
      <div className="rounded-lg overflow-hidden border border-white/10 h-full">
        <MapContainer center={center} zoom={horizontal ? 7 : 8} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true} zoomControl={false} attributionControl={false}>
          {/* place zoom control top-right so it doesn't overlap the left sidebar */}
          <ZoomControl position="topright" />
          <AttributionControl position="bottomright" />

          <TileLayer
            url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, &copy; <a href="https://openrailwaymap.org/">OpenRailwayMap</a>'
          />

          {stations.map((s) => (
            <Marker key={s.name} position={[s.lat, s.lng]}>
              <Popup>
                <div>
                  <strong>{s.name}</strong>
                  <div>Lat: {s.lat.toFixed(4)}</div>
                  <div>Lng: {s.lng.toFixed(4)}</div>
                </div>
              </Popup>
            </Marker>
          ))}

          <Polyline positions={polyline} color="#ff7800" weight={4} opacity={0.9} />
        </MapContainer>
      </div>
    </div>
  );
}
