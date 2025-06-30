import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [topConstraint, setTopConstraint] = useState(dragRef);

  const handleDragEnd = (
    _: MouseEvent | PointerEvent | TouchEvent,
    info: { offset: { y: number; x: number } }
  ) => {
    if (info.offset.y > 50) {
      setIsOpen(false);
    }
    if (info.offset.y < -10) {
      setTopConstraint(sectionRef);
    }
  };

  return (
    <div className="realtive h-screen w-screen flex justify-center items-center bg-white">
      <motion.button
        onClick={() => {
          setTopConstraint(dragRef);
          setIsOpen(!isOpen);
        }}
        whileTap={{ scale: 0.9 }}
        className="text-sm font-bold px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-200 border-[1px] border-neutral-300"
      >
        open drawer
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col justify-end bg-black/20 left-0 right-0 h-full overflow-hidden"
          >
            <motion.div
              drag="y"
              ref={dragRef}
              onDragEnd={handleDragEnd}
              dragConstraints={topConstraint}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                height: "100%",
                marginTop: topConstraint === dragRef ? "80%" : "0%",
              }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ ease: "linear" }}
              className="flex flex-col bg-white rounded-xl"
            >
              <div className="w-full flex justify-center items-center cursor-grab active:cursor-grabbing p-2">
                <button className="w-12 h-2 bg-neutral-300 mt-2 rounded-full" />
              </div>
              <div className="h-full w-full bg-neutral-200"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
