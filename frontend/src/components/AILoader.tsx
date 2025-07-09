import { motion } from 'framer-motion';

interface AILoaderProps {
  text?: string;
}

export function AILoader({ text = "Generating your perfect playlist..." }: AILoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center space-y-6 p-8"
    >
      {/* Animated dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 gradient-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Rotating circle */}
      <motion.div
        className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Typewriter text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-center max-w-md"
      >
        {text}
      </motion.p>

      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: [
            '0 0 20px hsl(var(--primary) / 0.1)',
            '0 0 40px hsl(var(--primary) / 0.2)',
            '0 0 20px hsl(var(--primary) / 0.1)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}