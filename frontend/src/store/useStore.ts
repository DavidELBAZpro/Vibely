import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Track {
  title: string;
  artist: string;
  youtubeLink: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  prompt: string;
  tags: string[];
  createdAt: string;
}

interface StoreState {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  // Playlists
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (id: string) => void;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  
  // Generation state
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: true, // Default to dark mode
      toggleTheme: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        // Update document class
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      // Playlists
      playlists: [],
      currentPlaylist: null,
      addPlaylist: (playlist) => set((state) => ({
        playlists: [playlist, ...state.playlists]
      })),
      removePlaylist: (id) => set((state) => ({
        playlists: state.playlists.filter(p => p.id !== id)
      })),
      setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
      
      // Generation state
      isGenerating: false,
      setIsGenerating: (generating) => set({ isGenerating: generating }),
    }),
    {
      name: 'vibely-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        playlists: state.playlists,
      }),
    }
  )
);