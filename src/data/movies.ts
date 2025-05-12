
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  year: number;
  genre: string[];
  rating: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export const movies: Movie[] = [
  {
    id: "movie-1",
    title: "Cosmic Journey",
    description: "A team of astronauts embarks on a journey through space and time to save humanity from extinction.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3",
    videoUrl: "/videos/cosmic-journey.mp4",
    duration: "2h 15m",
    year: 2023,
    genre: ["Sci-Fi", "Adventure"],
    rating: "PG-13",
    isFeatured: true
  },
  {
    id: "movie-2",
    title: "The Last Guardian",
    description: "A warrior must protect the last of a mystical species while battling dark forces.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3",
    videoUrl: "/videos/last-guardian.mp4",
    duration: "1h 58m",
    year: 2022,
    genre: ["Fantasy", "Action"],
    rating: "PG-13"
  },
  {
    id: "movie-3",
    title: "Midnight Protocol",
    description: "A cybersecurity expert discovers a conspiracy that threatens global networks.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3",
    videoUrl: "/videos/midnight-protocol.mp4",
    duration: "2h 05m",
    year: 2023,
    genre: ["Thriller", "Tech"],
    rating: "R",
    isNew: true
  },
  {
    id: "movie-4",
    title: "Eternal Echo",
    description: "Two souls find each other across different lifetimes in this epic romance.",
    thumbnailUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3",
    videoUrl: "/videos/eternal-echo.mp4",
    duration: "2h 10m",
    year: 2024,
    genre: ["Romance", "Drama"],
    rating: "PG-13",
    isNew: true
  },
  {
    id: "movie-5",
    title: "Shadow Legends",
    description: "An elite force must infiltrate an enemy stronghold to prevent a catastrophic attack.",
    thumbnailUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3",
    videoUrl: "/videos/shadow-legends.mp4",
    duration: "1h 47m",
    year: 2023,
    genre: ["Action", "Thriller"],
    rating: "PG-13"
  },
  {
    id: "movie-6",
    title: "Neon Nights",
    description: "A detective hunts a serial killer in a cyberpunk metropolis where reality and virtual worlds blur.",
    thumbnailUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3",
    videoUrl: "/videos/neon-nights.mp4",
    duration: "2h 08m",
    year: 2023,
    genre: ["Cyberpunk", "Crime", "Mystery"],
    rating: "R",
    isNew: true
  },
  {
    id: "movie-7",
    title: "Wilderness",
    description: "A family camping trip turns into a fight for survival when they encounter something supernatural in the forest.",
    thumbnailUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3",
    videoUrl: "/videos/wilderness.mp4",
    duration: "1h 52m",
    year: 2022,
    genre: ["Horror", "Thriller"],
    rating: "R"
  },
  {
    id: "movie-8",
    title: "Ocean's Depth",
    description: "A marine biologist discovers an unknown species in the deepest part of the ocean that could change human evolution.",
    thumbnailUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3",
    videoUrl: "/videos/oceans-depth.mp4",
    duration: "2h 22m",
    year: 2024,
    genre: ["Adventure", "Sci-Fi", "Mystery"],
    rating: "PG-13",
    isFeatured: true
  },
  {
    id: "movie-9",
    title: "The Grand Heist",
    description: "A team of skilled thieves plan to rob the most secure bank in the world during an international art exhibition.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-4.0.3",
    videoUrl: "/videos/grand-heist.mp4",
    duration: "2h 15m",
    year: 2023,
    genre: ["Action", "Crime", "Thriller"],
    rating: "PG-13"
  },
  {
    id: "movie-10",
    title: "Forever Young",
    description: "A scientist discovers the secret to eternal youth, but the price may be higher than humanity can afford.",
    thumbnailUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3",
    videoUrl: "/videos/forever-young.mp4",
    duration: "1h 58m",
    year: 2024,
    genre: ["Drama", "Sci-Fi"],
    rating: "PG-13",
    isNew: true
  },
  {
    id: "movie-11",
    title: "Desert Storm",
    description: "A journalist trapped in a war-torn country must navigate dangerous territory to bring the truth to the world.",
    thumbnailUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3",
    videoUrl: "/videos/desert-storm.mp4",
    duration: "2h 04m",
    year: 2022,
    genre: ["War", "Drama", "Action"],
    rating: "R"
  },
  {
    id: "movie-12",
    title: "Whispers in the Dark",
    description: "A child psychologist works with a boy who claims to hear whispers from another dimension.",
    thumbnailUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3",
    videoUrl: "/videos/whispers.mp4",
    duration: "1h 49m",
    year: 2023,
    genre: ["Horror", "Psychological", "Mystery"],
    rating: "PG-13"
  }
];
