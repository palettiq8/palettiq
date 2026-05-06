"use client";

import useModelStore from "@/libs/stores/modelStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import ButtonLoader from "../server/ButtonLoader";
import { useOtherStore } from "@/libs/stores/dataStore";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  industries,
  preferredColors,
  moods,
  brightnessLevels,
  saturationLevels,
  modes,
  useCases,
  colorHarmonies,
  tags,
} from "@/utils/Items";
import { LuCheck, LuChevronUp, LuSearch, LuX } from "react-icons/lu";
import { usePublishPaletteMutation } from "@/libs/features/api/apiSlice";
import { FlashMessage } from "@/utils/utils";
import { PaletteColor } from "@/utils/Types";

const INPUTCOMMONSTYLE =
  "w-full p-3 rounded-lg border-2 text-sm font-medium text-gray-900 placeholder:text-gray-500 caret-gray-500 outline-none transition-all";

const ItemSelector = ({
  items,
  state,
  setState,
}: {
  items: string[];
  state: string[];
  setState: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <>
      {items.map((tag, index) => (
        <button
          aria-label={`${state.includes(tag) ? "Remove" : "Add"} ${tag}`}
          aria-pressed={state.includes(tag)}
          onClick={() => {
            setState((prev) =>
              prev.includes(tag)
                ? prev.filter((item) => item !== tag)
                : [...prev, tag],
            );
          }}
          key={index}
          className={`w-full flex items-center justify-start gap-3.5 p-2 text-sm font-semibold rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 ${
            state.includes(tag) ? "text-indigo-600" : "text-gray-900"
          } hover:cursor-pointer`}
        >
          <LuCheck
            size={18}
            className={`invisible ${state.includes(tag) && "visible"}`}
          />
          <p>{tag}</p>
        </button>
      ))}
    </>
  );
};

