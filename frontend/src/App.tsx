import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout";
import { useStore } from "./store/useStore";
import Landing from "./pages/Landing";
import GeneratePlaylist from "./pages/GeneratePlaylist";
import MyPlaylists from "./pages/MyPlaylists";
import PlaylistDetail from "./pages/PlaylistDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { isDarkMode } = useStore();

  // Apply theme on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/generate-playlist" element={<GeneratePlaylist />} />
                <Route path="/my-playlists" element={<MyPlaylists />} />
                <Route path="/playlist/:id" element={<PlaylistDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
