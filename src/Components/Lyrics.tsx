import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

interface LyricLine {
  time: number;
  text: string;
}

const parseLRC = (lrc: string): LyricLine[] => {
  return lrc
    .split("\n")
    .map((line) => {
      const match = line.match(/\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/);
      if (!match) return null;

      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const text = match[3].trim();

      return {
        time: minutes * 60 + seconds,
        text,
      };
    })
    .filter((line): line is LyricLine => line !== null)
    .sort((a, b) => a.time - b.time);
};

const Lyrics = ({ currentTime, lrc }: { currentTime: number; lrc: string }) => {
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lyrics = useMemo(() => parseLRC(lrc), [lrc]);

  const scrollSpring = useSpring(0, { stiffness: 100, damping: 50, mass: 1 });

  useEffect(() => {
    const index = lyrics.findIndex((line, i) => {
      const nextLine = lyrics[i + 1];
      return (
        currentTime >= line.time && (!nextLine || currentTime < nextLine.time)
      );
    });

    if (index !== -1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveLineIndex(index);
    }
  }, [currentTime, lyrics]);

  useEffect(() => {
    if (containerRef.current && lineRefs.current[activeLineIndex]) {
      const container = containerRef.current;
      const activeLine = lineRefs.current[activeLineIndex];

      if (activeLine) {
        const containerHeight = container.clientHeight;
        const lineHeight = activeLine.clientHeight;
        const lineOffsetTop = activeLine.offsetTop;

        const targetScrollTop =
          lineOffsetTop - containerHeight / 2 + lineHeight / 2;

        scrollSpring.set(targetScrollTop);
      }
    }
  }, [activeLineIndex, scrollSpring]);

  useEffect(() => {
    return scrollSpring.on("change", (latest) => {
      if (containerRef.current) {
        containerRef.current.scrollTop = latest;
      }
    });
  }, [scrollSpring]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: "100%" }}
      animate={{ opacity: 1, translateY: "0%" }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 50,
        mass: 1,
      }}
      ref={containerRef}
      className="w-full aspect-9/10 overflow-y-auto px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div className="h-10" />
      {lyrics.map((line, index) => {
        const isActive = index === activeLineIndex;

        return (
          <motion.div
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            layout
            key={index}
            initial={{
              opacity: isActive ? 100 : 30,
              scale: isActive ? 1 : 0.95,
              filter: isActive ? "blur(0px)" : "blur(1px)",
              color: isActive
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.4)",
            }}
            animate={{
              opacity: isActive ? 100 : 30,
              scale: isActive ? 1 : 0.95,
              filter: isActive ? "blur(0px)" : "blur(2px)",
              color: isActive
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.4)",
            }}
            transition={{ type: "tween" }}
            className={`mb-4 text-left transition-all duration-500 ease-out origin-left`}
          >
            <p
              className={`
                  text-2xl font-bold tracking-tight leading-relaxed
                  ${line.text === "" ? "h-8" : ""} 
                `}
            >
              {line.text || "♪ ♪ ♪"}
            </p>
          </motion.div>
        );
      })}
      <div className="h-[50%]" />
    </motion.div>
  );
};

export default Lyrics;
