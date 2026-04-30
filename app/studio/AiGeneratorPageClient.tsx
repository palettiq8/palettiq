"use client";

import { Button } from "@/components/Button";
import AiConfigureMenu from "@/components/client/AiConfigureMenu";
import AiModelMenu from "@/components/client/AiModelMenu";
import CopyTooltip from "@/components/client/CopyTooltip";
import PaletteMoreMenu from "@/components/client/PaletteMoreMenu";
import StudioResponsiveMenuIcon from "@/components/client/StudioResponsiveMenuIcon";
import ToggleButton from "@/components/server/ToggleButton";
import { useAiStore } from "@/libs/stores/dataStore";
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
import { AiPaletteType, PublishedPaletteType } from "@/utils/Types";
import { FlashMessage } from "@/utils/utils";
import { useState } from "react";
import { LuBookmark, LuHeart, LuSparkle, LuSparkles } from "react-icons/lu";

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
  const activeAiModel = useAiStore((state) => state.activeAiModel);

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
    - Ensure colors are distinct, balanced, modern, and suitable for design.

    Output:

    If Mode !== "Auto (Generate Both)":
    [
      {
        "paletteName": "",
        "colors": ["#HEX", "#HEX", "#HEX", "#HEX", "#HEX"],
        "description": ""
      }
    ]

    If Mode === "Auto (Generate Both)":
    [
      {
        "paletteName": "",
        "colors": [
          { "light": "#HEX", "dark": "#HEX" }
        ],
        "description": ""
      }
    ]

    Return only valid JSON. No extra text.`;

  const generateAiPalettes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: activeAiModel }),
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
          <div className="hidden max-xl:block">
            <StudioResponsiveMenuIcon />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Ai Generator</h2>
        </div>
        <div className="flex items-center gap-3">
          <AiModelMenu />
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
      <div
        className="w-full overflow-y-auto noscrollbar"
        style={{ height: "calc(100% - 64px)" }}
      >
        <div
          className={`w-full p-4 flex flex-col gap-4 ${addAiDescription ? "h-85" : "h-46"}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuSparkle size={16} className="text-orange-500" />
              <h3 className="text-md font-semibold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Configure your palette
              </h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-900">
                  Add additional description
                </p>
                <ToggleButton
                  isTrue={addAiDescription}
                  setIsTrue={() => setAddAiDescription()}
                />
              </div>
              <Button
                onClick={() => clearAllAiItems()}
                variant={"distrcutiveText"}
                size={"p0"}
              >
                Clear Selections
              </Button>
            </div>
          </div>
          <div className="w-full grid grid-cols-5 gap-3">
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
          {addAiDescription && (
            <div className="w-full">
              <textarea
                name="aiDescription"
                id="aiDescription"
                value={aiDesc}
                onChange={(e) => setAiDesc(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-4 h-35 text-sm font-semibold text-gray-900 resize-none placeholder:text-gray-500 caret-gray-500 focus:border-indigo-600 outline-none bg-white placeholder:select-none"
                placeholder="Tell more about your selection..."
                maxLength={500}
              ></textarea>
            </div>
          )}
        </div>
        <div
          className="px-4 pb-4 w-full h-max"
          style={{
            height: addAiDescription
              ? "calc(100% - 340px)"
              : "calc(100% - 184px)",
          }}
        >
          {isLoading ? (
            <div className="w-full grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-50 rounded-xl bg-gray-100 skeleton"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {aiGeneratedPalettes.length > 0 ? (
                <div className={`w-full`}>
                  <h1 className="text-md font-semibold text-gray-900">
                    Generated Palettes
                  </h1>
                  <div className="w-full grid grid-cols-3 gap-3 mt-3">
                    {aiGeneratedPalettes?.map(
                      (_: AiPaletteType, index: number) => {
                        return (
                          <div
                            key={index}
                            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50"
                          >
                            <div className="w-full flex items-center justify-between">
                              <p className="text-sm font-semibold text-gray-900">
                                {_?.paletteName}
                              </p>
                              <div className="flex items-center gap-3">
                                <Button variant={"outline"} size={"circle"}>
                                  <LuBookmark size={16} />
                                </Button>
                                <Button variant={"outline"} size={"circle"}>
                                  <LuHeart size={16} />
                                </Button>
                                <PaletteMoreMenu
                                  palette={{} as PublishedPaletteType}
                                />
                              </div>
                            </div>
                            <div className="flex mt-3">
                              {_?.colors?.map((color, index) => {
                                if (typeof color === "string") {
                                  return (
                                    <div
                                      key={index}
                                      className="w-full h-50 first:rounded-l-lg last:rounded-r-lg"
                                      style={{ backgroundColor: color }}
                                    >
                                      <CopyTooltip color={color} />
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={index}
                                    className="w-full h-50 flex flex-col"
                                  >
                                    <div
                                      className={`w-full h-full 
                                    ${index === 0 ? "rounded-tl-lg" : ""} 
                                    ${index === _?.colors.length - 1 ? "rounded-tr-lg" : ""}`}
                                      style={{ backgroundColor: color.light }}
                                    >
                                      <CopyTooltip color={color.light} />
                                    </div>

                                    <div
                                      className={`w-full h-full 
                                    ${index === 0 ? "rounded-bl-lg" : ""} 
                                    ${index === _?.colors.length - 1 ? "rounded-br-lg" : ""}`}
                                      style={{ backgroundColor: color.dark }}
                                    >
                                      <CopyTooltip color={color.dark} />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <p className="text-sm font-semibold text-gray-600 max-w-75">
                                {_?.description?.length > 120
                                  ? `${_?.description.slice(0, 120)}...`
                                  : _?.description}
                              </p>
                              <Button
                                variant={"outline"}
                                size={"md"}
                                className="shrink-0"
                              >
                                Add to Community
                              </Button>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={`w-full h-full grid place-content-center border bg-gray-50 border-gray-200 rounded-xl`}
                >
                  <h2 className="text-md font-semibold text-gray-500">
                    No recent generated palette.
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
