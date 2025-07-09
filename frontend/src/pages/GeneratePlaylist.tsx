import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { AILoader } from '../components/AILoader';
import { useStore, Playlist, Track } from '../store/useStore';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const musicTags = [
  'House', 'Pop', 'Rock', 'AfroHouse', 'DeepHouse', 'Disco', 'Funk', 'Techno', 'Reggaeton', 'Trap'
];

const moodTags = [
  'Chill', 'Party', 'Good Night', 'Sport', 'Study', 'Romantic', 'Happy', 'Focus', 'Sad', 'Energetic'
];

export default function GeneratePlaylist() {
  const [prompt, setPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [playlistLength, setPlaylistLength] = useState(5);
  
  const { isGenerating, setIsGenerating, addPlaylist, setCurrentPlaylist } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const resetForm = () => {
    setPrompt('');
    setSelectedTags([]);
    setPlaylistLength(5);
  };

  const generatePlaylist = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a description for your playlist.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      toast({
        title: "🎵 Generating playlist...",
        description: "Our AI is crafting your perfect playlist. This may take a moment.",
      });

      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock playlist generation
      const mockTracks: Track[] = [
        {
          title: "The Light",
          artist: "Francis Mercier",
          youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          title: "Midnight City",
          artist: "M83",
          youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          title: "Strobe",
          artist: "Deadmau5",
          youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          title: "One More Time",
          artist: "Daft Punk",
          youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          title: "Around The World",
          artist: "Daft Punk",
          youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ];

      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: `AI Playlist ${new Date().toLocaleDateString()}`,
        tracks: mockTracks.slice(0, playlistLength),
        prompt: prompt.trim(),
        tags: selectedTags,
        createdAt: new Date().toISOString()
      };

      addPlaylist(newPlaylist);
      setCurrentPlaylist(newPlaylist);

      toast({
        title: "🎉 Playlist generated!",
        description: `Your ${playlistLength}-track playlist is ready to rock!`,
      });

      // Reset form
      resetForm();
      
      // Navigate to my playlists
      navigate('/my-playlists');

    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Something went wrong while generating your playlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AILoader text="Creating your perfect vibe..." />
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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Generate Your Playlist
            </h1>
            <p className="text-xl text-muted-foreground">
              Describe your perfect musical moment and let AI create the soundtrack
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span>Playlist Generator</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Prompt Input */}
              <div className="space-y-3">
                <Label htmlFor="prompt" className="text-base font-medium">
                  Describe your ideal playlist (max 300 words)
                </Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Upbeat electronic music for a late-night coding session with deep bass and minimal vocals...'"
                  className="min-h-32 resize-y text-base"
                  maxLength={300}
                  aria-describedby="prompt-help"
                />
                <div id="prompt-help" className="flex justify-between text-sm text-muted-foreground">
                  <span>Be specific about mood, genre, tempo, or any preferences</span>
                  <span>{prompt.length}/300</span>
                </div>
              </div>

              {/* Music Style Tags */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Music Styles</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {musicTags.map((tag) => (
                    <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-smooth ${
                          selectedTags.includes(tag) 
                            ? 'gradient-primary text-white shadow-glow-primary/50' 
                            : 'hover:bg-primary/10'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mood Tags */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Moods</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {moodTags.map((tag) => (
                    <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-smooth ${
                          selectedTags.includes(tag) 
                            ? 'gradient-accent text-white shadow-glow-accent/50' 
                            : 'hover:bg-accent/10'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Selected Tags Preview */}
              {selectedTags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <Label className="text-base font-medium">Selected Tags ({selectedTags.length})</Label>
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Playlist Length */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Playlist Length</Label>
                <div className="flex gap-2">
                  {[3, 5, 8, 10].map((length) => (
                    <Button
                      key={length}
                      variant={playlistLength === length ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPlaylistLength(length)}
                      className={playlistLength === length ? 'gradient-primary text-white' : ''}
                    >
                      {length} tracks
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={generatePlaylist}
                  size="lg"
                  className="flex-1 gradient-primary text-white hover:shadow-glow-primary transition-spring"
                  disabled={!prompt.trim()}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Generate Playlist
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}