import React, { useEffect, useRef, useState } from "react";
import { NetworkMap } from "../components/NetworkMap";
import { Button } from "../components/ui/button";
import { X, Maximize, Minimize } from "lucide-react";

export default function NetworkMapPage(): JSX.Element {
  const [fullscreen, setFullscreen] = useState(false);
  const [usingApi, setUsingApi] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // lock body scroll when fullscreen
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [fullscreen]);

  // Listen for ESC and fullscreenchange when using the Fullscreen API
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          setFullscreen(false);
        }
      }
    };

    const onFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setFullscreen(isFs);
      // if fullscreen element was removed, stop using API
      if (!isFs) setUsingApi(false);
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFsChange);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-[#1A1D23] border border-white/10 rounded-lg p-4 relative">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl text-white mb-2">Network Map</h1>
          </div>

          <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-[#0F1115] border border-white/10 rounded-md"
                onClick={async () => {
                  if (!fullscreen) {
                    // try using Fullscreen API if available
                    try {
                      if (containerRef.current && containerRef.current.requestFullscreen) {
                        await containerRef.current.requestFullscreen();
                        setUsingApi(true);
                        setFullscreen(true);
                        return;
                      }
                    } catch (e) {
                      // fallthrough to overlay
                    }
                    setFullscreen(true);
                  } else {
                    // exit fullscreen / overlay
                    try {
                      if (document.fullscreenElement) await document.exitFullscreen();
                    } catch (e) {
                      // ignore
                    }
                    setFullscreen(false);
                    setUsingApi(false);
                  }
                }}
              >
                {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                <span className="ml-2 hidden sm:inline text-sm">{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
              </Button>
          </div>
        </div>

        <div className="mt-4 h-[70vh] min-h-[480px]" ref={containerRef}>
          {/* Using station coordinates resolved from your station list (Nominatim). */}
          <NetworkMap
            height="100%"
            showLegend={!fullscreen}
            blueprintStations={[
              { id: "VIRAR", name: "Virar", lat: 19.4553059, lng: 72.8118160 },
              { id: "VAITARNA", name: "Vaitarna", lat: 19.5186517, lng: 72.8499772 },
              { id: "SAPHALE", name: "Saphale", lat: 19.5771316, lng: 72.8218812 },
              { id: "KELVE_RD", name: "Kelve Road", lat: 19.6240526, lng: 72.7911751 },
              { id: "PALGHAR", name: "Palghar", lat: 19.6978882, lng: 72.7718888 },
              { id: "BOISAR", name: "Boisar", lat: 19.7984865, lng: 72.7614520 },
              { id: "VANGAON", name: "Vangaon", lat: 19.8829908, lng: 72.7631658 },
              { id: "DAHANU_RD", name: "Dahanu Road", lat: 19.9915236, lng: 72.7434083 },
              { id: "GHOLVAD", name: "Gholvad", lat: 20.0868248, lng: 72.7377410 },
              { id: "UMBERGAON_RD", name: "Umbergaon Road", lat: 20.1537655, lng: 72.7905804 },
              { id: "SANJAN", name: "Sanjan", lat: 20.1922347, lng: 72.8210847 },
              { id: "BHILAD", name: "Bhilad", lat: 20.2754926, lng: 72.8873250 },
              { id: "KARAMBELI", name: "Karambeli", lat: 20.3166250, lng: 72.9012366 },
              { id: "VAPI", name: "Vapi", lat: 20.3735482, lng: 72.9084376 },
              { id: "UDVADA", name: "Udvada", lat: 20.4621395, lng: 72.9190049 },
              { id: "PARDI", name: "Pardi", lat: 20.5137936, lng: 72.9242196 },
              { id: "ATUL", name: "Atul", lat: 20.5472816, lng: 72.9278239 },
              { id: "VALSAD", name: "Valsad", lat: 20.6082083, lng: 72.9335048 },
              { id: "DUNGRI", name: "Dungri", lat: 20.6876797, lng: 72.9492412 },
              { id: "JORAVASAN", name: "Joravasan", lat: 20.7307493, lng: 72.9661692 },
              { id: "BILIMORA_JN", name: "Bilimora Junction", lat: 20.7666352, lng: 72.9700083 },
              { id: "AMALSAD", name: "Amalsad", lat: 20.8114158, lng: 72.9560202 },
              { id: "ANCHELI", name: "Ancheli", lat: 20.8450701, lng: 72.9454102 },
              { id: "VEDCHHA", name: "Vedchha", lat: 20.8746931, lng: 72.9360427 },
              { id: "NAVSARI", name: "Navsari", lat: 20.9481307, lng: 72.9130969 },
              { id: "MAROLI", name: "Maroli", lat: 21.0200688, lng: 72.8904944 },
              { id: "SACHIN", name: "Sachin", lat: 21.0778781, lng: 72.8744643 },
              { id: "BHESTAN", name: "Bhestan", lat: 21.1225832, lng: 72.8630342 },
              { id: "UDHNA_JN", name: "Udhna Junction", lat: 21.1704267, lng: 72.8509905 },
              { id: "SURAT", name: "Surat", lat: 21.2050338, lng: 72.8407079 },
            ]}
          />
        </div>
      </div>

      {/* Fullscreen overlay */}
      {fullscreen && !usingApi && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="p-3 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="bg-[#0F1115] border border-white/10 rounded-lg"
              onClick={() => setFullscreen(false)}
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
          <div className="flex-1 flex items-stretch">
            <div className="flex-1">
              <NetworkMap height="100%" showLegend={!fullscreen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

