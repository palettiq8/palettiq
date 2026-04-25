"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import { useAiStore } from "@/libs/stores/dataStore";

export default function AiConfigureMenu({
  title,
  from,
  items,
  preferred,
  currentItem,
  preferredCurrentItem,
}: {
  title: string;
  from: string;
  items?: string[];
  preferred?: { id: number; name: string; hex: string }[];
  currentItem?: string;
  preferredCurrentItem?: string[];
}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const setAiItems = useAiStore((state) => state.setAiItems);

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
      <div ref={buttonRef} onClick={() => setShowMenu((prev) => !prev)}>
        <Button
          variant={"outline"}
          size={"lg"}
          className="w-full flex items-center justify-between bg-gray-50 hover:bg-white"
        >
          <span>{title}</span>
          <LuChevronDown
            className={`${showMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
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
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute top-12 left-0 w-full max-h-100 overflow-y-auto noscrollbar"
          >
            {from === "preferred" ? (
              <>
                {preferred?.map(({ id, name, hex }) => {
                  const isExist = preferredCurrentItem?.includes(name);
                  return (
                    <button
                      key={id}
                      className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isExist ? "text-indigo-600" : "text-gray-900"}`}
                      onClick={() => setAiItems(name, from)}
                    >
                      <div className="flex items-center gap-4">
                        <LuCheck
                          size={16}
                          className={`invisible ${isExist && "visible"}`}
                        />
                        <p className="text-sm font-semibold">{name}</p>
                      </div>
                      <span
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: hex }}
                      ></span>
                    </button>
                  );
                })}
              </>
            ) : (
              <>
                {items?.map((_, index) => {
                  const title = _.split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                  return (
                    <button
                      key={index}
                      className={`w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${currentItem === _ ? "text-indigo-600" : "text-gray-900"}`}
                      onClick={() => setAiItems(_, from)}
                    >
                      <LuCheck
                        size={16}
                        className={`invisible ${currentItem === _ && "visible"}`}
                      />
                      <p className="text-sm font-semibold">
                        {from === "harmony" ? title : _}
                      </p>
                    </button>
                  );
                })}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
