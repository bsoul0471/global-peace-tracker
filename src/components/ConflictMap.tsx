import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NewsItem } from "@/data/mockNews";

const categoryColors: Record<string, string> = {
  airstrike: "#ef4444",
  military: "#f97316",
  diplomacy: "#3b82f6",
  humanitarian: "#22c55e",
  breaking: "#dc2626",
};

interface ConflictMapProps {
  news: NewsItem[];
  selectedNews: string | null;
  onSelectNews: (id: string) => void;
}

const ConflictMap = ({ news, selectedNews, onSelectNews }: ConflictMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: [38, 40],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: "bottomleft" }).addTo(mapInstance.current);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    news.forEach((item) => {
      const color = categoryColors[item.category] || "#3b82f6";
      const isSelected = selectedNews === item.id;

      // Outer pulse ring
      const pulse = L.circleMarker([item.lat, item.lng], {
        radius: isSelected ? 18 : 12,
        color: color,
        fillColor: color,
        fillOpacity: 0.15,
        weight: 1,
        opacity: 0.4,
      }).addTo(mapInstance.current!);

      // Inner dot
      const marker = L.circleMarker([item.lat, item.lng], {
        radius: isSelected ? 7 : 5,
        color: color,
        fillColor: color,
        fillOpacity: 0.9,
        weight: 2,
      }).addTo(mapInstance.current!);

      marker.bindTooltip(
        `<div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; max-width: 220px;">
          <strong>${item.title}</strong><br/>
          <span style="opacity:0.7">${item.timeAgo} · ${item.source}</span>
        </div>`,
        { direction: "top", offset: [0, -8] }
      );

      marker.on("click", () => onSelectNews(item.id));

      markersRef.current.push(pulse, marker);
    });
  }, [news, selectedNews, onSelectNews]);

  useEffect(() => {
    if (!mapInstance.current || !selectedNews) return;
    const item = news.find((n) => n.id === selectedNews);
    if (item) {
      mapInstance.current.flyTo([item.lat, item.lng], 6, { duration: 0.8 });
    }
  }, [selectedNews, news]);

  return <div ref={mapRef} className="h-full w-full" />;
};

export default ConflictMap;
