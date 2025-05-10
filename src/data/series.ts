
export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  episodeNumber: number;
}

export interface Season {
  id: string;
  title: string;
  episodes: Episode[];
}

export interface Series {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  seasons: Season[];
  year: number;
  genre: string[];
  rating: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const series: Series[] = [
  {
    id: "series-1",
    title: "Quantum Nexus",
    description: "In a world where reality is malleable, a group of scientists discovers how to manipulate the fabric of existence.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
    seasons: [
      {
        id: "quantum-nexus-s1",
        title: "Season 1",
        episodes: [
          {
            id: "qn-s1-e1",
            title: "The Discovery",
            description: "Dr. Eliza Chen makes a discovery that changes everything we know about physics.",
            thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
            videoUrl: "/videos/quantum-nexus-s1e1.mp4",
            duration: "52m",
            episodeNumber: 1
          },
          {
            id: "qn-s1-e2",
            title: "The Breakthrough",
            description: "The team faces their first major obstacle while testing the quantum technology.",
            thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
            videoUrl: "/videos/quantum-nexus-s1e2.mp4",
            duration: "48m",
            episodeNumber: 2
          }
        ]
      }
    ],
    year: 2023,
    genre: ["Sci-Fi", "Drama"],
    rating: "TV-14",
    isFeatured: true
  },
  {
    id: "series-2",
    title: "Crimson Heights",
    description: "A thrilling mystery unfolds in a small town where nothing is as it seems.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3",
    seasons: [
      {
        id: "crimson-heights-s1",
        title: "Season 1",
        episodes: [
          {
            id: "ch-s1-e1",
            title: "Welcome to Crimson",
            description: "Detective Sarah Mills arrives in Crimson Heights to investigate a mysterious disappearance.",
            thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3",
            videoUrl: "/videos/crimson-heights-s1e1.mp4",
            duration: "55m",
            episodeNumber: 1
          }
        ]
      }
    ],
    year: 2022,
    genre: ["Mystery", "Thriller"],
    rating: "TV-MA"
  },
  {
    id: "series-3",
    title: "Dynasty Warriors",
    description: "An epic tale of rivalry, honor, and conquest in ancient times.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3",
    seasons: [
      {
        id: "dynasty-warriors-s1",
        title: "Season 1",
        episodes: [
          {
            id: "dw-s1-e1",
            title: "Rise of the Emperor",
            description: "The story begins with the rise of a powerful dynasty.",
            thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3",
            videoUrl: "/videos/dynasty-warriors-s1e1.mp4",
            duration: "58m",
            episodeNumber: 1
          }
        ]
      }
    ],
    year: 2023,
    genre: ["Historical", "Action"],
    rating: "TV-14",
    isNew: true
  }
];
