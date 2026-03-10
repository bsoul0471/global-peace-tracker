import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, AlertTriangle, Shield, Handshake, Heart, Zap } from "lucide-react";
import { NewsItem } from "@/data/mockNews";

const categoryConfig: Record<string, { icon: typeof AlertTriangle; className: string; label: string }> = {
  airstrike: { icon: Zap, className: "text-accent", label: "Airstrike" },
  military: { icon: Shield, className: "text-warning", label: "Military" },
  diplomacy: { icon: Handshake, className: "text-primary", label: "Diplomacy" },
  humanitarian: { icon: Heart, className: "text-success", label: "Humanitarian" },
  breaking: { icon: AlertTriangle, className: "text-accent", label: "Breaking" },
};

interface NewsFeedProps {
  news: NewsItem[];
  selectedNews: string | null;
  onSelectNews: (id: string) => void;
}

const NewsFeed = ({ news, selectedNews, onSelectNews }: NewsFeedProps) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <AnimatePresence>
        {news.map((item, index) => {
          const config = categoryConfig[item.category] || categoryConfig.military;
          const Icon = config.icon;
          const isSelected = selectedNews === item.id;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectNews(item.id)}
              className={`px-4 py-3 border-b border-border cursor-pointer transition-colors duration-200 ${
                isSelected ? "bg-secondary" : "hover:bg-secondary/50"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${config.className}`} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${config.className}`}>
                    {config.label}
                  </span>
                  {item.category === "breaking" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                  )}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{item.timeAgo}</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium leading-snug mb-1.5 text-foreground">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                {item.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">{item.source}</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NewsFeed;
