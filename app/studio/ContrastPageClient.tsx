"use client";

import { Button } from "@/components/Button";
import ColorPreferencesMenu from "@/components/client/ColorPreferencesMenu";
import ContrastColorsWithPickerMenu from "@/components/client/ContrastColorsWithPickerMenu";
import ContrastResponsiveMoreMenu from "@/components/client/ContrastResponsiveMoreMenu";
import OpenMoreMenu from "@/components/client/OpenMoreMenu";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import ToggleButton from "@/components/server/ToggleButton";
import { useContrastStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import { REDOUNDOCOMMONSTYLE } from "@/utils/styles/Classes";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BiExport } from "react-icons/bi";
import {
  LuArrowLeft,
  LuChevronDown,
  LuHistory,
  LuRedo2,
  LuUndo2,
} from "react-icons/lu";

extend([a11yPlugin]);

const FontSizeComponent = ({
  title,
  fontSize,
  setFontSize,
  activeSizeTitle,
  setActiveSizeTitle,
}: {
  title: string;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  activeSizeTitle: string;
  setActiveSizeTitle: Dispatch<SetStateAction<string>>;
}) => {
  const handler = () => {
    setActiveSizeTitle(title);
    switch (title) {
      case "Small":
        setFontSize(8);
        break;
      case "Normal":
        setFontSize(16);
        break;
      case "Large":
        setFontSize(24);
        break;
      default:
        setFontSize(34);
        break;
    }
  };

  return (
    <button
      aria-label={`Set font size to ${title}`}
      aria-pressed={title === activeSizeTitle}
      className={`px-4 py-2 rounded-full text-sm font-semibold ${title === activeSizeTitle ? "bg-gray-900 text-gray-50" : "bg-gray-100 text-gray-900 hover:bg-gray-200"} transition-all cursor-pointer`}
      onClick={handler}
    >
      {title}
    </button>
  );
};

