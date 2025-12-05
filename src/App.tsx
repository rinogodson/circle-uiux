import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  MdDownload,
  MdFavoriteBorder,
  MdHomeFilled,
  MdRepeat,
  MdSearch,
} from "react-icons/md";
import ProgressBar from "./Components/ProgressBar";

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [progress, setProgress] = useState(35);

  const [playing, setPlaying] = useState(true);

  // TODO: On user going non-fullscreen using back button, the button is not popping in

  useEffect(() => {
    const handlerfn = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(true);
      }
    };
    window.addEventListener("popstate", handlerfn);

    return () => window.removeEventListener("popstate", handlerfn);
  }, []);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`THE FULLSCREEN NOT WORKING!`, err);
      });
      setIsFullScreen(true);
    }
    if (document.fullscreenElement) {
      setIsFullScreen(false);
    }
  };

  return (
    <div className="font-[Lexend] relative  bg-[#090909] z-0 sm:h-[800px] flex flex-col justify-between overflow-hidden items-center h-screen w-svw sm:w-auto sm:aspect-384/784 sm:rounded-4xl sm:border-3 border-white/30">
      <div className="absolute -z-1 w-full h-full">
        <div className="absolute h-full bg-[url(/song1.png)] w-full bg-cover bg-center" />
        <motion.div
          animate={{
            "--alpha": playing ? 0.7 : 0.8,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(to top, black, rgba(0, 0, 0, var(--alpha)))",
          }}
          className="absolute h-full backdrop-blur-2xl w-full bg-cover bg-center"
        />
      </div>

      <div className="w-full h-fit mt-15 flex-col justify-center items-center gap-8 flex">
        <img
          src="/song1.png"
          className="w-[60%] aspect-square border border-white/6 rounded-[15px] shadow-[0_4px_100px_black]"
        />

        <div className="flex justify-center items-center flex-col">
          <p className="text-xl">Somebody That I Used To Know</p>
          <p className="text-white/70">Gotye</p>
        </div>
      </div>

      <div className="w-full h-full flex-col  justify-center items-center flex">
        <div className="h-full w-full justify-center items-center flex">
          <CirclePad
            playCtx={{ playing, setPlaying }}
            sP={setProgress}
            p={progress}
          />
        </div>
        <div className="flex justify-around text-white/50 h-20 items-center w-full">
          <MdHomeFilled className="text-3xl" />
          <div className="flex flex-col justify-center items-center text-sm">
            <span className="text-white/30">Next Up:</span>
            <span className="text-white/50">Kesariya (Lofi Flip)</span>
          </div>

          <MdSearch className="text-3xl" />
        </div>
      </div>

      {!isFullScreen && (
        <div className="bg-[#090909] h-screen w-screen flex absolute z-199 justify-center items-center sm:hidden">
          <button
            onClick={handleFullScreen}
            className="px-6 py-3 text-black text-2xl bg-linear-to-b from-white to-white/80 font-bold active:brightness-75 rounded-full [corner-shape:squircle]"
          >
            Go Fullscreen
          </button>
        </div>
      )}
    </div>
  );
};

const CirclePad = ({
  playCtx,
  sP,
  p,
}: {
  playCtx: {
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  };
  sP: React.Dispatch<React.SetStateAction<number>>;
  p: number;
}) => {
  const cont = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number | undefined>(0);

  useEffect(() => {
    if (cont.current) {
      setContainerWidth(cont.current.offsetWidth);
    }
  }, []);

  return (
    <div
      ref={cont}
      className="w-[80%] grid overflow-hidden grid-rows-[3.8fr_2.4fr_3.8fr] aspect-square bg-radial from-black to-black/30 backdrop-brightness-150 rounded-full border-2 border-white/10"
    >
      <div className="flex justify-center relative items-end">
        <div className="absolute top-[15px]">
          <ProgressBar
            span={120}
            size={Number(containerWidth) - 30}
            stroke={10}
            sP={sP}
            p={p}
          />
        </div>

        <div className="font-[JetBrains_Mono] bg-white/2 mb-5 border border-white/10 text-sm text-white/50 px-3 py-1 rounded-[9px]">
          0:40/2:34
        </div>
      </div>
      <div className="flex w-full justify-around items-center">
        <img src="/indicatorarrow.svg" className="opacity-8 h-[80%]" />
        <motion.svg
          onClick={() => playCtx.setPlaying(!playCtx.playing)}
          viewBox="0 0 400 400"
          className="w-20 aspect-square"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: playCtx.playing ? 1 : 0.9,
            opacity: playCtx.playing ? 1 : 0.8,
            filter: playCtx.playing
              ? "drop-shadow(0 0 10px rgba(255,255,255,0.5))"
              : "",
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 6,
            mass: 0.5,
          }}
        >
          <defs>
            <motion.radialGradient
              id="greenGlow"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <motion.stop
                animate={{ offset: playCtx.playing ? "70%" : "50%" }}
                stopColor="#9c9c9c"
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 7,
                  mass: 0.5,
                }}
              />
              <stop offset="100%" stopColor="#d6d6d6" />
            </motion.radialGradient>

            <mask id="maskofhole">
              <ellipse cx="200" cy="200" rx="200" ry="200" fill="white" />
              <motion.ellipse
                cx="200"
                cy="200"
                animate={{
                  rx: playCtx.playing ? 140 : 80,
                  ry: playCtx.playing ? 140 : 80,
                }}
                fill="black"
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 7,
                  mass: 0.5,
                }}
              />
            </mask>
          </defs>

          <g>
            <ellipse
              cx="200"
              cy="200"
              rx="200"
              ry="200"
              fill="url(#greenGlow)"
              mask="url(#maskofhole)"
            />
          </g>
        </motion.svg>

        <img
          src="/indicatorarrow.svg"
          className="opacity-8 h-[80%] rotate-180"
        />
      </div>
      <div className="relative flex justify-center p-2 items-start pt-2">
        <svg
          viewBox="0 0 200 200"
          className="w-full absolute bottom-0 pointer-events-none rotate-50"
        >
          <g>
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              stroke-width="50"
              pathLength="360"
              stroke-dasharray="80 300"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <div className="absolute w-full flex translate-y-1 justify-center items-center h-full text-4xl text-white/40 gap-7">
          <MdRepeat className="-translate-y-5" />
          <MdFavoriteBorder />
          <MdDownload className="-translate-y-5" />
        </div>
      </div>
    </div>
  );
};

export default App;
