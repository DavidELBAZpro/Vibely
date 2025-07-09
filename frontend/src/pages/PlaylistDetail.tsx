import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Music, Play, Youtube } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useStore } from '../store/useStore';

export default function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { playlists } = useStore();
  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const foundPlaylist = playlists.find(p => p.id === id);
      setPlaylist(foundPlaylist);
    }
  }, [id, playlists]);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Playlist not found</h2>
          <Link to="/my-playlists">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Playlists
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/my-playlists')}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Playlist Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center shrink-0">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {playlist.name}
                    </CardTitle>
                    <p className="text-muted-foreground">{playlist.tracks.length} tracks</p>
                    <div className="text-sm text-muted-foreground">
                      Created {new Date(playlist.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {playlist.prompt && (
                <CardContent className="pt-0">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="text-sm font-medium mb-2 text-muted-foreground">Original Prompt:</h4>
                    <p className="text-sm">{playlist.prompt}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>

          {/* Tracks List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
              <Play className="w-6 h-6 text-primary" />
              <span>Tracks</span>
            </h3>
            
            <div className="space-y-3">
              {playlist.tracks.map((track: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <Card className="hover:shadow-glow-primary/20 transition-smooth border-border/50 bg-card/30 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-semibold">
                            {index + 1}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-lg">{track.title}</h4>
                            <p className="text-muted-foreground">{track.artist}</p>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="hover:bg-primary/10 hover:text-primary transition-smooth"
                        >
                          <a
                            href={track.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Listen to ${track.title} by ${track.artist} on YouTube`}
                          >
                            <Youtube className="w-7 h-7" />
                            
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}