"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import { features } from "@/utils/Items";
import Link from "next/link";
import { makeTextShorter } from "@/utils/utils";

export default function ColorToolsMenu() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef}>
        <Button
          onClick={() => setShowMenu((prev) => !prev)}
          variant={"outline"}
          size={"md"}
        >
          <span>Color Tools</span>
          <LuChevronDown
            className={`${showMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={18}
          />
        </Button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl p-2 z-50 grid grid-cols-1 gap-1 absolute top-11 right-0 w-max"
          >
            {features.map(({ id, title, desc, icon: Icon, url, bgColors }) => {
              return (
                <Link
                  href={url}
                  key={id}
                  className="px-2 h-14 flex items-center gap-2 border border-white rounded-lg hover:bg-gray-100 hover:border-gray-200"
                >
                  <div
                    className={`w-9 h-9 rounded-lg grid place-content-center bg-linear-to-t shrink-0 ${bgColors[0]} ${bgColors[1]}`}
                  >
                    <Icon size={17} className="text-gray-50" />
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <h2 className="text-md font-semibold text-gray-900">
                      {title}
                    </h2>
                    <p className="text-xs font-semibold text-gray-500">
                      {makeTextShorter(desc, 25)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
