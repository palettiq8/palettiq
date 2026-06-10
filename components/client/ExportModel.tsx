"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { LuChevronRight, LuDownload, LuX } from "react-icons/lu";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  downloadFile,
  downloadGradientPNG,
  downloadPNG,
  FlashMessage,
  generateArray,
  generateCSS,
  generateGradient,
  generateGradientLink,
  generateJSON,
  generateJSONGradient,
  generateSCSS,
  generateSCSSGradient,
  generateShareLink,
  generateSVG,
  generateTailwind,
  generateTailwindGradient,
  getLanguage,
} from "@/utils/utils";
import { exportMethods } from "@/utils/Items";
import {
  useBrowseStore,
  useGradientStore,
  useOtherStore,
} from "@/libs/stores/dataStore";

export default function ExportModel() {
  const [activeMethod, setActiveMethod] = useState("CSS");
  const exportModel = useModelStore((state) => state.exportModel);
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const exportPalette = useOtherStore((state) => state.exportPalette);
  const downloadPngWithoutHex = useOtherStore(
    (state) => state.downloadPngWithoutHex,
  );
  const browseGradients = useBrowseStore((state) => state.browseGradients);
  const browseGradientActiveType = useBrowseStore(
    (state) => state.browseGradientActiveType,
  );

  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleExportModel();
    }
  };
  const gradientExport = useOtherStore((state) => state.gradientExport);
  const exportFrom = useOtherStore((state) => state.exportFrom);
  const gradientStops = useGradientStore((state) => state.gradientStops);
  const activeGradientType = useGradientStore(
    (state) => state.activeGradientType,
  );
  const gradientRotationValue = useGradientStore(
    (state) => state.gradientRotationValue,
  );
  const activeRadial = useGradientStore((state) => state.activeRadial);
  const activeConic = useGradientStore((state) => state.activeConic);

  const displayExportedItems = () => {
    if (activeMethod === "CSS")
      return exportFrom === "Gradient"
        ? gradientExport
        : generateCSS(exportPalette);
    if (activeMethod === "Tailwind CSS")
      return exportFrom === "Gradient"
        ? generateTailwindGradient(gradientExport)
        : generateTailwind(exportPalette);
    if (activeMethod === "SCSS")
      return exportFrom === "Gradient"
        ? generateSCSSGradient(exportPalette, gradientExport)
        : generateSCSS(exportPalette);
    if (activeMethod === "Gradient CSS") return generateGradient(exportPalette);
    if (activeMethod === "JSON")
      return exportFrom === "Gradient"
        ? generateJSONGradient(exportPalette, gradientExport)
        : generateJSON(exportPalette);
    if (activeMethod === "SVG") return generateSVG(exportPalette);
    if (activeMethod === "Array") return generateArray(exportPalette);
    if (activeMethod === "Share Studio Link") {
      if (exportFrom === "Gradient") {
        return generateGradientLink(
          gradientStops,
          activeGradientType,
          gradientRotationValue,
          activeRadial,
          activeConic,
        );
      } else if (exportFrom === "Browse-Gradient") {
        return generateGradientLink(
          browseGradients?.stops!,
          browseGradientActiveType,
          90,
          { shape: "circle", x: 50, y: 50 },
          { x: 50, y: 50 },
        );
      } else {
        return generateShareLink(exportPalette, exportFrom);
      }
    }
    return "";
  };

  const copyButtonTitle = () => {
    if (activeMethod === "CSS") return "Copy CSS";
    if (activeMethod === "Tailwind CSS") return "Copy Tailwind CSS";
    if (activeMethod === "SCSS") return "Copy SCSS";
    if (activeMethod === "Gradient CSS") return "Copy Gradient CSS";
    if (activeMethod === "JSON") return "Copy JSON";
    if (activeMethod === "SVG") return "Copy SVG";
    if (activeMethod === "Array") return "Copy Array";
    if (activeMethod === "Share Studio Link") return "Copy Link";
    return "";
  };

  const downloadButtonTitle = () => {
    if (activeMethod === "CSS") return "Download CSS";
    if (activeMethod === "Tailwind CSS") return "Download Tailwind CSS";
    if (activeMethod === "SCSS") return "Download SCSS";
    if (activeMethod === "Gradient CSS") return "Download Gradient CSS";
    if (activeMethod === "JSON") return "Download JSON";
    if (activeMethod === "SVG") return "Download SVG";
    if (activeMethod === "Array") return "Download Array";
    if (activeMethod === "Share Studio Link") return "Download Link";
    return "";
  };

  const copyButtonHandler = async () => {
    FlashMessage("success", "Copied to the clipboard!");
    if (activeMethod === "CSS")
      return await navigator.clipboard.writeText(
        exportFrom === "Gradient" ? gradientExport : generateCSS(exportPalette),
      );
    if (activeMethod === "Tailwind CSS")
      await navigator.clipboard.writeText(
        exportFrom === "Gradient"
          ? generateTailwindGradient(gradientExport)
          : generateTailwind(exportPalette),
      );
    if (activeMethod === "SCSS")
      await navigator.clipboard.writeText(
        exportFrom === "Gradient"
          ? generateSCSSGradient(exportPalette, gradientExport)
          : generateSCSS(exportPalette),
      );
    if (activeMethod === "Gradient CSS")
      await navigator.clipboard.writeText(generateGradient(exportPalette));
    if (activeMethod === "JSON")
      await navigator.clipboard.writeText(
        exportFrom === "Gradient"
          ? generateJSONGradient(exportPalette, gradientExport)
          : generateJSON(exportPalette),
      );
    if (activeMethod === "SVG")
      await navigator.clipboard.writeText(generateSVG(exportPalette));
    if (activeMethod === "Array")
      await navigator.clipboard.writeText(generateArray(exportPalette));
    if (activeMethod === "Share Studio Link") {
      let textOutput;
      if (exportFrom === "Gradient") {
        textOutput = generateGradientLink(
          gradientStops,
          activeGradientType,
          gradientRotationValue,
          activeRadial,
          activeConic,
        );
      } else if (exportFrom === "Browse-Gradient") {
        textOutput = generateGradientLink(
          browseGradients?.stops!,
          browseGradientActiveType,
          90,
          { shape: "circle", x: 50, y: 50 },
          { x: 50, y: 50 },
        );
      } else {
        textOutput = generateShareLink(exportPalette, exportFrom);
      }
      await navigator.clipboard.writeText(textOutput);
    }
    return "";
  };

  const downloadButtonHandler = () => {
    if (activeMethod === "CSS")
      return exportFrom === "Gradient"
        ? downloadFile(gradientExport, "palette.css", "text/css")
        : downloadFile(generateCSS(exportPalette), "palette.css", "text/css");

    if (activeMethod === "Tailwind CSS")
      return exportFrom === "Gradient"
        ? downloadFile(
            generateTailwindGradient(gradientExport),
            "tailwind.js",
            "text/javascript",
          )
        : downloadFile(
            generateTailwind(exportPalette),
            "tailwind.js",
            "text/javascript",
          );

    if (activeMethod === "SCSS")
      return exportFrom === "Gradient"
        ? downloadFile(
            generateSCSSGradient(exportPalette, gradientExport),
            "palette.scss",
            "text/scss",
          )
        : downloadFile(
            generateSCSS(exportPalette),
            "palette.scss",
            "text/scss",
          );

    if (activeMethod === "Gradient CSS")
      return downloadFile(
        generateGradient(exportPalette),
        "gradient.css",
        "text/css",
      );

    if (activeMethod === "JSON")
      return exportFrom === "Gradient"
        ? downloadFile(
            generateJSONGradient(exportPalette, gradientExport),
            "palette.json",
            "application/json",
          )
        : downloadFile(
            generateJSON(exportPalette),
            "palette.json",
            "application/json",
          );

    if (activeMethod === "SVG")
      return downloadFile(
        generateSVG(exportPalette),
        "palette.svg",
        "image/svg+xml",
      );

    if (activeMethod === "Array")
      return downloadFile(
        generateArray(exportPalette),
        "palette.txt",
        "text/plain",
      );

    if (activeMethod === "Share Studio Link") {
      let res;
      if (exportFrom === "Gradient") {
        res = downloadFile(
          generateGradientLink(
            gradientStops,
            activeGradientType,
            gradientRotationValue,
            activeRadial,
            activeConic,
          ),
          "gradient-link.txt",
          "text/plain",
        );
      } else if (exportFrom === "Browse-Gradient") {
        res = downloadFile(
          generateGradientLink(
            browseGradients?.stops!,
            browseGradientActiveType,
            90,
            { shape: "circle", x: 50, y: 50 },
            { x: 50, y: 50 },
          ),
          "gradient-link.txt",
          "text/plain",
        );
      } else {
        res = downloadFile(
          generateShareLink(exportPalette, exportFrom),
          "palette-link.txt",
          "text/plain",
        );
      }
      return res;
    }
  };

  return (
    <AnimatePresence>
      {exportModel && (
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
            aria-label="Export color palette"
            initial={{ x: "10%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "10%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-120 h-full bg-white rounded-xl shadow-2xl"
          >
            <div className="w-full h-14 px-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-900">Export</h2>
              <Button
                onClick={() => toggleExportModel()}
                variant={"outline"}
                size={"circle"}
                aria-label="Close export panel"
              >
                <LuX size={18} />
              </Button>
            </div>
            <div className="w-full p-4 overflow-y-auto noscrollbar h-[calc(100%-112px)] max-sm:h-[calc(100%-168px)]">
              <p className="text-sm font-medium text-gray-800">
                Export your color palette as CSS, Tailwind CSS, SCSS, JSON, SVG,
                or PNG — free on PalettIQ.
              </p>
              <div className="w-full grid grid-cols-2 gap-2 mt-5 max-sm:grid-cols-1">
                {exportMethods
                  .filter((item) =>
                    exportFrom === "Gradient"
                      ? item.method !== "Gradient CSS" && item.method !== "SVG"
                      : true,
                  )
                  .map(({ icon: Icon, method }, index) => {
                    const isActive = activeMethod === method;
                    return (
                      <div
                        key={index}
                        role="button"
                        aria-label={`Export as ${method}`}
                        aria-pressed={isActive}
                        onClick={() => {
                          if (method === "PNG Image") {
                            if (exportFrom === "Gradient") {
                              downloadGradientPNG(
                                gradientStops,
                                activeGradientType,
                                gradientRotationValue,
                                activeRadial,
                                activeConic,
                              );
                            } else if (exportFrom === "Browse-Gradient") {
                              downloadGradientPNG(
                                browseGradients?.stops!,
                                browseGradientActiveType,
                                90,
                                { shape: "circle", x: 50, y: 50 },
                                { x: 50, y: 50 },
                              );
                            } else {
                              downloadPNG(exportPalette, downloadPngWithoutHex);
                            }
                          } else {
                            setActiveMethod(method);
                          }
                        }}
                        className={`w-full rounded-full border flex items-center justify-between h-12 cursor-pointer active:scale-95 transition-all px-4 ${isActive ? "border-orange-300 text-orange-600 bg-orange-50" : "border-gray-200 text-gray-900 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={18} />
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
            </div>
            <div className="w-full h-14 max-sm:h-28 max-sm:flex-col max-sm:justify-center gap-2 border-t border-gray-200 flex items-center justify-between px-4">
              <Button
                onClick={() => copyButtonHandler()}
                variant={"outline"}
                size={"md"}
                className="max-sm:w-full"
                aria-label={`Copy palette as ${activeMethod}`}
              >
                {copyButtonTitle()}
              </Button>
              <Button
                onClick={() => downloadButtonHandler()}
                variant={"primary"}
                size={"md"}
                className="max-sm:w-full"
                aria-label={`Download palette as ${activeMethod}`}
              >
                <LuDownload size={16} />
                <span>{downloadButtonTitle()}</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
