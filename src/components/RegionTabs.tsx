import { regions } from "@/data/mockNews";

interface RegionTabsProps {
  activeRegion: string;
  onRegionChange: (region: string) => void;
}

const RegionTabs = ({ activeRegion, onRegionChange }: RegionTabsProps) => {
  return (
    <div className="flex items-center gap-1 px-3 py-2 overflow-x-auto">
      {regions.map((region) => (
        <button
          key={region.id}
          onClick={() => onRegionChange(region.id)}
          className={`px-3 py-1 text-xs font-mono rounded-sm whitespace-nowrap transition-all duration-200 ${
            activeRegion === region.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {region.label}
        </button>
      ))}
    </div>
  );
};

export default RegionTabs;
