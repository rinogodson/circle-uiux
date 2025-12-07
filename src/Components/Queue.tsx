import { motion } from "motion/react";
import { MdClose, MdQueueMusic } from "react-icons/md";
import type ctxSchema from "../Hooks/schemaAndData";

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
        className="flex flex-col w-9/10 h-8/10 bg-[#010101]/90 border border-white/10 rounded-4xl rounded-b-none border-b-0"
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
        {c.ctx.songs.map((item, i) => {
          return (
            <div
              onClick={() => c.setCtx("currentSong", i)}
              className="h-20 w-full relative"
            >
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "bottom",
                }}
                className="absolute w-full h-full"
              ></div>
              <div className="w-full h-full bg-linear-to-b backdrop-blur-xl flex justify-start items-center  from-black to-black/50 absolute">
                <img src={item.image} className="h-9/10 aspect-square" />
                <div>
                  <p>{item.name}</p>
                  <p>{item.artist}</p>
                </div>
              </div>
            </div>
          );
        })}
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
