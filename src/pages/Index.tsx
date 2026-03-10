import { useState, useMemo, useCallback } from "react";
import { Radio, Menu, X, Search, Layers, PanelRightClose, PanelRightOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConflictMap from "@/components/ConflictMap";
import NewsFeed from "@/components/NewsFeed";
import RegionTabs from "@/components/RegionTabs";
import StatsBar from "@/components/StatsBar";
import MapLegend from "@/components/MapLegend";
import { mockNews } from "@/data/mockNews";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [activeRegion, setActiveRegion] = useState("all");
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);

  const filteredNews = useMemo(() => {
    let result = activeRegion === "all" ? mockNews : mockNews.filter((n) => n.region === activeRegion);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q) || n.source.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeRegion, searchQuery]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockNews.length };
    mockNews.forEach((n) => {
      counts[n.region] = (counts[n.region] || 0) + 1;
    });
    return counts;
  }, []);

  const handleSelectNews = useCallback((id: string) => {
    setSelectedNews((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-card/95 backdrop-blur-sm z-20 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors md:hidden"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shadow-lg shadow-primary/25"
            >
              <Radio className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <span className="font-mono text-sm font-bold tracking-tight">WARWATCH</span>
          </div>

          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-semibold">Live</span>
          </div>

          <Separator orientation="vertical" className="h-5 hidden md:block" />

          {/* Stats */}
          <div className="hidden md:block">
            <StatsBar news={filteredNews} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground hidden lg:block">
            {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </span>

          <Separator orientation="vertical" className="h-5 hidden lg:block" />

          {/* Map controls */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setLegendOpen(!legendOpen)}
                className={`p-1.5 rounded-md transition-colors ${legendOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <Layers className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">Map Legend</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors hidden md:block"
              >
                {sidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">{sidebarOpen ? "Close" : "Open"} News Panel</TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Map */}
        <div className="flex-1 relative">
          <ConflictMap
            news={filteredNews}
            selectedNews={selectedNews}
            onSelectNews={handleSelectNews}
          />
          <MapLegend visible={legendOpen} />
        </div>

        {/* News Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="relative h-full z-10 bg-card border-l border-border flex flex-col w-80 lg:w-96"
            >
              {/* Sidebar Header */}
              <div className="border-b border-border shrink-0">
                <div className="flex items-center justify-between px-4 py-2.5">
                  <h2 className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2">
                    News Feed
                    <span className="text-[9px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded tabular-nums">
                      {filteredNews.length}
                    </span>
                  </h2>
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setSearchOpen(!searchOpen)}
                          className={`p-1 rounded-md transition-colors ${searchOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">Search news</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Search bar */}
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-2">
                        <Input
                          placeholder="Search events..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="h-8 text-xs font-mono bg-muted border-border focus-visible:ring-primary/30"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <RegionTabs activeRegion={activeRegion} onRegionChange={setActiveRegion} counts={regionCounts} />
              </div>

              {/* News List */}
              <NewsFeed
                news={filteredNews}
                selectedNews={selectedNews}
                onSelectNews={handleSelectNews}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
