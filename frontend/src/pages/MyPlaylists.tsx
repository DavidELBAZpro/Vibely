import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Music, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PlaylistCard } from '../components/PlaylistCard';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export default function MyPlaylists() {
  const { playlists } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                My Playlists
              </h1>
              <p className="text-xl text-muted-foreground">
                Your AI-generated musical collections
              </p>
            </div>
            
            <Link to="/generate-playlist">
              <Button
                size="lg"
                className="gradient-primary text-white hover:shadow-glow-primary transition-spring"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Playlist
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative mb-8"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search playlists by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-base bg-card/50 backdrop-blur-sm border-border/50"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4" />
                <span>{playlists.length} total playlists</span>
              </div>
              {searchQuery && (
                <div>
                  <span>{filteredPlaylists.length} results found</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Playlists Grid */}
          <AnimatePresence mode="popLayout">
            {filteredPlaylists.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPlaylists.map((playlist) => (
                  <motion.div
                    key={playlist.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlaylistCard playlist={playlist} />
                  </motion.div>
                ))}
              </motion.div>
            ) : playlists.length === 0 ? (
              // Empty state
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Music className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No playlists yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't created any playlists yet. Start by generating your first AI-powered playlist!
                </p>
                <Link to="/generate-playlist">
                  <Button
                    size="lg"
                    className="gradient-primary text-white hover:shadow-glow-primary transition-spring"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Playlist
                  </Button>
                </Link>
              </motion.div>
            ) : (
              // No search results
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No playlists found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  No playlists match your search query "{searchQuery}". Try different keywords or create a new playlist.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                  <Link to="/generate-playlist">
                    <Button className="gradient-primary text-white">
                      <Plus className="w-5 h-5 mr-2" />
                      Create New Playlist
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}