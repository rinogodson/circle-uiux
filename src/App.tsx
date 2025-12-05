import { useEffect, useRef, useState } from "react";
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
        <div className="absolute h-full bg-linear-to-t from-black to-black/50 backdrop-blur-2xl w-full bg-cover bg-center" />
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
          <CirclePad sP={setProgress} p={progress} />
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
  sP,
  p,
}: {
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
      className="w-[80%] grid overflow-hidden grid-rows-[3.8fr_2.4fr_3.8fr] aspect-square bg-radial from-black to-black/30 rounded-full border-2 border-white/10"
    >
      <div className="flex justify-center relative items-end">
        <div className="absolute top-[15px]">
          <ProgressBar
            span={130}
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
      <div className="flex  justify-around items-center">
        <img src="/indicatorarrow.svg" className="opacity-8 h-[80%]" />
        <img
          src="/circle.svg"
          className="drop-shadow-[0_0_5px_#6001D7,0_0_50px_black]"
        />
        <img
          src="/indicatorarrow.svg"
          className="opacity-8 h-[80%] rotate-180"
        />
      </div>
      <div className="relative flex justify-center p-2 items-start pt-2">
        <img src="/arc.svg" className="h-full" />
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
