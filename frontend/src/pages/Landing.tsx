import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Headphones, Sparkles, Music, Play, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description:
        "Our advanced AI creates personalized playlists based on your unique prompts and musical preferences.",
    },
    {
      icon: Music,
      title: "Mood & Style Tags",
      description:
        "Choose from 20 curated tags covering music styles and moods to fine-tune your perfect playlist.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get your custom playlist in seconds with direct YouTube links for immediate listening.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-secondary opacity-30" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Create Perfect Playlists with AI
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform your musical ideas into curated playlists instantly.
              Just describe your vibe, and let our AI do the magic.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="float-to-center"
            >
              <Link to={user ? "/generate-playlist" : "/login"}>
                <Button
                  size="lg"
                  className="gradient-primary text-white hover:shadow-glow-primary transition-spring text-lg px-8 py-6 rounded-full"
                >
                  <Headphones className="w-6 h-6 mr-2" />
                  {user ? "🎧 Generate My Playlist" : "🎧 Get Started"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Music Notes Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/20"
                initial={{
                  x: Math.random() * 800,
                  y: 600,
                }}
                animate={{
                  y: -100,
                  x: Math.random() * 800,
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <Music className="w-8 h-8" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Vibely?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of music discovery with our cutting-edge AI
              technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-glow-primary/20 transition-smooth bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-accent opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Next Favorite Song?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of music lovers who've already created amazing
              playlists with Vibely
            </p>
            <Link to={user ? "/generate-playlist" : "/login"}>
              <Button
                size="lg"
                className="gradient-primary text-white hover:shadow-glow-primary transition-spring text-lg px-8 py-6 rounded-full"
              >
                <Play className="w-6 h-6 mr-2" />
                {user ? "Start Creating Now" : "Sign Up & Start Creating"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
