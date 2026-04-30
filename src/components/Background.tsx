import { motion, useReducedMotion } from "framer-motion";

export default function Background() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="noise fixed inset-0 -z-10 overflow-hidden bg-aurora"
    >
      <div className="absolute inset-0 opacity-[0.06] mystic-grid dark:opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70 dark:to-midnight/80" />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute -top-56 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
            animate={{
              x: ["-50%", "-54%", "-50%"],
              y: [-30, 18, -30],
              scale: [1, 1.08, 1]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-64 left-[12%] h-[34rem] w-[34rem] rounded-full bg-violet-600/20 blur-3xl"
            animate={{ y: [0, 24, 0], x: [0, -16, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[22%] right-[6%] h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl"
            animate={{ y: [0, -22, 0], x: [0, 12, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}
