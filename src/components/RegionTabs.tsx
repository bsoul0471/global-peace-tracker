import { regions } from "@/data/mockNews";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface RegionTabsProps {
  activeRegion: string;
  onRegionChange: (region: string) => void;
  counts?: Record<string, number>;
}

const RegionTabs = ({ activeRegion, onRegionChange, counts }: RegionTabsProps) => {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto">
      {regions.map((region) => {
        const isActive = activeRegion === region.id;
        const count = counts?.[region.id];

        return (
          <motion.button
            key={region.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onRegionChange(region.id)}
            className={`relative px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {region.label}
            {count !== undefined && count > 0 && (
              <Badge
                variant="secondary"
                className={`h-4 min-w-4 px-1 text-[9px] font-mono ${
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </Badge>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default RegionTabs;
