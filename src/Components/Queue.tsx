import { motion } from "motion/react";
import { MdClose, MdMusicNote, MdQueueMusic } from "react-icons/md";
import type ctxSchema from "../Hooks/schemaAndData";
import Marquee from "./Marquee";

function Queue({
  sQ,
  c,
}: {
  sQ: React.Dispatch<React.SetStateAction<boolean>>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  c: { ctx: typeof ctxSchema; setCtx: any };
}) {
  return (
    <motion.div
      initial={{
        backdropFilter: "blur(0px)",
        background: "rgba(0, 0, 0, 0)",
      }}
      animate={{
        backdropFilter: "blur(10px)",
        background: "rgba(0, 0, 0, 0.4)",
      }}
      exit={{
        backdropFilter: "blur(0px)",

        background: "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.1 }}
      className="flex justify-center items-end w-full h-full absolute z-100"
      onClick={() => {
        sQ(false);
      }}
    >
      <motion.div
        initial={{ translateY: "100%" }}
        animate={{ translateY: "0" }}
        exit={{ translateY: "100%" }}
        transition={{ type: "spring", damping: 16 }}
        className="flex flex-col w-9/10 h-8/10 items-center bg-[#010101]/90 border border-white/10 rounded-4xl rounded-b-none border-b-0"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          onClick={() => {
            sQ(false);
          }}
          className="h-15 flex gap-1 justify-center items-center w-full text-white/40"
        >
          <MdQueueMusic className="text-2xl" />
          QUEUE
        </div>
        <div className="w-full flex items-center flex-col gap-2">
          {c.ctx.songs.map((item, i) => {
            return (
              <div
                onClick={() => c.setCtx("currentSong", i)}
                className="h-20 w-[95%] relative rounded-2xl border border-white/10 overflow-hidden"
              >
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    backgroundClip: "padding-box",
                  }}
                  className="absolute w-[98%] translate-x-[50%] right-[50%] bottom-[50%] translate-y-[50%] h-[98%] rounded-2xl"
                ></div>
                <div
                  style={{
                    boxShadow:
                      i === c.ctx.currentSong
                        ? "inset 0 0 0 2px rgba(255,255,255,0.2)"
                        : "",
                  }}
                  className="w-full h-full p-2 bg-linear-to-b rounded-2xl backdrop-blur-xl gap-2 flex justify-start items-center  from-black to-black/50 absolute"
                >
                  <div
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      boxShadow:
                        i === c.ctx.currentSong
                          ? "inset 0 0 0 2px rgba(255,255,255,0.5)"
                          : "",
                    }}
                    className="h-full aspect-square rounded-lg overflow-hidden"
                  >
                    {i === c.ctx.currentSong && (
                      <div className="flex justify-center items-center text-3xl w-full h-full bg-black/20">
                        <MdMusicNote />
                      </div>
                    )}
                  </div>
                  <div className="whitespace-nowrap flex flex-col items-start justify-start mask-ellipse w-[70%]">
                    <Marquee className="text-xl text-white/90" noCenter>
                      {item.name}
                    </Marquee>
                    <Marquee className="text-white/50" noCenter>
                      {item.artist}
                    </Marquee>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: "90deg", opacity: 0, translateY: "100%" }}
        animate={{ scale: 1, rotate: "0deg", opacity: 1, translateY: 0 }}
        exit={{ scale: 0, rotate: "90deg", opacity: 0, translateY: "100%" }}
        className="text-3xl flex justify-center items-center text-white/80 w-15 aspect-square bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 absolute right-10 bottom-10"
      >
        <MdClose />
      </motion.div>
    </motion.div>
  );
}

export default Queue;
