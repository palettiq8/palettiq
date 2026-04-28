"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuEllipsisVertical } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import { extractorResponsiveMoreMenuItems } from "@/utils/Items";

export default function ExtractorResponsiveMoreMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const extractorResponsiveMoreMenu = useMenuStore(
    (state) => state.extractorResponsiveMoreMenu,
  );
  const toggleExtractorResponsiveMoreMenu = useMenuStore(
    (state) => state.toggleExtractorResponsiveMoreMenu,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleExtractorResponsiveMoreMenu();
      }
    }

    if (extractorResponsiveMoreMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [extractorResponsiveMoreMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => toggleExtractorResponsiveMoreMenu()}>
        <LuEllipsisVertical
          size={17}
          className={`${generatorContentHeaderItemsStyle}`}
        />
      </div>

      <AnimatePresence>
        {extractorResponsiveMoreMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl flex flex-col p-2.5 z-40 absolute 
            top-8 right-0 w-max"
          >
            {extractorResponsiveMoreMenuItems.map(
              ({ id, title, icon: Icon }) => {
                return (
                  <button
                    key={id}
                    className={`w-full flex items-center gap-4 p-2 text-gray-900 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all`}
                  >
                    <Icon size={16} />
                    <p className="text-sm font-semibold">{title}</p>
                  </button>
                );
              },
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
