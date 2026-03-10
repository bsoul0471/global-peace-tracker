import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, AlertTriangle, Shield, Handshake, Heart, Zap, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { NewsItem } from "@/data/mockNews";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const categoryConfig: Record<string, { icon: typeof AlertTriangle; className: string; badgeVariant: "default" | "destructive" | "secondary" | "outline"; label: string; bgClass: string }> = {
  airstrike: { icon: Zap, className: "text-accent", badgeVariant: "destructive", label: "Airstrike", bgClass: "bg-accent/10 border-accent/20" },
  military: { icon: Shield, className: "text-warning", badgeVariant: "secondary", label: "Military", bgClass: "bg-warning/10 border-warning/20" },
  diplomacy: { icon: Handshake, className: "text-primary", badgeVariant: "default", label: "Diplomacy", bgClass: "bg-primary/10 border-primary/20" },
  humanitarian: { icon: Heart, className: "text-success", badgeVariant: "outline", label: "Humanitarian", bgClass: "bg-success/10 border-success/20" },
  breaking: { icon: AlertTriangle, className: "text-accent", badgeVariant: "destructive", label: "Breaking", bgClass: "bg-accent/10 border-accent/20" },
};

interface NewsFeedProps {
  news: NewsItem[];
  selectedNews: string | null;
  onSelectNews: (id: string) => void;
}

const NewsFeed = ({ news, selectedNews, onSelectNews }: NewsFeedProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <AnimatePresence mode="popLayout">
        {news.map((item, index) => {
          const config = categoryConfig[item.category] || categoryConfig.military;
          const Icon = config.icon;
          const isSelected = selectedNews === item.id;
          const isExpanded = expandedId === item.id;

          return (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.97 }}
              transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 30 }}
              className={`group relative border-b border-border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "bg-secondary shadow-[inset_3px_0_0_0_hsl(var(--primary))]"
                  : "hover:bg-secondary/40"
              }`}
            >
              {/* Main clickable area */}
              <div
                className={`px-3 py-2.5 rounded-md transition-all duration-200 ${
                  isSelected
                    ? "bg-secondary shadow-[inset_2px_0_0_0_hsl(var(--primary))]"
                    : "hover:bg-secondary/40"
                }`}
                onClick={() => onSelectNews(item.id)}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={config.badgeVariant}
                      className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0 h-4 border ${config.bgClass} ${config.className}`}
                    >
                      <Icon className="w-2.5 h-2.5 mr-1" />
                      {config.label}
                    </Badge>
                    {item.category === "breaking" && (
                      <motion.span
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-1.5 rounded-full bg-accent"
                      />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{item.timeAgo}</span>
                </div>

                {/* Title */}
                <h3 className="text-[12px] font-medium leading-snug mb-1 text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>

                {/* Summary - truncated */}
                <p className={`text-xs text-muted-foreground leading-relaxed mb-2 ${isExpanded ? "" : "line-clamp-2"}`}>
                  {item.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                          {item.source}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Source: {item.source}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {item.region}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Click to locate on map
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(isExpanded ? null : item.id);
                      }}
                      className="p-0.5 rounded hover:bg-muted transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-3 h-3 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                      )}
                    </button>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-0">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground border-t border-border/50 pt-2">
                        <span>📍 {item.lat.toFixed(4)}, {item.lng.toFixed(4)}</span>
                        <span>🕐 {new Date(item.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </AnimatePresence>

      {news.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Shield className="w-8 h-8 mb-2 opacity-40" />
          <p className="text-xs font-mono">No events in this region</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
