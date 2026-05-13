"use client";

import { useBrowseStore } from "@/libs/stores/dataStore";
import { Button } from "../Button";
import { LuArrowLeft } from "react-icons/lu";
import { useEffect } from "react";
import { getGradientCSS } from "@/utils/utils";

export default function OpenOnScreenGradientModel() {
    const openOnScreenGradient = useBrowseStore(
        (state) => state.openOnScreenGradient,
    );
    const setOpenOnScreenGradient = useBrowseStore(
        (state) => state.setOpenOnScreenGradient,
    );
    const browseGradientActiveType = useBrowseStore(
        (state) => state.browseGradientActiveType,
    );

    useEffect(() => {
        if (openOnScreenGradient) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [openOnScreenGradient]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const isTyping =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;

            if (isTyping) return;

            const key = e.key.toLowerCase();
            if (key === "escape") {
                e.preventDefault();
                setOpenOnScreenGradient(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-40">
            <div className="w-full h-screen flex relative max-lg:flex-col">
                <div className="w-full h-full" style={{
                    background: getGradientCSS(
                        openOnScreenGradient!,
                        browseGradientActiveType,
                        90,
                        { shape: "circle", x: 50, y: 50 },
                        { x: 50, y: 50 },
                    ),
                }}></div>
                {openOnScreenGradient !== null && (
                    <Button
                        onClick={() => setOpenOnScreenGradient(null)}
                        variant={"outline"}
                        size={"circle"}
                        className="absolute top-4 left-4"
                    >
                        <LuArrowLeft size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
}
