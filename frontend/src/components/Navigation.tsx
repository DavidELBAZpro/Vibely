import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Music,
  List,
  Home,
  LogIn,
  LogOut,
  CreditCard,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useStore } from "../store/useStore";
import { useAuth } from "../contexts/AuthContext";
import { useCredits } from "../contexts/CreditContext";

export function Navigation() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useStore();
  const { user, signOut } = useAuth();
  const { credits } = useCredits();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    ...(user
      ? [
          { path: "/generate-playlist", icon: Music, label: "Generate" },
          { path: "/my-playlists", icon: List, label: "My Playlists" },
          { path: "/pricing", icon: CreditCard, label: "Credits" },
        ]
      : []),
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vibely.io
            </span>
          </motion.div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 transition-smooth ${
                      isActive
                        ? "gradient-primary text-white shadow-glow-primary"
                        : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              </motion.div>
            );
          })}

          {/* Credits Badge (only if user is logged in) */}
          {user && (
            <Badge variant="secondary" className="hidden sm:flex">
              {credits} crédits
            </Badge>
          )}

          {/* Auth Buttons */}
          {user ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="transition-smooth flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-smooth flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="transition-smooth"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
