import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

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

  const lyrics = useMemo(() => parseLRC(lrc), [lrc]);

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
    if (containerRef.current) {
      const activeElement = containerRef.current.children[
        activeLineIndex + 1
      ] as HTMLElement;

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [activeLineIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-9/10 overflow-y-auto scroll-smooth px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div className="h-[50%]" />
      {lyrics.map((line, index) => {
        const isActive = index === activeLineIndex;

        return (
          <motion.div
            key={index}
            animate={{
              opacity: isActive ? 100 : 30,
              scale: isActive ? 1 : 0.95,
              filter: isActive ? "blur(0px)" : "blur(2px)",
              color: isActive
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.4)",
            }}
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
    </div>
  );
};

export default Lyrics;