const FlexWrapItemSelector = ({
  title,
  items,
  state,
  setState,
}: {
  title: string;
  items: string[];
  state: string[];
  setState: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div className="w-full mt-5">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <div className="w-full mt-3 flex items-center flex-wrap gap-2">
        {items.map((_, index) => {
          const isExist = state.includes(_);
          return (
            <button
              onClick={() => {
                setState((prev) =>
                  prev.includes(_)
                    ? prev.filter((item) => item !== _)
                    : [...prev, _],
                );
              }}
              key={index}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer transition-all ${isExist ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-gray-50 border-gray-200 text-gray-900"}`}
            >
              {_}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function AddToCommunityModel() {
  const [showDescCount, setShowDescCount] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [showPreferredColors, setShowPreferredColors] = useState(false);
  const [showSelectedMoods, setShowSelectedMoods] = useState(false);
  const [showUsecase, setShowUsecase] = useState(false);
  const [searchBoxTags, setSearchBoxTags] = useState("");
  const [paletteNameError, setPaletteNameError] = useState<string | null>(null);
  const [paletteName, setPaletteName] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [colorPreferred, setColorPreferred] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedBrightnessLevel, setSelectedBrightnessLevel] = useState<
    string[]
  >([]);
  const [selectedSaturationLevel, setSelectedSaturationLevel] = useState<
    string[]
  >([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedUsecases, setSelectedUsecases] = useState<string[]>([]);
  const [selectedHarmonies, setselectedHarmonies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagInputFocused, setIsTagInputFocused] = useState(false);
  const dataContentRef = useRef<HTMLDivElement | null>(null);
  const addToCommunityModel = useModelStore(
    (state) => state.addToCommunityModel,
  );
  const setAddToCommunityPalette = useOtherStore(
    (state) => state.setAddToCommunityPalette,
  );
  const toggleAddToCommunityModel = useModelStore(
    (state) => state.toggleAddToCommunityModel,
  );
  const addToCommunityPalette = useOtherStore(
    (state) => state.addToCommunityPalette,
  );
  const [publishPalette, { isLoading }] = usePublishPaletteMutation();
  const handler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("parent")) {
      toggleAddToCommunityModel();
      setAddToCommunityPalette(null);
    }
  };
  const ftags = tags.filter((tag) => {
    if (!searchBoxTags.trim() && isTagInputFocused) return true;
    const escapedSearch = searchBoxTags.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escapedSearch, "i").test(tag);
  });
  const isTagsShow = searchBoxTags.length > 0 || isTagInputFocused;
  const isDisabledPublishedButton = !(
    paletteName &&
    desc &&
    selectedIndustries.length > 0 &&
    colorPreferred.length > 0 &&
    selectedMoods.length > 0 &&
    selectedBrightnessLevel.length > 0 &&
    selectedSaturationLevel.length > 0 &&
    selectedModes.length > 0 &&
    selectedUsecases.length > 0 &&
    selectedHarmonies.length > 0 &&
    selectedTags.length > 0
  );

  const publishPaletteHandler = async () => {
    try {
      await publishPalette({
        name: paletteName,
        description: desc,
        colors: addToCommunityPalette as PaletteColor[],
        industries: selectedIndustries,
        preferred_colors: colorPreferred,
        moods: selectedMoods,
        brightness_level: selectedBrightnessLevel,
        saturation_level: selectedSaturationLevel,
        modes: selectedModes,
        usecases: selectedUsecases,
        harmonies: selectedHarmonies.map((harmony) =>
          harmony.toLowerCase().split(" ").join("-"),
        ),
        tags: selectedTags,
        status: "Published",
      }).unwrap();
      FlashMessage("success", "Palette published successfully.");
      toggleAddToCommunityModel();
      setAddToCommunityPalette(null);
    } catch (error: any) {
      FlashMessage("error", error?.message);
    }
  };

  return (
    <AnimatePresence>
      {addToCommunityModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handler}
          className="fixed inset-0 w-full h-screen bg-black/50 grid place-content-center z-50 max-sm:block max-sm:px-4 parent"
        >
          <motion.div
            ref={dataContentRef}
            role="dialog"
            aria-modal="true"
            aria-label="Publish color palette to community"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-125 h-165 bg-white rounded-xl shadow-2xl max-sm:w-full overflow-y-scroll noscrollbar"
          >
            <div className="w-full sticky top-0 px-3 border-b border-gray-200 z-40">
              <div className="w-full flex items-center justify-between py-3 bg-white">
                <h2 className="text-md font-semibold text-gray-900">
                  Publish Palette
                </h2>
                <Button
                  onClick={publishPaletteHandler}
                  disabled={isDisabledPublishedButton}
                  aria-label="Publish color palette to PalettIQ community"
                  variant={"primary"}
                  size={"md"}
                >
                  {isLoading && <ButtonLoader />}
                  <span>Publish</span>
                </Button>
              </div>
            </div>
            <div className="w-full p-3">
              <div className="flex">
                {addToCommunityPalette?.map(({ color }, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-30 first:rounded-l-xl last:rounded-r-xl"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
              <div className="w-full flex-col gap-3">
                <div className="w-full mt-4">
                  <label
                    htmlFor="palettename"
                    className="text-sm font-semibold"
                  >
                    Palette Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name (professional)"
                    name="palettename"
                    className={`${INPUTCOMMONSTYLE} mt-3 ${paletteNameError ? "border-red-400" : "border-gray-200 focus:border-indigo-500"}`}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPaletteName(value);
                      if (value.length > 55) {
                        setPaletteNameError("Name must be within 55 chars!");
                      } else {
                        setPaletteNameError("");
                      }
                    }}
                    value={paletteName}
                  />
                  {paletteNameError && (
                    <span className="text-xs font-semibold text-red-600">
                      {paletteNameError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full gap-3 mt-4">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold"
                  >
                    Description
                  </label>
                  <div className="w-full h-max relative">
                    <textarea
                      name="description"
                      onFocus={() => setShowDescCount(true)}
                      onBlur={() => setShowDescCount(false)}
                      value={desc}
                      placeholder="Add a short description"
                      className={`${INPUTCOMMONSTYLE} resize-none h-60 border-gray-200 focus:border-indigo-500`}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value.length <= 1024) {
                          setDesc(value);
                        } else {
                          setDesc(value.slice(0, 1024));
                        }
                      }}
                    />
                    {showDescCount && (
                      <span
                        className={`text-xs font-semibold absolute bottom-4 right-4 ${desc.length < 1024 ? "text-gray-700" : "text-red-500"}`}
                      >
                        {`${desc.length}/1024`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Industries
                  </h3>
                  {selectedIndustries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedIndustries.map((_, index) => {
                        return (
                          <p
                            key={index}
                            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 py-1 px-2 rounded-full"
                          >
                            {_}
                          </p>
                        );
                      })}
                    </div>
                  )}
                  <div className="w-full border-2 border-gray-200 rounded-lg mt-3 bg-white">
                    <button
                      aria-label="Toggle industry selection"
                      aria-expanded={showIndustry}
                      onClick={() => setShowIndustry((prev) => !prev)}
                      className={`flex items-center justify-between text-gray-900 p-3 w-full ${
                        showIndustry && "border-b-2 border-gray-200"
                      } cursor-pointer select-none`}
                    >
                      <span className="text-sm font-semibold">
                        Select Industry
                      </span>
                      <LuChevronUp
                        size={20}
                        className={`transition-transform duration-300 ${
                          showIndustry ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </button>
                    {showIndustry && (
                      <div className="w-full rounded-lg h-98.75 overflow-y-scroll p-1.5 noscrollbar">
                        <ItemSelector
                          items={industries}
                          state={selectedIndustries}
                          setState={setSelectedIndustries}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Preferred Colors
                  </h3>
                  {colorPreferred.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {colorPreferred.map((_, index) => {
                        return (
                          <p
                            key={index}
                            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 py-1 px-2 rounded-full"
                          >
                            {_}
                          </p>
                        );
                      })}
                    </div>
                  )}
                  <div className="w-full border-2 border-gray-200 rounded-lg mt-3 bg-white">
                    <button
                      aria-label="Toggle color family selection"
                      aria-expanded={showPreferredColors}
                      onClick={() => setShowPreferredColors((prev) => !prev)}
                      className={`flex items-center justify-between text-gray-900 p-3 w-full ${
                        showPreferredColors && "border-b-2 border-gray-200"
                      } cursor-pointer select-none`}
                    >
                      <span className="text-sm font-semibold">
                        Select Color
                      </span>
                      <LuChevronUp
                        size={20}
                        className={`transition-transform duration-300 ${
                          showPreferredColors ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </button>
                    {showPreferredColors && (
                      <div className="w-full rounded-lg h-98.75 overflow-y-scroll p-1.5 noscrollbar">
                        {preferredColors.map((color) => {
                          const isExist = colorPreferred.includes(color.name);
                          return (
                            <button
                              key={color.id}
                              className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 border border-white hover:border-gray-200 cursor-pointer transition-all ${isExist ? "text-indigo-600" : "text-gray-900"}`}
                              onClick={() => {
                                setColorPreferred((prev) =>
                                  prev.includes(color.name)
                                    ? prev.filter((item) => item !== color.name)
                                    : [...prev, color.name],
                                );
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <LuCheck
                                  size={16}
                                  className={`invisible ${isExist && "visible"}`}
                                />
                                <p className="text-sm font-semibold">
                                  {color.name}
                                </p>
                              </div>
                              <span
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: color.hex }}
                              ></span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Moods/Emotions
                  </h3>
                  {selectedMoods.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedMoods.map((_, index) => {
                        return (
                          <p
                            key={index}
                            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 py-1 px-2 rounded-full"
                          >
                            {_}
                          </p>
                        );
                      })}
                    </div>
                  )}
                  <div className="w-full border-2 border-gray-200 rounded-lg mt-3 bg-white">
                    <button
                      aria-label="Toggle mood selection"
                      aria-expanded={showSelectedMoods}
                      onClick={() => setShowSelectedMoods((prev) => !prev)}
                      className={`flex items-center justify-between text-gray-900 p-3 w-full ${
                        showSelectedMoods && "border-b-2 border-gray-200"
                      } cursor-pointer select-none`}
                    >
                      <span className="text-sm font-semibold">Select Mood</span>
                      <LuChevronUp
                        size={20}
                        className={`transition-transform duration-300 ${
                          showSelectedMoods ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </button>
                    {showSelectedMoods && (
                      <div className="w-full rounded-lg h-98.75 overflow-y-scroll p-1.5 noscrollbar">
                        <ItemSelector
                          items={moods}
                          state={selectedMoods}
                          setState={setSelectedMoods}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <FlexWrapItemSelector
                  title="Brightness Levels"
                  items={brightnessLevels}
                  state={selectedBrightnessLevel}
                  setState={setSelectedBrightnessLevel}
                />
                <FlexWrapItemSelector
                  title="Saturation Levels"
                  items={saturationLevels}
                  state={selectedSaturationLevel}
                  setState={setSelectedSaturationLevel}
                />
                <FlexWrapItemSelector
                  title="Modes"
                  items={modes}
                  state={selectedModes}
                  setState={setSelectedModes}
                />

                <div className="w-full mt-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Use Cases
                  </h3>
                  {selectedUsecases.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedUsecases.map((_, index) => {
                        return (
                          <p
                            key={index}
                            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 py-1 px-2 rounded-full"
                          >
                            {_}
                          </p>
                        );
                      })}
                    </div>
                  )}
                  <div className="w-full border-2 border-gray-200 rounded-lg mt-3 bg-white">
                    <button
                      aria-label="Toggle use case selection"
                      aria-expanded={showUsecase}
                      onClick={() => setShowUsecase((prev) => !prev)}
                      className={`flex items-center justify-between text-gray-900 p-3 w-full ${
                        showUsecase && "border-b-2 border-gray-200"
                      } cursor-pointer select-none`}
                    >
                      <span className="text-sm font-semibold">
                        Select Use Case
                      </span>
                      <LuChevronUp
                        size={20}
                        className={`transition-transform duration-300 ${
                          showUsecase ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </button>
                    {showUsecase && (
                      <div className="w-full rounded-lg h-98.75 overflow-y-scroll p-1.5 noscrollbar">
                        <ItemSelector
                          items={useCases}
                          state={selectedUsecases}
                          setState={setSelectedUsecases}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <FlexWrapItemSelector
                  title="Color Hamonies"
                  items={colorHarmonies.map((harmony) => harmony.title)}
                  state={selectedHarmonies}
                  setState={setselectedHarmonies}
                />

                <div className="w-full mt-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Tags
                    </h3>
                    <p className="text-xs font-medium text-gray-600">
                      Add tags for better discovery.
                    </p>
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedTags.map((_, index) => {
                        return (
                          <button
                            aria-label={`Remove tag ${_}`}
                            key={index}
                            className="text-xs font-semibold text-indigo-800 bg-indigo-50 border border-indigo-100 py-1 px-2 rounded-full flex items-center gap-1.5"
                          >
                            <span>{_}</span>
                            <LuX
                              onClick={() => {
                                setSelectedTags((prev) =>
                                  prev.filter((item) => item !== _),
                                );
                              }}
                              className="text-gray-900 cursor-pointer"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="mt-3">
                    <div className="w-full border-2 border-gray-200 rounded-lg bg-white p-1">
                      <div className="w-full relative">
                        <input
                          type="text"
                          value={searchBoxTags}
                          aria-label="Search palette tags"
                          onFocus={() => setIsTagInputFocused(true)}
                          className="text-sm font-medium w-full px-8 py-1.5 focus:outline-gray-300 rounded-md focus:placeholder:text-gray-400 placeholder:text-gray-500 caret-gray-500"
                          placeholder="Search tags..."
                          onChange={(e) => setSearchBoxTags(e.target.value)}
                        />
                        {isTagsShow && (
                          <button
                            aria-label="Clear tag search"
                            onClick={() => {
                              setSearchBoxTags("");
                              setIsTagInputFocused(false);
                            }}
                            className="text-gray-600 absolute top-1 right-1 cursor-pointer w-6 h-6 rounded-md hover:bg-gray-100 grid place-content-center border border-white hover:border-gray-200"
                          >
                            <LuX size={16} aria-hidden="true" />
                          </button>
                        )}
                        <LuSearch
                          size={16}
                          className="text-gray-400 absolute top-2 left-2"
                        />
                      </div>
                      {isTagsShow && (
                        <div className="w-full max-h-80 mt-2 overflow-y-auto">
                          {ftags.length > 0 ? (
                            <ItemSelector
                              items={ftags}
                              state={selectedTags}
                              setState={setSelectedTags}
                            />
                          ) : (
                            <p className="text-xs font-semibold text-gray-500 text-center py-10">
                              No tags found!
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
