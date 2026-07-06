"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowRight, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";
import { headerLinkItems } from "@/utils/Items";
import Link from "next/link";

export default function HeaderMenu() {
  const [showMenu, setShowMenu] = useState(false);
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

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu]);

  return (
    <div className="relative">
      <div ref={buttonRef} onClick={() => setShowMenu((prev) => !prev)}>
        <Button
          variant={"outline"}
          size={"md"}
          aria-label="Toggle navigation menu"
          aria-expanded={showMenu}
          aria-controls="mobile-nav-menu"
        >
          <span>Menu</span>
          <LuChevronDown
            aria-hidden="true"
            className={`${showMenu ? "rotate-180" : "rotate-0"} transition-all`}
            size={16}
          />
        </Button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.nav
            id="mobile-nav-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile navigation"
            className="bg-white shadow-lg flex flex-col rounded-xl p-2.5 z-40 absolute top-12 left-0 w-max"
          >
            {headerLinkItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.url}
                  aria-label={`Navigate to ${item.title}`}
                  className={`hidden ${item.hideOnTablet && "max-lg:block"}`}
                >
                  <button className="w-full flex items-center justify-between p-2 gap-3 rounded-lg transition-all hover:bg-gray-100 border border-white hover:border-gray-200 hover:cursor-pointer select-none text-gray-900">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <LuArrowRight size={16} aria-hidden="true" />
                  </button>
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
