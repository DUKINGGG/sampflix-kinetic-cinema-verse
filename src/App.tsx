
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Plans from "./pages/Plans";
import Browse from "./pages/Browse";
import MovieDetail from "./pages/MovieDetail";
import SeriesDetail from "./pages/SeriesDetail";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/series/:id" element={<SeriesDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
