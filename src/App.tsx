import { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import {
  MdDownload,
  MdFavorite,
  MdFavoriteBorder,
  MdHomeFilled,
  MdRepeat,
  MdSearch,
} from "react-icons/md";
import ProgressBar from "./Components/ProgressBar";
import Queue from "./Components/Queue";
import Marquee from "./Components/Marquee";

import useProvider from "./Hooks/CtxProvider";
import type ctxSchema from "./Hooks/schemaAndData";
import Lyrics from "./Components/Lyrics";
import Tutorial from "./Components/Tutorial";

const vibrate = (arr: number[]) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(arr);
  }
};

async function downloadFileFromUrl(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl);
}

const numberToFormattedTime = (secs: number) => {
  if (Number.isNaN(secs)) return "-";
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
};

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showQueue, setShowQueue] = useState(false);
  const [showTut, setShowTut] = useState(false);

  const [playing, setPlaying] = useState(false);

  const { ctx, setCtx } = useProvider();

  // TODO: On user going non-fullscreen using back button, the button is not popping in

  const isAudioUpdate = useRef(false);

  const musicPlayer = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!musicPlayer.current) return;

    if (isAudioUpdate.current) {
      isAudioUpdate.current = false;
      return;
    }
    if (musicPlayer.current.duration) {
      musicPlayer.current.currentTime =
        (musicPlayer.current.duration * progress) / 100;
      if (musicPlayer.current.paused) musicPlayer.current.play();
    }
  }, [progress]);

  useEffect(() => {
    musicPlayer.current = new Audio();

    const handleTimeUpdate = () => {
      if (musicPlayer.current && musicPlayer.current.duration) {
        isAudioUpdate.current = true;
        setProgress(
          (musicPlayer.current.currentTime / musicPlayer.current.duration) *
            100,
        );
      }
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    musicPlayer.current.addEventListener("timeupdate", handleTimeUpdate);
    musicPlayer.current.addEventListener("play", handlePlay);
    musicPlayer.current.addEventListener("pause", handlePause);

    const handlerfn = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(true);
      }
    };
    window.addEventListener("popstate", handlerfn);

    return () => {
      window.removeEventListener("popstate", handlerfn);
      if (musicPlayer.current) {
        musicPlayer.current.removeEventListener("timeupdate", handleTimeUpdate);
        musicPlayer.current.removeEventListener("play", handlePlay);
        musicPlayer.current.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  useEffect(() => {
    if (!musicPlayer.current) return;
    const handleEnded = () => {
      if (!musicPlayer.current) return;
      if (ctx.repeat) {
        setProgress(0);
        musicPlayer.current.play().then(() => {
          setPlaying(true);
        });
        return;
      }
      if (ctx.currentSong < ctx.songs.length - 1)
        setCtx("currentSong", ctx.currentSong + 1);
      else setCtx("currentSong", 0);
    };
    musicPlayer.current.addEventListener("ended", handleEnded);
    return () => {
      if (!musicPlayer.current) return;
      musicPlayer.current.removeEventListener("ended", handleEnded);
    };
  }, [ctx.currentSong, ctx.repeat, ctx.songs.length, setCtx]);

  useEffect(() => {
    if (!musicPlayer.current) return;
    musicPlayer.current.src = ctx.songs[ctx.currentSong].song;
    musicPlayer.current.play().then(() => {
      setPlaying(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.currentSong]);

  useEffect(() => {
    if (!musicPlayer.current) return;
    if (playing) musicPlayer.current.play();
    else musicPlayer.current.pause();
  }, [playing]);

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

  const [showVolume, setShowVolume] = useState(false);
  const renderPassed = useRef(true);

  useEffect(() => {
    let id = 0;
    if (musicPlayer.current) musicPlayer.current.volume = ctx.volume / 100;
    if (renderPassed.current) {
      renderPassed.current = false;
    } else {
      setShowVolume(true);
      id = setTimeout(() => {
        setShowVolume(false);
      }, 2000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [ctx.volume]);

  const [showToast, setToast] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => {
      setToast(false);
    }, 6000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className="font-[Lexend] relative  bg-[#090909] z-0 sm:h-[800px] flex flex-col justify-between overflow-hidden items-center h-screen w-svw sm:w-auto sm:aspect-384/784 sm:rounded-4xl sm:border-3 border-white/30">
      <div
        onClick={() => setShowTut(true)}
        className="tutorial w-10 aspect-square bg-[#1b1b1b] text-white/70 opacity-50 absolute top-5 right-5 border border-white/30 rounded-full flex justify-center items-center text-2xl"
      >
        ?
      </div>
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setToast(false);
            }}
            className="bg-[#1b1b1b] absolute right-16 top-5 px-3 py-1 border border-white/30 rounded-full"
          >
            Need help?
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showTut && <Tutorial sT={setShowTut} />}
      </AnimatePresence>
      <AnimatePresence mode="sync">
        {showQueue && <Queue c={{ ctx, setCtx }} sQ={setShowQueue} />}
      </AnimatePresence>
      <AnimatePresence>
        {showVolume && (
          <motion.div
            className="h-40 z-1000 w-2 bg-white/20 flex items-end overflow-hidden absolute left-3 rounded-full top-[20%]"
            initial={{ translateX: "-300%" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "-300%" }}
          >
            <motion.div
              animate={{ height: ctx.volume + "%" }}
              transition={{ duration: 0.1, type: "tween", ease: "linear" }}
              className="bg-white/90 rounded-t-full w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute -z-1 w-full h-full">
        <motion.div
          key={ctx.songs[ctx.currentSong].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundImage: `url(${ctx.songs[ctx.currentSong].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute h-full w-full"
        />
        <motion.div
          initial={{
            "--alpha": 0,
          }}
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
      <div
        style={{
          scale: showQueue ? 0.9 : 1,
        }}
        className="transition-all duration-200 w-full h-fit mt-15 flex-col justify-center gap-5 items-center flex"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={ctx.songs[ctx.currentSong].image}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: playing ? (showLyrics ? 1.3 : 1) : showLyrics ? 1.3 : 0.95,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            src={ctx.songs[ctx.currentSong].image}
            onClick={() => setShowLyrics(!showLyrics)}
            className="w-[60%] aspect-square border border-white/6 rounded-[15px] origin-top shadow-[0_4px_100px_black]"
          />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!showLyrics && (
            <motion.div
              key={ctx.songs[ctx.currentSong].name}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, type: "tween" }}
              className="flex w-full max-w-[85%] justify-center origin-top items-center flex-col overflow-hidden"
            >
              <Marquee className="text-xl font-bold">
                {ctx.songs[ctx.currentSong].name}
              </Marquee>
              <Marquee className="text-white/70 mt-1">
                {ctx.songs[ctx.currentSong].artist}
              </Marquee>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        style={{ scale: showQueue ? 0.9 : 1 }}
        className="transition-all duration-200 origin-top w-full h-full flex-col justify-center items-center flex"
      >
        <div
          style={{ alignItems: showLyrics ? "end" : "center" }}
          className="h-full w-full justify-center flex"
        >
          {showLyrics ? (
            <Lyrics
              currentTime={
                musicPlayer.current
                  ? (progress * musicPlayer.current.duration) / 100
                  : 0
              }
              lrc={ctx.songs[ctx.currentSong].lyrics}
            />
          ) : (
            <CirclePad
              playCtx={{ playing, setPlaying }}
              sP={setProgress}
              p={progress}
              duration={Number(musicPlayer.current?.duration)}
              sQ={setShowQueue}
              c={{ ctx, setCtx }}
            />
          )}
        </div>
        {!showLyrics && (
          <div className="flex justify-around text-white/50 h-20 items-center w-full">
            <MdHomeFilled className="text-3xl" />
            <div
              onClick={() => setShowQueue(!showQueue)}
              className="flex flex-col justify-center w-50 text-center items-center text-sm"
            >
              <span className="text-white/30">Next Up:</span>
              <Marquee className="text-white/50">
                {ctx.currentSong === ctx.songs.length - 1
                  ? ctx.songs[0].name
                  : ctx.songs[ctx.currentSong + 1].name}
              </Marquee>
            </div>

            <MdSearch className="text-3xl" />
          </div>
        )}
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
  sQ,
  p,
  c,
  duration,
}: {
  playCtx: {
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  };
  sP: React.Dispatch<React.SetStateAction<number>>;
  sQ: React.Dispatch<React.SetStateAction<boolean>>;
  p: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  c: { ctx: typeof ctxSchema; setCtx: any };
  duration: number;
}) => {
  const cont = useRef<HTMLDivElement | null>(null);

  const [containerWidth, setContainerWidth] = useState<number | undefined>(0);

  useEffect(() => {
    if (cont.current) {
      setContainerWidth(cont.current.offsetWidth);
    }
  }, []);

  const [levers, setLevers] = useState([false, false, false, false]);
  const [fired_levers, setfired_Levers] = useState([
    false,
    false,
    false,
    false,
  ]);
  const pullTheLever = (
    lev: "next" | "back" | "volumeUp" | "volumeDown",
    val?: boolean,
  ) => {
    const newLevs = structuredClone(levers);
    const indexMap = {
      next: 0,
      back: 1,
      volumeUp: 2,
      volumeDown: 3,
    } as const;

    const idx = indexMap[lev];

    if (val != null) newLevs[idx] = val;
    else newLevs[idx] = !newLevs[idx];

    setLevers(newLevs);
  };
  // THIS IS A BAD ARCHITECTURE, but i love this... :)
  // 1 -> next
  // 2 -> back
  // 3 -> volumeUp
  // 4 -> volumeDown

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const maxDrag = 80;

  const scaleX = useTransform(x, (v) => {
    const stretch = Math.min(Math.abs(v) / maxDrag, 1);
    return 1 + stretch * 0.25;
  });

  const scaleY = useTransform(y, (v) => {
    const stretch = Math.min(Math.abs(v) / maxDrag, 1);
    return 1 + stretch * 0.45;
  });

  const LIMIT = 35;
  useMotionValueEvent(x, "change", (vx) => {
    if (vx > 69 && !fired_levers[0] && Math.abs(y.get()) < LIMIT) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[0] = true;
      setfired_Levers(newFiredLevs);
      pullTheLever("next", true);
    } else if (vx < 69 && fired_levers[0]) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[0] = false;
      setfired_Levers(newFiredLevs);
      pullTheLever("next", false);
    }
  });

  useMotionValueEvent(x, "change", (vx) => {
    if (vx < -69 && !fired_levers[1] && Math.abs(y.get()) < LIMIT) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[1] = true;
      setfired_Levers(newFiredLevs);
      pullTheLever("back", true);
    } else if (vx > -69 && fired_levers[1]) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[1] = false;
      setfired_Levers(newFiredLevs);
      pullTheLever("back", false);
    }
  });

  useMotionValueEvent(y, "change", (vy) => {
    if (vy < -69 && !fired_levers[2] && Math.abs(x.get()) < LIMIT) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[2] = true;
      setfired_Levers(newFiredLevs);
      pullTheLever("volumeUp", true);
    } else if (vy > -69 && fired_levers[2]) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[2] = false;
      setfired_Levers(newFiredLevs);
      pullTheLever("volumeUp", false);
    }

    if (vy > 69 && !fired_levers[3] && Math.abs(x.get()) < LIMIT) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[3] = true;
      setfired_Levers(newFiredLevs);
      pullTheLever("volumeDown", true);
    } else if (vy < 69 && fired_levers[3]) {
      const newFiredLevs = structuredClone(fired_levers);
      newFiredLevs[3] = false;
      setfired_Levers(newFiredLevs);
      pullTheLever("volumeDown", false);
    }
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lastActiveLever = useRef<string | null>(null);
  const isHoldRef = useRef(false);

  const currentVolumeRef = useRef(c.ctx.volume);
  useEffect(() => {
    currentVolumeRef.current = c.ctx.volume;
  }, [c.ctx.volume]);

  const currentTime = useRef(p);
  useEffect(() => {
    currentTime.current = p;
  }, [p]);

  const restarted = useRef(false);

  useEffect(() => {
    vibrate([40]);
    const leverNames = ["next", "back", "volumeUp", "volumeDown"];

    const activeIndex = levers.findIndex((l) => l === true);

    if (activeIndex !== -1) {
      lastActiveLever.current = leverNames[activeIndex];
      isHoldRef.current = false;

      timerRef.current = setTimeout(() => {
        isHoldRef.current = true;
        intervalRef.current = setInterval(() => {
          const vol = currentVolumeRef.current;
          const pro = currentTime.current;

          if (activeIndex === 0) {
            console.log("going forward +10");
            const realProgress = (pro * duration) / 100;
            const newPro = realProgress + 5;
            const hundredPro = (newPro * 100) / duration;
            if (hundredPro <= 100) {
              sP(hundredPro);
              currentTime.current = hundredPro;
            }
          } else if (activeIndex === 1) {
            console.log("going backward -10");
            const realProgress = (pro * duration) / 100;
            const newPro = realProgress - 5;
            const hundredPro = (newPro * 100) / duration;
            if (hundredPro <= 100) {
              sP(hundredPro);
              currentTime.current = hundredPro;
            }
          } else if (activeIndex === 2) {
            const newVol = Math.min(vol + 5, 100);
            c.setCtx("volume", newVol);
            currentVolumeRef.current = newVol;
          } else if (activeIndex === 3) {
            const newVol = Math.max(vol - 5, 0);
            c.setCtx("volume", newVol);
            currentVolumeRef.current = newVol;
          }
        }, 150);
      }, 300);
    } else {
      if (!isHoldRef.current && lastActiveLever.current) {
        if (lastActiveLever.current === "next") {
          if (c.ctx.currentSong < c.ctx.songs.length - 1)
            c.setCtx("currentSong", c.ctx.currentSong + 1);
          else c.setCtx("currentSong", 0);
        } else if (lastActiveLever.current === "back") {
          if (restarted.current) {
            if (c.ctx.currentSong > 0)
              c.setCtx("currentSong", c.ctx.currentSong - 1);
            else c.setCtx("currentSong", c.ctx.songs.length - 1);
            restarted.current = false;
          } else {
            sP(0);
            restarted.current = true;
          }
        } else if (lastActiveLever.current === "volumeUp") {
          c.setCtx("volume", Math.min(c.ctx.volume + 15, 100));
        } else if (lastActiveLever.current === "volumeDown") {
          c.setCtx("volume", Math.max(c.ctx.volume - 15, 0));
        }

        console.log(lastActiveLever.current);
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levers, sQ]);

  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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

        <div className="font-[JetBrains_Mono] bg-white/2 mb-8 border border-white/10 text-sm text-white/50 px-2 rounded-[9px]">
          {numberToFormattedTime(Math.round((duration * p) / 100)) +
            "/" +
            numberToFormattedTime(Math.floor(duration))}
        </div>
      </div>
      <div className="flex w-full justify-around items-center">
        <img src="/indicatorarrow.svg" className="opacity-8 h-[80%]" />
        <div className="relative w-20 aspect-square flex justify-center items-center">
          <motion.svg
            viewBox="0 0 400 400"
            className="z-1000 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              x,
              y,
              scaleX,
              scaleY,
            }}
            whileDrag={{ scaleX: 0.5, scaleY: 0.5 }}
            initial={{
              scale: 0,
              opacity: 0,
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0))",
            }}
            animate={{
              scale: playCtx.playing ? (isDragging ? 0.9 : 1) : 0.9,
              opacity: playCtx.playing ? 1 : 0.8,
              filter: playCtx.playing
                ? "drop-shadow(0 0 10px rgba(255,255,255,0.5))"
                : "drop-shadow(0 0 10px rgba(255,255,255,0))",
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
                  initial={{
                    rx: 0,
                    ry: 0,
                  }}
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
                onDrag={() => {}}
              />
            </g>
          </motion.svg>
          <motion.div
            className="absolute w-full h-full rounded-full"
            style={{ x, y, scaleX, scaleY }}
            drag
            dragConstraints={cont}
            dragElastic={0.7}
            dragTransition={{
              bounceStiffness: 700,
              bounceDamping: 50,
            }}
            onDragStart={() => {
              setIsDragging(true);
              vibrate([30, 30]);
            }}
            onDragEnd={() => {
              setTimeout(() => {
                setIsDragging(false);
              }, 100);
              animate(x, 0, { type: "spring", stiffness: 500, damping: 25 });
              animate(y, 0, { type: "spring", stiffness: 500, damping: 25 });
            }}
            onTap={() => {
              if (!isDragging) {
                playCtx.setPlaying(!playCtx.playing);
                vibrate([30, 30]);
              }
            }}
          />
        </div>

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
              strokeWidth="50"
              pathLength="360"
              strokeDasharray="80 300"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <div className="absolute w-full flex translate-y-1 justify-center items-center h-full text-4xl text-white/40 gap-7">
          <MdRepeat
            onClick={() => c.setCtx("repeat", !c.ctx.repeat)}
            style={{
              color: c.ctx.repeat
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.4)",
            }}
            className="-translate-y-5"
          />
          <div
            style={{
              color: c.ctx.songs[c.ctx.currentSong].fav
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.4)",
            }}
            onClick={() => {
              const neoArr = structuredClone(c.ctx.songs);
              neoArr[c.ctx.currentSong].fav = !neoArr[c.ctx.currentSong].fav;
              c.setCtx("songs", neoArr);
            }}
          >
            {c.ctx.songs[c.ctx.currentSong].fav ? (
              <MdFavorite />
            ) : (
              <MdFavoriteBorder />
            )}
          </div>
          <MdDownload
            onClick={() => {
              downloadFileFromUrl(
                c.ctx.songs[c.ctx.currentSong].song,
                c.ctx.songs[c.ctx.currentSong].name +
                  " - " +
                  c.ctx.songs[c.ctx.currentSong].artist,
              );
            }}
            className="-translate-y-5"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default App;
