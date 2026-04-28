"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuMessageSquare } from "react-icons/lu";
import useMenuStore from "@/libs/stores/menuStore";
import { studioLeftFooterMenuItems } from "@/utils/Items";
import Link from "next/link";
import useModelStore from "@/libs/stores/modelStore";

const COMMONSTYLE =
  "flex items-center p-2 gap-3 rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900";

export default function StudioLeftFooterMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const studioLeftFooterMenu = useMenuStore(
    (state) => state.studioLeftFooterMenu,
  );
  const toggleStudioLeftFooterMenu = useMenuStore(
    (state) => state.toggleStudioLeftFooterMenu,
  );
  const toggleStudioLeftMenuModel = useModelStore(
    (state) => state.toggleStudioLeftMenuModel,
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        toggleStudioLeftFooterMenu();
      }
    }

    if (studioLeftFooterMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [studioLeftFooterMenu]);

  return (
    <div className="relative w-full">
      <div
        className="w-full"
        ref={buttonRef}
        onClick={() => {
          toggleStudioLeftFooterMenu();
        }}
      >
        <button className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 h-10 px-4 border border-gray-200 rounded-full bg-gray-100 cursor-pointer transition-all active:scale-95">
          <span>More Options</span>
          <LuChevronDown
            className={`${studioLeftFooterMenu ? "rotate-0" : "rotate-180"} transition-all`}
            size={16}
          />
        </button>
      </div>

      <AnimatePresence>
        {studioLeftFooterMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute bottom-12 left-0 w-max h-max"
          >
            {studioLeftFooterMenuItems.map(({ id, title, icon: Icon, url }) => {
              return (
                <Link
                  key={id}
                  onClick={() => toggleStudioLeftMenuModel()}
                  href={url}
                  className={COMMONSTYLE}
                >
                  <Icon size={16} />
                  <p className="text-sm font-semibold">{title}</p>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
