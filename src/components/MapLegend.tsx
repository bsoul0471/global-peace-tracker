import { Zap, Shield, Handshake, Heart, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MapLegendProps {
  visible: boolean;
}

const legendItems = [
  { icon: Zap, label: "Airstrike", color: "bg-accent", textColor: "text-accent" },
  { icon: Shield, label: "Military", color: "bg-warning", textColor: "text-warning" },
  { icon: Handshake, label: "Diplomacy", color: "bg-primary", textColor: "text-primary" },
  { icon: Heart, label: "Humanitarian", color: "bg-success", textColor: "text-success" },
  { icon: AlertTriangle, label: "Breaking", color: "bg-accent", textColor: "text-accent" },
];

const MapLegend = ({ visible }: MapLegendProps) => {
  if (!visible) return null;

  return (
    <div className="absolute bottom-4 left-14 z-10 bg-card/90 backdrop-blur-md border border-border rounded-lg p-3 animate-scale-in">
      <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Legend</h4>
      <div className="flex flex-col gap-1.5">
        {legendItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-default">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <item.icon className={`w-3 h-3 ${item.textColor}`} />
                <span className="text-[10px] font-mono text-muted-foreground">{item.label}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.label} events
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