export default function ContrastPageClient() {
  const [isAdvancedSettings, setIsAdvancedSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(600);
  const [activeSizeTitle, setActiveSizeTitle] = useState("Normal");
  const activeContrast = useContrastStore((state) => state.activeContrast);
  const complementaryMode = useContrastStore(
    (state) => state.complementaryMode,
  );
  const setActiveContrast = useContrastStore(
    (state) => state.setActiveContrast,
  );
  const setComplementaryMode = useContrastStore(
    (state) => state.setComplementaryMode,
  );
  const textColor = activeContrast ? activeContrast.textColor : "";
  const bgColor = activeContrast ? activeContrast.bgColor : "";

  const ratio = colord(textColor).contrast(bgColor);
  const toggleContrastHistoryModel = useModelStore(
    (state) => state.toggleContrastHistoryModel,
  );
  const contrastUndoHandler = useContrastStore(
    (state) => state.contrastUndoHandler,
  );
  const contrastRedoHandler = useContrastStore(
    (state) => state.contrastRedoHandler,
  );
  const setContrastHistory = useContrastStore(
    (state) => state.setContrastHistory,
  );
  const contrastHistoryIndex = useContrastStore(
    (state) => state.contrastHistoryIndex,
  );
  const contrastHistory = useContrastStore((state) => state.contrastHistory);
  const generateContrastPair = useContrastStore(
    (state) => state.generateContrastPair,
  );
  const isMaximizeContrast = useUiStore((state) => state.isMaximizeContrast);
  const setIsMaximizeContrast = useUiStore(
    (state) => state.setIsMaximizeContrast,
  );
  const toggleExportModel = useModelStore((state) => state.toggleExportModel);
  const setExportPalette = useOtherStore((state) => state.setExportPalette);
  const setExportFrom = useOtherStore((state) => state.setExportFrom);
  const contrastTitle = useContrastStore((state) => state.contrastTitle);
  const contrastDescription = useContrastStore(
    (state) => state.contrastDescription,
  );
  const setContrastTitle = useContrastStore((state) => state.setContrastTitle);
  const setContrastDescription = useContrastStore(
    (state) => state.setContrastDescription,
  );

  const setIsComplementaryMode = () => {
    setComplementaryMode();
  };

  const colors = [
    { id: 1, title: "Foreground Color", color: textColor },
    { id: 2, title: "Background Color", color: bgColor },
  ];
  const getRatingLabel = (): string => {
    if (ratio >= 7) return "Excellent";
    if (ratio >= 4.5) return "Good";
    if (ratio >= 3) return "Fair";
    return "Poor";
  };
  const WCAG = [
    {
      id: 1,
      title: "AA",
      textSize: "Normal Text >= 4.5",
      isPass: ratio >= 4.5,
    },
    { id: 2, title: "AA", textSize: "Large Text >= 3", isPass: ratio >= 3 },
    { id: 3, title: "AAA", textSize: "Normal Text >= 7", isPass: ratio >= 7 },
    {
      id: 4,
      title: "AAA",
      textSize: "Large Text >= 4.5",
      isPass: ratio >= 4.5,
    },
  ];

  const getLabel = getRatingLabel();

  const generateRandomContrastHandler = useCallback(() => {
    generateContrastPair("normal");
    setContrastHistory();
  }, [setActiveContrast]);

  const generateComplementaryContrastHandler = useCallback(() => {
    generateContrastPair("complementary");
    setContrastHistory();
  }, [setActiveContrast]);

  const undoHandler = useCallback(() => {
    contrastUndoHandler();
  }, []);

  const redoHandler = useCallback(() => {
    contrastRedoHandler();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;
      const key = e.key.toLowerCase();
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMaximizeContrast(false);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        generateRandomContrastHandler();
      }
      if (key === "h") {
        e.preventDefault();
        toggleContrastHistoryModel();
      }
      if (key === "arrowleft") {
        e.preventDefault();
        undoHandler();
      }
      if (key === "arrowright") {
        e.preventDefault();
        redoHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (fontSize >= 8 && fontSize <= 15) {
      setActiveSizeTitle("Small");
    } else if (fontSize >= 16 && fontSize <= 23) {
      setActiveSizeTitle("Normal");
    } else if (fontSize >= 24 && fontSize <= 30) {
      setActiveSizeTitle("Large");
    } else {
      setActiveSizeTitle("Extra Large");
    }
  }, [fontSize]);

  const min = 8;
  const max = 24;
  const value = fontSize;

  const percent = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const currentContrast = useContrastStore.getState().activeContrast;
    const currentHistory = useContrastStore.getState().contrastHistory;

    if (!currentContrast) {
      complementaryMode
        ? generateComplementaryContrastHandler()
        : generateRandomContrastHandler();
    } else if (currentHistory.length === 0) {
      setContrastHistory(currentContrast);
    }
  }, [
    generateComplementaryContrastHandler,
    generateRandomContrastHandler,
    setContrastHistory,
  ]);

  useEffect(() => {
    const currentTitle = useContrastStore.getState().contrastTitle;
    const currentDesc = useContrastStore.getState().contrastDescription;
    if (currentTitle === null) {
      setContrastTitle("Nice Day, Alhamdulliah!");
    }
    if (currentDesc === null) {
      setContrastDescription(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Recusandae iure dolore suscipit. Consequuntur eum doloremque assumenda itaque voluptas voluptate numquam, cum possimus, quidem corporis tenetur at quos! Architecto ex non mollitia deleniti laborum ducimus saepe facilis neque rerum adipisci tempora quibusdam nemo, aut nisi maiores sint, dolores hic sequi odit eos. Molestias ipsam nam architecto necessitatibus numquam vel, sapiente deleniti nemo, id dolores cumque soluta? Esse, eius dolorum? Dolorum expedita quia, dicta excepturi quidem quibusdam deserunt, maxime corporis ad doloribus sequi totam fuga nobis dolore? Nostrum reprehenderit vero expedita aliquid quod quia sunt, eum libero blanditiis, nihil vel, obcaecati tempora!",
      );
    }
  }, []);

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 px-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden max-[1400px]:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Color Contrast Checker
          </h2>
        </div>
        <div className="flex items-center gap-3 max-lg:hidden">
          <Button
            aria-label="View contrast history"
            onClick={() => toggleContrastHistoryModel()}
            variant={"outline"}
            size={"md"}
          >
            <LuHistory size={16} />
            <span>History</span>
          </Button>
          <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
            <Button
              aria-label="Undo contrast change"
              disabled={!(contrastHistoryIndex > 0)}
              onClick={() => {
                undoHandler();
              }}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuUndo2 size={16} aria-hidden="true" />
            </Button>
            <span className="w-px h-4 bg-gray-200"></span>
            <Button
              aria-label="Redo contrast change"
              disabled={!(contrastHistoryIndex < contrastHistory.length - 1)}
              onClick={() => {
                redoHandler();
              }}
              className={REDOUNDOCOMMONSTYLE}
              variant={"text"}
              size={"p0"}
            >
              <LuRedo2 size={16} aria-hidden="true" />
            </Button>
          </div>
          <Button
            aria-label="Export contrast color palette"
            onClick={() => {
              toggleExportModel();
              setExportFrom("Palette");
              setExportPalette([textColor, bgColor]);
            }}
            variant={"outline"}
            size={"md"}
          >
            <BiExport size={16} />
            <span>Export</span>
          </Button>
          <Button
            aria-label="Generate random color contrast pair"
            onClick={() =>
              complementaryMode
                ? generateComplementaryContrastHandler()
                : generateRandomContrastHandler()
            }
            variant={"primary"}
            size={"md"}
          >
            Generate Random Contrast
          </Button>
        </div>
        <div className="hidden max-lg:block">
          <ContrastResponsiveMoreMenu />
        </div>
      </div>
      <div className="w-full flex max-lg:flex-col h-[calc(100%-64px)]">
        <div
          className={`w-full border-r border-gray-200 flex items-center justify-center p-4 max-lg:h-35 bg-gray-100 rounded-bl-xl max-lg:rounded-none max-lg:border-r-0 max-lg:border-b`}
        >
          <div
            className={`w-full h-full ${isMaximizeContrast ? "absolute top-0 left-0 rounded-none z-50" : "rounded-xl"}`}
            style={{ backgroundColor: bgColor }}
          >
            <div className="w-full h-full relative max-lg:overflow-y-auto noscrollbar flex items-center justify-center p-4">
              <div className="w-full h-max max-lg:h-full flex items-center flex-col gap-6 justify-center max-lg:hidden">
                <h1
                  className="font-black select-none"
                  style={{
                    color: textColor,
                    fontSize: fontSize + 20,
                    fontWeight: fontWeight,
                  }}
                >
                  {contrastTitle}
                </h1>
                <p
                  className="max-w-200 text-center select-none"
                  style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                  }}
                >
                  {contrastDescription}
                </p>
              </div>
              <p
                className="text-sm font-semibold hidden max-lg:block"
                style={{ color: textColor }}
              >
                The quick brown fox jumps over the lazy dog. Pack my box with
                five dozen liquor jugs. How vividly dazzling colors bring quiet
                joy.
              </p>
              {isMaximizeContrast && (
                <Button
                  onClick={() => setIsMaximizeContrast()}
                  variant={"outline"}
                  size={"circle"}
                  className="absolute top-4 left-4"
                >
                  <LuArrowLeft size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-120 h-full shrink-0 max-lg:w-full max-lg:h-[calc(100%-140px)]">
          <div className="w-full overflow-y-scroll noscrollbar pb-4 h-[calc(100%-64px)] max-lg:h-[calc(100%-112px)]">
            <div className="w-full px-4 pt-4 pb-1 grid grid-cols-2 gap-1 max-sm:grid-cols-1">
              {colors.map(({ id, title, color }) => (
                <ContrastColorsWithPickerMenu
                  key={id}
                  title={title}
                  color={color}
                />
              ))}
            </div>
            <div className="w-full px-4 grid grid-cols-2 gap-1 max-sm:grid-cols-1">
              <div className="w-full flex items-center justify-between gap-2.5 border border-gray-200 rounded-lg px-2 h-12">
                <h3 className="text-sm font-semibold text-gray-900">
                  Contrast Ratio
                </h3>
                <p className="text-md font-bold text-gray-900">{ratio}</p>
              </div>
              <div className="w-full flex items-center justify-between gap-2.5 border border-gray-200 rounded-lg px-2 h-12">
                <h3 className="text-sm font-semibold text-gray-900">Status</h3>
                <span
                  className={`text-sm font-semibold px-2 py-0.5 rounded-full ${getLabel === "Excellent" && "text-gray-50 bg-green-500"} ${getLabel === "Good" && "text-gray-50 bg-indigo-500"} ${getLabel === "Fair" && "text-gray-50 bg-amber-500"} ${getLabel === "Poor" && "text-gray-50 bg-red-500"}`}
                >
                  {getRatingLabel()}
                </span>
              </div>
            </div>
            <div className="w-full p-4 grid grid-cols-1 gap-1">
              {WCAG.map(({ id, title, textSize, isPass }) => {
                return (
                  <div
                    key={id}
                    role="status"
                    aria-label={`WCAG ${title} ${textSize} — ${isPass ? "Pass" : "Fail"}`}
                    className={`w-full p-3 rounded-lg border-2 ${isPass ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"} flex items-center justify-between`}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <h4 className="text-sm font-semibold text-gray-500">
                        {title}
                      </h4>
                      <p className="text-sm font-semibold text-gray-900">
                        {textSize}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold px-2 py-0.5 rounded-full text-gray-50 ${isPass ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {isPass ? "Pass" : "Fail"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full px-4">
              <div className="w-full rounded-lg border border-gray-200 bg-gray-50">
                <button
                  aria-label={`${isAdvancedSettings ? "Close" : "Open"} advanced contrast settings`}
                  aria-expanded={isAdvancedSettings}
                  onClick={() => setIsAdvancedSettings((prev) => !prev)}
                  className={`p-3 w-full rounded-t-lg flex items-center justify-between cursor-pointer`}
                >
                  <h3 className="text-sm font-semibold text-gray-900">
                    Advanced Settings
                  </h3>
                  <LuChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${
                      isAdvancedSettings ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all rounded-b-lg bg-white duration-300 ease-in-out border-t border-gray-200 ${isAdvancedSettings ? "h-72 max-lg:h-15 max-sm:h-20" : "h-0 border-t-0"}`}
                >
                  <div className="w-full p-4 max-lg:hidden">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">
                        Font Size
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {`${fontSize}px`}
                      </p>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={24}
                      value={fontSize}
                      aria-label="Adjust font size for contrast preview"
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(
                          to right,
                          #6366f1 0%,
                          #6366f1 ${percent}%,
                          #e5e7eb ${percent}%,
                          #e5e7eb 100%
                        )`,
                      }}
                    />
                  </div>
                  <div className="w-full px-4 max-lg:hidden">
                    <p className="text-sm font-semibold text-gray-900">
                      Font Weight
                    </p>
                    <div className="mt-3 w-full gap-1 grid grid-cols-7">
                      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                        (_, index) => {
                          return (
                            <button
                              aria-label={`Set font weight to ${_}`}
                              aria-pressed={_ === fontWeight}
                              key={index}
                              className={`px-3 py-2 rounded-full text-sm font-semibold ${_ === fontWeight ? "bg-gray-900 text-gray-50" : "bg-gray-100 text-gray-900 hover:bg-gray-200"} transition-all cursor-pointer`}
                              onClick={() => setFontWeight(_)}
                            >
                              {_}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>
                  <div className="w-full p-4 flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-md font-semibold">
                        Complementary Mode{" "}
                        <span className="text-xs font-medium text-gray-500">
                          (Default Red)
                        </span>
                      </h3>
                      <p className="text-sm font-medium text-gray-600 max-w-95 max-lg:hidden">
                        Automatically generates complementary high-contrast
                        color pairs.
                      </p>
                    </div>
                    <ToggleButton
                      isTrue={complementaryMode}
                      setIsTrue={setIsComplementaryMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-16 max-lg:h-28 border-t bg-white rounded-br-xl max-lg:rounded-bl-xl border-gray-200 flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:gap-2 p-4">
            <div className="max-lg:hidden">
              <OpenMoreMenu from="Contrast" />
            </div>
            <ColorPreferencesMenu from="Contrast" />
            <div className="w-full hidden max-lg:block">
              <div className="w-full flex items-center gap-2">
                <div className="flex items-center justify-between gap-4 px-4 border border-gray-200 h-10 rounded-full">
                  <Button
                    aria-label="Undo contrast change"
                    disabled={!(contrastHistoryIndex > 0)}
                    onClick={() => {
                      undoHandler();
                    }}
                    className={REDOUNDOCOMMONSTYLE}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuUndo2 size={16} aria-hidden="true" />
                  </Button>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <Button
                    aria-label="Redo contrast change"
                    disabled={
                      !(contrastHistoryIndex < contrastHistory.length - 1)
                    }
                    onClick={() => {
                      redoHandler();
                    }}
                    className={REDOUNDOCOMMONSTYLE}
                    variant={"text"}
                    size={"p0"}
                  >
                    <LuRedo2 size={16} aria-hidden="true" />
                  </Button>
                </div>
                <Button
                  aria-label="Generate random color contrast pair"
                  onClick={() =>
                    complementaryMode
                      ? generateComplementaryContrastHandler()
                      : generateRandomContrastHandler()
                  }
                  variant={"primary"}
                  size={"md"}
                  className="w-full"
                >
                  Generate Contrast
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
