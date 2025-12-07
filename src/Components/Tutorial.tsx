import { motion } from "motion/react";
function Tutorial({
  sT,
}: {
  sT: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute w-full overflow-y-scroll p-5 gap-5 flex flex-col h-full bg-black z-100"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <div className="p-2 bg-[#2b2b2b] rounded-2xl">
            <img src={`/tut/${item}.png`} className="rounded-lg" />
          </div>
        );
      })}
      <button
        onClick={() => sT(false)}
        className="absolute top-5 right-5 bg-[#1b1b1b] text-2xl text-white/90 px-4 rounded-full border border-white/40 py-2"
      >
        Close
      </button>
    </motion.div>
  );
}

export default Tutorial;
