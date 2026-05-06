"use client";

import { Button } from "@/components/Button";
import AiConfigureMenu from "@/components/client/AiConfigureMenu";
import AiPaletteMoreMenu from "@/components/client/AiPaletteMoreMenu";
import CopyTooltip from "@/components/client/CopyTooltip";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import ToggleButton from "@/components/server/ToggleButton";
import { useAiStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import useUiStore from "@/libs/stores/uiStore";
import {
  brightnessLevels,
  colorCountMenuItems,
  colorHarmonies,
  industries,
  modes,
  moods,
  paletteCount,
  preferredColors,
  saturationLevels,
  useCases,
} from "@/utils/Items";
import { generatorContentHeaderItemsStyle } from "@/utils/styles/Classes";
import { AiPaletteType } from "@/utils/Types";
import { FlashMessage } from "@/utils/utils";
import { useState } from "react";
import { LuEye, LuPlus, LuSparkle, LuSparkles } from "react-icons/lu";

export default function AiGeneratorPageClient() {
  const [aiDesc, setAiDesc] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const aiPreferredColors = useAiStore((state) => state.aiPreferredColors);
  const aiColorCount = useAiStore((state) => state.aiColorCount);
  const aiPaletteCount = useAiStore((state) => state.aiPaletteCount);
  const aiColorHarmony = useAiStore((state) => state.aiColorHarmony);
  const aiColorMood = useAiStore((state) => state.aiColorMood);
  const aiIndustry = useAiStore((state) => state.aiIndustry);
  const aiBrightness = useAiStore((state) => state.aiBrightness);
  const aiSaturation = useAiStore((state) => state.aiSaturation);
  const aiMode = useAiStore((state) => state.aiMode);
  const aiUseCase = useAiStore((state) => state.aiUseCase);
  const clearAllAiItems = useAiStore((state) => state.clearAllAiItems);
  const addAiDescription = useUiStore((state) => state.addAiDescription);
  const setAddAiDescription = useUiStore((state) => state.setAddAiDescription);
  const aiGeneratedPalettes = useAiStore((state) => state.aiGeneratedPalettes);
  const setAiGeneratedPalettes = useAiStore(
    (state) => state.setAiGeneratedPalettes,
  );
  const toggleQuickViewModel = useModelStore(
    (state) => state.toggleQuickViewModel,
  );
  const setQuickViewActiveTab = useOtherStore(
    (state) => state.setQuickViewActiveTab,
  );
  const setQuickViewPalette = useOtherStore(
    (state) => state.setQuickViewPalette,
  );
  const setQuickViewActiveColor = useOtherStore(
    (state) => state.setQuickViewActiveColor,
  );

  const prompt = `You are a color palette generator.
    User Preferences:
    - Colors: ${aiPreferredColors.length > 0 ? aiPreferredColors : "Any"}
    - Count: ${aiColorCount}
    - Harmony: ${aiColorHarmony}
    - Mood: ${aiColorMood}
    - Industry: ${aiIndustry}
    - Brightness: ${aiBrightness}
    - Saturation: ${aiSaturation}
    - Mode: ${aiMode}
    - Use: ${aiUseCase}
    - Total Palettes: ${aiPaletteCount}

    Extra:
    ${aiDesc}

    Rules:
    - Generate exactly the requested palettes and color count.
    - Follow given preferences; ignore if "No".
    - Ensure the palette name(Must have).

    Output:

    [
      {
        "paletteName": "",
        "colors": ["#HEX", ...],
      }
    ]

    Return only valid JSON. No extra text.`;

  const generateAiPalettes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const err = await response.json();
        FlashMessage("error", err?.error || "AI generation failed.");
        return;
      }

      const data = await response.json();
      const text = data?.result;

      if (!text) {
        FlashMessage("error", "No response received from AI.");
        return;
      }

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonStart = cleaned.indexOf("[");
      const jsonEnd = cleaned.lastIndexOf("]");

      if (jsonStart === -1 || jsonEnd === -1) {
        FlashMessage("error", "Oops! Something is wrong! Try again.");
        return;
      }

      const safeJson = cleaned.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(safeJson);
      setAiGeneratedPalettes(parsed);
    } catch (err: any) {
      FlashMessage(
        "error",
        "Something went wrong while generating! Try again later.",
      );
      if (process.env.NODE_ENV === "development") console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl">
      <div className="w-full h-16 border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden max-[1400px]:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            AI Color Palette Generator
          </h2>
        </div>
        <div className="flex items-center gap-3 max-sm:hidden">
          <button
            aria-label="Generate AI color palettes"
            onClick={() => generateAiPalettes()}
            disabled={isLoading}
            className="h-10 px-4 rounded-full flex items-center gap-3 bg-linear-65 from-orange-500 to-pink-500 text-gray-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 rounded-full border-y-2 border-gray-50 animate-spin"></div>
            ) : (
              <LuSparkles size={16} />
            )}
            <span className="text-sm font-semibold">Generate</span>
          </button>
        </div>
      </div>
      <div
        className="w-full overflow-y-auto noscrollbar"
        style={{ height: "calc(100% - 64px)" }}
      >
        <div className={`w-full h-max p-4 flex flex-col gap-4`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LuSparkle size={16} className="text-orange-500" />
              <h3 className="text-md font-semibold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Configure your AI color palette
              </h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 max-lg:hidden">
                <p className="text-sm font-semibold text-gray-900">
                  Add additional description
                </p>
                <ToggleButton
                  isTrue={addAiDescription}
                  setIsTrue={() => setAddAiDescription()}
                />
              </div>
              <Button
                aria-label="Clear all AI palette configuration selections"
                onClick={() => clearAllAiItems()}
                variant={"distrcutiveText"}
                size={"p0"}
              >
                <span className="hidden max-lg:block">Clear</span>
                <span className="max-lg:hidden">Clear Selections</span>
              </Button>
            </div>
          </div>
          <div className="w-full grid grid-cols-5 max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3">
            <AiConfigureMenu
              from="preferred"
              title="Color Preferrences"
              preferred={preferredColors}
              preferredCurrentItem={aiPreferredColors}
            />
            <AiConfigureMenu
              from="count"
              title="Color Count"
              items={colorCountMenuItems}
              currentItem={aiColorCount}
            />
            <AiConfigureMenu
              from="paletteCount"
              title="Palette Count"
              items={paletteCount}
              currentItem={aiPaletteCount}
            />
            <AiConfigureMenu
              from="harmony"
              title="Color Harmony"
              items={colorHarmonies.map((harmony) => harmony.title)}
              currentItem={aiColorHarmony}
            />
            <AiConfigureMenu
              from="mood"
              title="Mood/Emotion"
              items={moods}
              currentItem={aiColorMood}
            />
            <AiConfigureMenu
              from="industry"
              title="Industry"
              items={industries}
              currentItem={aiIndustry}
            />
            <AiConfigureMenu
              from="brightness"
              title="Brightness Level"
              items={brightnessLevels}
              currentItem={aiBrightness}
            />
            <AiConfigureMenu
              from="saturation"
              title="Saturation Level"
              items={saturationLevels}
              currentItem={aiSaturation}
            />
            <AiConfigureMenu
              from="mode"
              title="Mode"
              items={modes}
              currentItem={aiMode}
            />
            <AiConfigureMenu
              from="usecase"
              title="Use Case"
              items={useCases}
              currentItem={aiUseCase}
            />
          </div>
          <div className="w-full hidden max-lg:block">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-gray-900">
                Add additional description
              </p>
              <ToggleButton
                isTrue={addAiDescription}
                setIsTrue={() => setAddAiDescription()}
              />
            </div>
          </div>
          {addAiDescription && (
            <div className="w-full">
              <textarea
                name="aiDescription"
                id="aiDescription"
                value={aiDesc}
                onChange={(e) => setAiDesc(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-4 h-35 text-sm font-semibold text-gray-900 resize-none placeholder:text-gray-500 caret-gray-500 focus:border-indigo-600 outline-none bg-white placeholder:select-none"
                aria-label="Additional description for AI color palette generation"
                placeholder="Describe your brand, mood, or design style for better AI results..."
                maxLength={500}
              ></textarea>
            </div>
          )}
          <div className="w-full hidden max-sm:block">
            <div className="w-full flex items-center justify-end gap-3">
              <button
                onClick={() => generateAiPalettes()}
                disabled={isLoading}
                className="h-10 px-4 rounded-full flex items-center gap-3 bg-linear-65 from-orange-500 to-pink-500 text-gray-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 rounded-full border-y-2 border-gray-50 animate-spin"></div>
                ) : (
                  <LuSparkles size={16} />
                )}
                <span className="text-sm font-semibold">Generate</span>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 w-full h-max">
          {isLoading ? (
            <div className="w-full grid grid-cols-3 max-2xl:grid-cols-2 max-md:grid-cols-1 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-40 max-lg:h-30 rounded-xl bg-gray-100 skeleton"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {aiGeneratedPalettes.length > 0 ? (
                <div className={`w-full`}>
                  <h2 className="text-md font-semibold text-gray-900">
                    AI Generated Color Palettes
                  </h2>
                  <div className="w-full grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1 gap-3 mt-3">
                    {aiGeneratedPalettes?.map(
                      (_: AiPaletteType, index: number) => {
                        const data = _?.colors?.map((_) => _);
                        return (
                          <article
                            key={index}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50"
                          >
                            <div className="w-full flex items-center justify-between">
                              <h3 className="text-sm font-semibold text-gray-900">
                                {_?.paletteName}
                              </h3>
                              <div className="flex items-center gap-3">
                                <LuEye
                                  size={17}
                                  onClick={() => {
                                    toggleQuickViewModel();
                                    setQuickViewActiveTab("Formats");
                                    setQuickViewPalette(data);
                                    setQuickViewActiveColor(data[0]);
                                  }}
                                  className={`${generatorContentHeaderItemsStyle}`}
                                />
                                <AiPaletteMoreMenu
                                  palette={_?.colors?.map((color, index) => ({
                                    id: `${index + 1}`,
                                    color,
                                    isLocked: false,
                                  }))}
                                />
                              </div>
                            </div>
                            <div className="flex mt-3 border-2 border-white shadow-sm rounded-lg">
                              {_?.colors?.map((color, index) => {
                                return (
                                  <div
                                    key={index}
                                    role="button"
                                    aria-label={`Copy color ${color.toUpperCase()} from ${_?.paletteName} palette`}
                                    className="w-full h-40 max-lg:h-30 group relative cursor-pointer first:rounded-l-lg last:rounded-r-lg"
                                    style={{ backgroundColor: color }}
                                    onClick={async () => {
                                      await navigator.clipboard.writeText(
                                        color.toUpperCase(),
                                      );
                                      FlashMessage(
                                        "success",
                                        "Copied to the clipboard!",
                                      );
                                    }}
                                  >
                                    <div className="absolute top-5 left-1/2">
                                      <div className="relative -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-gray-50 text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap z-10">
                                        <span className="text-xs font-medium text-gray-50">
                                          {color.toUpperCase()}
                                        </span>
                                        <div className="w-2 h-2 top-6 left-1/2 absolute rotate-45 bg-gray-900"></div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </article>
                        );
                      },
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full h-100 grid place-content-center border bg-gray-50 border-gray-200 rounded-xl`}
                >
                  <h2 className="text-md font-semibold text-gray-500">
                    No AI generated palettes yet. Configure and generate above.
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
