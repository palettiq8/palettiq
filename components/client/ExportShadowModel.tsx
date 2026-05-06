"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuChevronRight, LuDownload, LuX } from "react-icons/lu";
import { useState } from "react";
import { exportShadowMethods } from "@/utils/Items";
import ToggleButton from "../server/ToggleButton";
import { useOtherStore } from "@/libs/stores/dataStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  downloadFile,
  exportShadowCSS,
  exportShadowJSON,
  exportShadowSCSS,
  exportShadowSVG,
  exportShadowTailwind,
  FlashMessage,
  getLanguage,
} from "@/utils/utils";

export default function ExportShadowModel() {
  const [activeMethod, setActiveMethod] = useState("CSS");
  const [isTextShadow, setIsTextShadow] = useState<boolean>(false);
  const exportShadowModel = useModelStore((state) => state.exportShadowModel);
  const toggleExportShadowModel = useModelStore(
    (state) => state.toggleExportShadowModel,
  );
  const exportBoxShadow = useOtherStore((state) => state.exportBoxShadow);
  const exportTextShadow = useOtherStore((state) => state.exportTextShadow);

  const layers = isTextShadow ? exportTextShadow : exportBoxShadow;

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleExportShadowModel();
    }
  };

  const displayExportedItems = () => {
    if (activeMethod === "CSS") return exportShadowCSS(layers, isTextShadow);
    if (activeMethod === "Tailwind CSS")
      return exportShadowTailwind(layers, isTextShadow);
    if (activeMethod === "SCSS") return exportShadowSCSS(layers, isTextShadow);
    if (activeMethod === "JSON") return exportShadowJSON(layers);
    if (activeMethod === "SVG") return exportShadowSVG(layers, isTextShadow);
    return "";
  };

  const copyButtonTitle = () => {
    if (activeMethod === "CSS") return "Copy CSS";
    if (activeMethod === "Tailwind CSS") return "Copy Tailwind CSS";
    if (activeMethod === "SCSS") return "Copy SCSS";
    if (activeMethod === "JSON") return "Copy JSON";
    if (activeMethod === "SVG") return "Copy SVG";
    return "";
  };

  const downloadButtonTitle = () => {
    if (activeMethod === "CSS") return "Download CSS";
    if (activeMethod === "Tailwind CSS") return "Download Tailwind CSS";
    if (activeMethod === "SCSS") return "Download SCSS";
    if (activeMethod === "JSON") return "Download JSON";
    if (activeMethod === "SVG") return "Download SVG";
    return "";
  };

  const copyButtonHandler = async () => {
    FlashMessage("success", "Copied to the clipboard!");
    if (activeMethod === "CSS")
      await navigator.clipboard.writeText(
        exportShadowCSS(layers, isTextShadow),
      );
    if (activeMethod === "Tailwind CSS")
      await navigator.clipboard.writeText(
        exportShadowTailwind(layers, isTextShadow),
      );
    if (activeMethod === "SCSS")
      await navigator.clipboard.writeText(
        exportShadowSCSS(layers, isTextShadow),
      );
    if (activeMethod === "JSON")
      await navigator.clipboard.writeText(exportShadowJSON(layers));
    if (activeMethod === "SVG")
      await navigator.clipboard.writeText(
        exportShadowSVG(layers, isTextShadow),
      );
  };

  const downloadButtonHandler = () => {
    if (activeMethod === "CSS")
      downloadFile(
        exportShadowCSS(layers, isTextShadow),
        "shadow.css",
        "text/css",
      );
    if (activeMethod === "Tailwind CSS")
      downloadFile(
        exportShadowTailwind(layers, isTextShadow),
        "tailwind.js",
        "text/javascript",
      );
    if (activeMethod === "SCSS")
      downloadFile(
        exportShadowSCSS(layers, isTextShadow),
        "shadow.scss",
        "text/scss",
      );
    if (activeMethod === "JSON")
      downloadFile(exportShadowJSON(layers), "shadow.json", "application/json");
    if (activeMethod === "SVG")
      downloadFile(
        exportShadowSVG(layers, isTextShadow),
        "shadow.svg",
        "image/svg+xml",
      );
  };

  return (
    <AnimatePresence>
      {exportShadowModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 flex justify-end z-50 parent p-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Export CSS shadow code"
            initial={{ x: "10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "10%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-120 h-full bg-white rounded-xl shadow-2xl"
          >
            <div className="w-full h-14 px-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-900">Export</h2>
              <Button
                aria-label="Close shadow export panel"
                onClick={() => toggleExportShadowModel()}
                variant={"outline"}
                size={"circle"}
              >
                <LuX size={18} aria-hidden="true" />
              </Button>
            </div>
            <div
              className="w-full p-4 overflow-y-auto noscrollbar"
              style={{ height: "calc(100% - 112px)" }}
            >
              <p className="text-sm font-medium text-gray-800">
                Export your CSS shadow as CSS, Tailwind CSS, SCSS, JSON, or SVG
                — free on PalettIQ.
              </p>
              <div className="w-full grid grid-cols-2 gap-2 mt-5">
                {exportShadowMethods.map(({ icon: Icon, method }, index) => {
                  const isActive = activeMethod === method;
                  return (
                    <div
                      key={index}
                      role="button"
                      aria-label={`Export shadow as ${method}`}
                      aria-pressed={isActive}
                      onClick={() => setActiveMethod(method)}
                      className={`w-full rounded-full border flex items-center justify-between h-12 cursor-pointer active:scale-95 transition-all px-4 ${isActive ? "border-orange-300 text-orange-600 bg-orange-50" : "border-gray-200 text-gray-900 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={18} aria-hidden="true" />
                        <p className="text-sm font-semibold select-none">
                          {method}
                        </p>
                      </div>
                      <LuChevronRight size={16} />
                    </div>
                  );
                })}
              </div>
              <SyntaxHighlighter
                language={getLanguage(activeMethod)}
                style={base16AteliersulphurpoolLight}
                customStyle={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginTop: "15px",
                  border: "1px solid #e5e7eb",
                }}
                wrapLongLines
                lineProps={{
                  style: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
                }}
              >
                {displayExportedItems()}
              </SyntaxHighlighter>
              <div className="flex items-center w-full justify-between mt-5">
                <label className="text-sm font-medium text-gray-800">
                  Export text shadow
                </label>
                <ToggleButton
                  isTrue={isTextShadow}
                  setIsTrue={() => setIsTextShadow((prev) => !prev)}
                />
              </div>
            </div>
            <div className="w-full h-14 border-t border-gray-200 flex items-center justify-between px-4">
              <Button
                aria-label={`Copy shadow as ${activeMethod}`}
                onClick={() => copyButtonHandler()}
                variant={"outline"}
                size={"md"}
              >
                {copyButtonTitle()}
              </Button>
              <Button
                aria-label={`Download shadow as ${activeMethod}`}
                onClick={() => downloadButtonHandler()}
                variant={"primary"}
                size={"md"}
              >
                <LuDownload size={16} aria-hidden="true" />
                <span>{downloadButtonTitle()}</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
