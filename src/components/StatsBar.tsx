import { motion } from "framer-motion";
import { Zap, Shield, AlertTriangle, Activity } from "lucide-react";
import { NewsItem } from "@/data/mockNews";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsBarProps {
  news: NewsItem[];
}

const StatsBar = ({ news }: StatsBarProps) => {
  const airstrikes = news.filter((n) => n.category === "airstrike").length;
  const military = news.filter((n) => n.category === "military").length;
  const breaking = news.filter((n) => n.category === "breaking").length;
  const regions = new Set(news.map((n) => n.region)).size;

  const stats = [
    { icon: Activity, label: "Events", value: news.length, color: "text-primary" },
    { icon: Zap, label: "Airstrikes", value: airstrikes, color: "text-accent" },
    { icon: Shield, label: "Military", value: military, color: "text-warning" },
    { icon: AlertTriangle, label: "Breaking", value: breaking, color: "text-accent" },
  ];

  return (
    <div className="flex items-center gap-1">
      {stats.map((stat, i) => (
        <Tooltip key={stat.label}>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-muted/50 cursor-default"
            >
              <stat.icon className={`w-3 h-3 ${stat.color}`} />
              <span className={`text-[10px] font-mono font-semibold tabular-nums ${stat.color}`}>
                {stat.value}
              </span>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="text-xs">{stat.label}: {stat.value}</TooltipContent>
        </Tooltip>
      ))}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-muted/50 cursor-default">
            <span className="text-[10px] font-mono text-muted-foreground">{regions} regions</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs">Active conflict regions</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default StatsBar;
