import React, { useEffect, useRef, useState } from "react";
import { NetworkMap } from "../components/NetworkMap";
import blueprintStations from "../data/blueprintStations";
import { Button } from "../components/ui/button";
import { X, Maximize, Minimize } from "lucide-react";

export default function Map(): JSX.Element {
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
            <h1 className="text-2xl text-white mb-2">Map</h1>
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
            blueprintStations={blueprintStations}
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
              <NetworkMap height="100%" showLegend={!fullscreen} blueprintStations={blueprintStations} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
