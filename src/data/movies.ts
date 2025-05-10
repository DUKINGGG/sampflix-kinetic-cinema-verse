
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
  }
];
