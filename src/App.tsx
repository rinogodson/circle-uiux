import { useEffect, useState } from "react";
import { MdHomeFilled, MdSearch } from "react-icons/md";

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    <div className="font-[Lexend] relative  bg-[#090909] z-0 sm:h-[90vh] flex flex-col justify-between overflow-hidden items-center h-screen w-svw sm:w-auto sm:aspect-8/16 sm:rounded-4xl sm:border border-white/10">
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

      <div className="w-full h-fit flex-col  justify-center items-center flex">
        <CirclePad />
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

const CirclePad = () => {
  return (
    <div className="w-[80%] grid overflow-hidden grid-rows-[3.8fr_2.4fr_3.8fr] aspect-square bg-radial from-black to-black/30 rounded-full border-2 border-white/10">
      <div className="bg-red-400 border-y border-white"></div>
      <div className="bg-red-400 border-y border-white"></div>
      <div className="bg-red-400 border-y border-white"></div>
    </div>
  );
};

export default App;
