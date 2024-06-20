import { AnimatePresence, motion } from "framer-motion";
import FolderIcon from "../icons/folder";
import SettingsIcon from "../icons/settings";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b-[1px] border-gray-400 p-4">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderIcon />
          <motion.input
            whileHover={{
              backgroundColor: "#f5f5f5",
            }}
            whileFocus={{
              backgroundColor: "#f5f5f5",
            }}
            className="w-[450px] min-w-48 py-0.5 text-2xl font-bold focus:outline-none"
            type="text"
            spellCheck={false}
          />
        </div>
        <div className="relative flex items-center justify-center">
          <motion.button
            initial={{
              backgroundColor: "#ffffff",
            }}
            className="rounded-full p-1.5"
            whileHover={{
              backgroundColor: "#f5f5f5",
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <SettingsIcon />
          </motion.button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="absolute top-10 flex w-36 flex-col rounded bg-white p-1 shadow-md"
              >
                <button className="h-10 w-full rounded pl-2 text-left hover:bg-red-100">
                  Delete
                </button>
                <button className="h-10 w-full rounded pl-2 text-left hover:bg-blue-100">
                  New Project
                </button>
                <button className="h-10 w-full rounded pl-2 text-left hover:bg-slate-100">
                  GitHub
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
