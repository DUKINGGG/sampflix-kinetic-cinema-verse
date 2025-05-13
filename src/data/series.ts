
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
  thumbnailUrl?: string;
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
    thumbnailUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    seasons: [
      {
        id: "quantum-nexus-s1",
        title: "Season 1",
        thumbnailUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
        episodes: [
          {
            id: "qn-s1-e1",
            title: "The Discovery",
            description: "Dr. Eliza Chen makes a discovery that changes everything we know about physics.",
            thumbnailUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
            videoUrl: "/videos/quantum-nexus-s1e1.mp4",
            duration: "52m",
            episodeNumber: 1
          },
          {
            id: "qn-s1-e2",
            title: "The Breakthrough",
            description: "The team faces their first major obstacle while testing the quantum technology.",
            thumbnailUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    seasons: [
      {
        id: "crimson-heights-s1",
        title: "Season 1",
        thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        episodes: [
          {
            id: "ch-s1-e1",
            title: "Welcome to Crimson",
            description: "Detective Sarah Mills arrives in Crimson Heights to investigate a mysterious disappearance.",
            thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
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
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    seasons: [
      {
        id: "dynasty-warriors-s1",
        title: "Season 1",
        thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        episodes: [
          {
            id: "dw-s1-e1",
            title: "Rise of the Emperor",
            description: "The story begins with the rise of a powerful dynasty.",
            thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
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
  },
  {
    id: "series-4",
    title: "Squid Game",
    description: "456 desperate contestants compete in a mysterious and deadly survival game involving multiple children's games to win a ₩45.6 billion prize.",
    thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
    seasons: [
      {
        id: "squid-game-s1",
        title: "Season 1",
        thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
        episodes: [
          {
            id: "sg-s1-e1",
            title: "Red Light, Green Light",
            description: "Seong Gi-hun, a divorced father and debtor, is invited to play a series of children's games for a chance at a large cash prize.",
            thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
            videoUrl: "/videos/survival-game-s1e1.mp4",
            duration: "60m",
            episodeNumber: 1
          },
          {
            id: "sg-s1-e2",
            title: "The Shapes Game",
            description: "The players must complete a dangerous challenge involving cutting shapes from a fragile material within a time limit.",
            thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
            videoUrl: "/videos/survival-game-s1e2.mp4",
            duration: "55m",
            episodeNumber: 2
          },
          {
            id: "sg-s1-e3",
            title: "Team Formation",
            description: "Tensions rise as players must choose teammates for the next challenge, knowing that they may need to face off against each other.",
            thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
            videoUrl: "/videos/survival-game-s1e3.mp4",
            duration: "58m",
            episodeNumber: 3
          },
          {
            id: "sg-s1-e4",
            title: "Midnight Riot",
            description: "As resources become scarce, players turn against each other during a tense night of conflict and alliances.",
            thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
            videoUrl: "/videos/survival-game-s1e4.mp4",
            duration: "62m",
            episodeNumber: 4
          },
          {
            id: "sg-s1-e5",
            title: "The Glass Bridge",
            description: "Players must cross a treacherous glass bridge where one wrong step means certain death.",
            thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
            videoUrl: "/videos/survival-game-s1e5.mp4",
            duration: "59m",
            episodeNumber: 5
          },
          {
            id: "sg-s1-e6",
            title: "The Final Game",
            description: "The remaining contestants face off in one final game that will determine who takes home the enormous cash prize.",
            thumbnailUrl: "/lovable-uploads/1d8f0ebc-94f2-4789-9039-ea74014d4f3b.png",
            videoUrl: "/videos/survival-game-s1e6.mp4",
            duration: "65m",
            episodeNumber: 6
          }
        ]
      },
      {
        id: "squid-game-s2",
        title: "Season 2",
        thumbnailUrl: "/lovable-uploads/4b32cac2-0c03-423f-967f-146a2b5668c4.png",
        episodes: [
          {
            id: "sg-s2-e1",
            title: "Return to the Game",
            description: "A new group of players enters the deadly competition, along with a few surprising returning contestants.",
            thumbnailUrl: "/lovable-uploads/4b32cac2-0c03-423f-967f-146a2b5668c4.png",
            videoUrl: "/videos/survival-game-s2e1.mp4",
            duration: "64m",
            episodeNumber: 1
          },
          {
            id: "sg-s2-e2",
            title: "New Rules",
            description: "The players discover that the games have changed, with new twists making them even more dangerous than before.",
            thumbnailUrl: "/lovable-uploads/4b32cac2-0c03-423f-967f-146a2b5668c4.png",
            videoUrl: "/videos/survival-game-s2e2.mp4",
            duration: "58m",
            episodeNumber: 2
          },
          {
            id: "sg-s2-e3",
            title: "Let The New Games Begin",
            description: "Contestants face their first major challenge in the new season with higher stakes than ever before.",
            thumbnailUrl: "/lovable-uploads/4b32cac2-0c03-423f-967f-146a2b5668c4.png",
            videoUrl: "/videos/survival-game-s2e3.mp4",
            duration: "61m",
            episodeNumber: 3
          }
        ]
      }
    ],
    year: 2021,
    genre: ["Thriller", "Drama", "Survival"],
    rating: "TV-MA",
    isFeatured: true,
    isNew: true
  }
];
