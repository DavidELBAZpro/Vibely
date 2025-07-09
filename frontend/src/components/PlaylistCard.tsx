import { motion } from 'framer-motion';
import { ExternalLink, Trash2, Music, Clock, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useStore, Playlist } from '../store/useStore';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PlaylistCardProps {
  playlist: Playlist;
  onDelete?: (id: string) => void;
}

export function PlaylistCard({ playlist, onDelete }: PlaylistCardProps) {
  const { removePlaylist } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = () => {
    removePlaylist(playlist.id);
    onDelete?.(playlist.id);
    toast({
      title: "Playlist deleted",
      description: `"${playlist.name}" has been removed from your collection.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-glow-primary/20 transition-smooth border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Music className="w-5 h-5 text-primary" />
                <span>{playlist.name}</span>
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatDate(playlist.createdAt)}</span>
                <span>•</span>
                <span>{playlist.tracks.length} tracks</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Prompt */}
          <div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {playlist.prompt}
            </p>
          </div>

          {/* Tags */}
          {playlist.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {playlist.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {playlist.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{playlist.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}

          {/* Track List */}
          <div className="space-y-2">
            {playlist.tracks.slice(0, 3).map((track, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-smooth"
                whileHover={{ x: 5 }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="shrink-0"
                >
                  <a
                    href={track.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
            ))}
            
            {playlist.tracks.length > 3 && (
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  +{playlist.tracks.length - 3} more tracks
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}