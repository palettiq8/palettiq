"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import { aiModelsMenu } from "@/utils/Items";
import { useAiStore } from "@/libs/stores/dataStore";

export default function AiModelMenu() {
  const [showModel, setShowModel] = useState<boolean>(false);
  const activeAiModel = useAiStore((state) => state.activeAiModel);
  const setActiveAiModel = useAiStore((state) => state.setActiveAiModel);
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
        setShowModel(false);
      }
    }

    if (showModel) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModel]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => setShowModel((prev) => !prev)}>
        <Button variant={"outline"} size={"md"}>
          <span>{activeAiModel}</span>
          <LuChevronDown
            className={`${showModel ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {showModel && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg rounded-xl p-2.5 z-40 absolute top-12 right-0 w-50"
          >
            {aiModelsMenu.map((model, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setShowModel(false);
                    setActiveAiModel(model);
                  }}
                  className="p-2 w-full rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900 text-start"
                >
                  <p className="text-sm font-semibold">{model}</p>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
