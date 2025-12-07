import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Marquee({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [overflow, setOverflow] = useState(false);
  const contRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const hiddenMeasureRef = useRef<HTMLSpanElement>(null);
  const initialMask =
    "linear-gradient(to right,transparent,black 0%,black 90%,transparent)";
  const [mask, setMask] = useState(initialMask);

  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    let timerId: number = 0;
    if (contRef.current && hiddenMeasureRef.current) {
      const isOverflowing =
        hiddenMeasureRef.current.scrollWidth > contRef.current.offsetWidth;
      setOverflow(isOverflowing);

      if (isOverflowing) {
        setMask(initialMask);
        timerId = setTimeout(() => {
          setMask(
            "linear-gradient(to right,transparent,black 10%,black 90%,transparent)",
          );
        }, 3000);
      }
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [children]);

  const handleClick = () => {
    setResetKey((prev) => prev + 1);
    setMask(initialMask);
    setTimeout(() => {
      setMask(
        "linear-gradient(to right,transparent,black 10%,black 90%,transparent)",
      );
    }, 3000);
  };

  return (
    <div
      ref={contRef}
      style={{ mask: overflow ? mask : "" }}
      onClick={handleClick}
      key={resetKey}
      className={`w-full overflow-hidden whitespace-nowrap flex ${
        overflow ? "justify-start" : "justify-center"
      }`}
    >
      <span
        ref={hiddenMeasureRef}
        className={`absolute opacity-0 pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {children}
      </span>
      {overflow ? (
        <motion.div
          className={`flex ${className}`}
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: children.length * 0.2,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
          style={{ width: "fit-content" }}
        >
          <span className="mr-20">{children}</span>
          <span className="mr-20">{children}</span>
        </motion.div>
      ) : (
        <span ref={textRef} className={`truncate ${className}`}>
          {children}
        </span>
      )}
    </div>
  );
}

export default Marquee;
