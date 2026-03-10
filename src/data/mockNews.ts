export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  timeAgo: string;
  region: string;
  category: "airstrike" | "military" | "diplomacy" | "humanitarian" | "breaking";
  lat: number;
  lng: number;
  imageUrl?: string;
}

export const regions = [
  { id: "all", label: "All Regions" },
  { id: "ukraine", label: "Ukraine" },
  { id: "middle-east", label: "Middle East" },
  { id: "syria", label: "Syria" },
  { id: "iran", label: "Iran" },
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Explosions reported in central Kyiv overnight",
    summary: "Multiple explosions heard across central Kyiv as air defense systems engage incoming threats. Authorities urge residents to seek shelter.",
    source: "Reuters",
    timestamp: "2026-03-10T06:30:00Z",
    timeAgo: "32 min ago",
    region: "ukraine",
    category: "airstrike",
    lat: 50.4501,
    lng: 30.5234,
  },
  {
    id: "2",
    title: "IDF confirms strikes on military targets in Tehran",
    summary: "Israeli Defense Forces confirm a series of precision strikes on military installations in the Tehran metropolitan area.",
    source: "AP News",
    timestamp: "2026-03-10T05:45:00Z",
    timeAgo: "1 hour ago",
    region: "iran",
    category: "breaking",
    lat: 35.6892,
    lng: 51.389,
  },
  {
    id: "3",
    title: "Humanitarian corridor opened in northern Syria",
    summary: "A new humanitarian corridor has been established to allow civilian evacuation from conflict zones in northern Syria.",
    source: "Al Jazeera",
    timestamp: "2026-03-10T04:20:00Z",
    timeAgo: "2 hours ago",
    region: "syria",
    category: "humanitarian",
    lat: 36.2021,
    lng: 37.1343,
  },
  {
    id: "4",
    title: "Kherson region under heavy artillery bombardment",
    summary: "Russian forces intensify artillery shelling across the Kherson region, targeting civilian infrastructure and supply lines.",
    source: "BBC",
    timestamp: "2026-03-10T04:00:00Z",
    timeAgo: "2 hours ago",
    region: "ukraine",
    category: "military",
    lat: 46.6354,
    lng: 32.6169,
  },
  {
    id: "5",
    title: "UN Security Council emergency session on Iran",
    summary: "The United Nations Security Council convenes an emergency session to address the escalating military conflict involving Iran.",
    source: "UN News",
    timestamp: "2026-03-10T03:15:00Z",
    timeAgo: "3 hours ago",
    region: "middle-east",
    category: "diplomacy",
    lat: 40.7489,
    lng: -73.968,
  },
  {
    id: "6",
    title: "Drone strike hits fuel depot near Isfahan",
    summary: "A large explosion reported at a fuel storage facility near Isfahan following an apparent drone strike. Emergency services responding.",
    source: "IRNA",
    timestamp: "2026-03-10T02:50:00Z",
    timeAgo: "4 hours ago",
    region: "iran",
    category: "airstrike",
    lat: 32.6546,
    lng: 51.6680,
  },
  {
    id: "7",
    title: "Zaporizhzhia nuclear plant status update",
    summary: "IAEA reports that the Zaporizhzhia nuclear power plant remains stable despite nearby military activity. Monitoring continues.",
    source: "IAEA",
    timestamp: "2026-03-10T02:00:00Z",
    timeAgo: "5 hours ago",
    region: "ukraine",
    category: "military",
    lat: 47.5070,
    lng: 34.5853,
  },
  {
    id: "8",
    title: "Hezbollah launches rockets toward northern Israel",
    summary: "Multiple rocket salvos fired from southern Lebanon toward communities in northern Israel. Iron Dome intercepts reported.",
    source: "Times of Israel",
    timestamp: "2026-03-10T01:30:00Z",
    timeAgo: "5 hours ago",
    region: "middle-east",
    category: "military",
    lat: 33.2721,
    lng: 35.2033,
  },
  {
    id: "9",
    title: "Damascus suburb hit by airstrikes",
    summary: "Air raids target several locations in the eastern suburbs of Damascus. Reports of casualties and damage to residential buildings.",
    source: "SANA",
    timestamp: "2026-03-10T00:45:00Z",
    timeAgo: "6 hours ago",
    region: "syria",
    category: "airstrike",
    lat: 33.5138,
    lng: 36.2765,
  },
  {
    id: "10",
    title: "Odesa port operations suspended after missile threat",
    summary: "Commercial shipping operations at the Port of Odesa suspended following intelligence reports of incoming missile threats.",
    source: "Ukrinform",
    timestamp: "2026-03-09T23:00:00Z",
    timeAgo: "8 hours ago",
    region: "ukraine",
    category: "military",
    lat: 46.4825,
    lng: 30.7233,
  },
];
