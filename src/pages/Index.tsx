import { useState, useMemo, useCallback } from "react";
import { Radio, Menu, X } from "lucide-react";
import ConflictMap from "@/components/ConflictMap";
import NewsFeed from "@/components/NewsFeed";
import RegionTabs from "@/components/RegionTabs";
import { mockNews } from "@/data/mockNews";

const Index = () => {
  const [activeRegion, setActiveRegion] = useState("all");
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredNews = useMemo(
    () => activeRegion === "all" ? mockNews : mockNews.filter((n) => n.region === activeRegion),
    [activeRegion]
  );

  const handleSelectNews = useCallback((id: string) => {
    setSelectedNews((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-11 flex items-center justify-between px-4 border-b border-border bg-card z-20 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-secondary transition-colors md:hidden"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight">WARWATCH</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="text-[10px] font-mono text-accent uppercase tracking-wider">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">
            {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {filteredNews.length} events
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Map */}
        <div className="flex-1">
          <ConflictMap
            news={filteredNews}
            selectedNews={selectedNews}
            onSelectNews={handleSelectNews}
          />
        </div>

        {/* News Sidebar */}
        <aside
          className={`absolute md:relative right-0 top-0 h-full z-10 bg-card border-l border-border flex flex-col transition-all duration-300 ${
            sidebarOpen ? "w-80 lg:w-96" : "w-0 overflow-hidden border-l-0"
          }`}
        >
          {/* Sidebar Header */}
          <div className="border-b border-border shrink-0">
            <div className="flex items-center justify-between px-4 py-2">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider">News Feed</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded hover:bg-secondary transition-colors hidden md:block"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
            <RegionTabs activeRegion={activeRegion} onRegionChange={setActiveRegion} />
          </div>

          {/* News List */}
          <NewsFeed
            news={filteredNews}
            selectedNews={selectedNews}
            onSelectNews={handleSelectNews}
          />
        </aside>

        {/* Toggle sidebar button when closed (desktop) */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute right-3 top-3 z-10 p-2 rounded bg-card border border-border hover:bg-secondary transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
