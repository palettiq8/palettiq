"use client";

import { Button } from "@/components/Button";
import ExplorePaletteViewMenu from "@/components/client/ExplorePaletteViewMenu";
import ToggleButton from "@/components/server/ToggleButton";
import { useContrastStore, useOtherStore } from "@/libs/stores/dataStore";
import useModelStore from "@/libs/stores/modelStore";
import { FlashMessage } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const downloadPngWithoutHex = useOtherStore(
    (state) => state.downloadPngWithoutHex,
  );
  const setDownloadPngWithoutHex = useOtherStore(
    (state) => state.setDownloadPngWithoutHex,
  );
  const setContrastTitle = useContrastStore((state) => state.setContrastTitle);
  const setContrastDescription = useContrastStore(
    (state) => state.setContrastDescription,
  );
  const toggleResetPreferencesModel = useModelStore(
    (state) => state.toggleResetPreferencesModel,
  );

  useEffect(() => {
    const currentTitle = useContrastStore.getState().contrastTitle;
    const currentDesc = useContrastStore.getState().contrastDescription;
    setTitle(currentTitle ?? "");
    setDesc(currentDesc ?? "");
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-900">General settings</h1>
      <p className="text-sm font-semibold text-gray-500 mt-2">
        Control your overall app experience, including appearance, color
        preferences, and how the Studio behaves.
      </p>
      <div className="w-full mt-8 border border-gray-200 rounded-xl p-4">
        <div className="w-full flex items-center justify-between gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Download PNG without hex.
            </h3>
            <p className="text-sm font-semibold text-gray-500">
              Download your palette as a clean PNG image without hex codes,
              perfect for presentations and visual use.
            </p>
          </div>
          <div className="shrink-0">
            <ToggleButton
              isTrue={downloadPngWithoutHex}
              setIsTrue={setDownloadPngWithoutHex}
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-8">Shortcuts</h3>
        <table className="w-full bg-gray-100 rounded-xl mt-3">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-sm font-bold text-gray-900 rounded-tl-xl text-start">
                Key
              </th>
              <th className="p-4 text-sm font-bold text-gray-900 rounded-tr-xl text-start">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                <span className="py-1 px-1.5 rounded-lg bg-white border border-gray-200">
                  Escape
                </span>
              </td>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                Minimize content
              </td>
            </tr>
            <tr>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                <span className="py-1 px-1.5 rounded-lg bg-white border border-gray-200">
                  H
                </span>
              </td>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                Toggle history
              </td>
            </tr>
            <tr>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                <span className="py-1 px-1.5 rounded-lg bg-white border border-gray-200">
                  Enter
                </span>
              </td>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                Generate content
              </td>
            </tr>
            <tr>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                <span className="py-1 px-1.5 rounded-lg bg-white border border-gray-200">
                  ArrowLeft
                </span>
              </td>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                Undo
              </td>
            </tr>
            <tr>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                <span className="py-1 px-1.5 rounded-lg bg-white border border-gray-200">
                  ArrowRight
                </span>
              </td>
              <td className="p-4 text-sm font-semibold text-gray-900 rounded-tl-xl text-start">
                Redo
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold text-gray-900 mt-8">
          Change contrast content
        </h3>
        <p className="text-sm font-semibold text-gray-500 mt-1.5">
          Customize the default title and description used for contrast content.
        </p>
        <div className="mt-3">
          <input
            name="title"
            id="title"
            className="w-full h-12 border-2 border-gray-200 rounded-lg resize-none p-4 text-sm font-semibold text-gray-900 outline-none focus:border-indigo-500"
            placeholder="Contrast title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="title"
            id="title"
            className="w-full mt-3 h-60 border-2 border-gray-200 rounded-lg resize-none p-4 text-sm font-semibold text-gray-900 outline-none focus:border-indigo-500"
            placeholder="Contrast description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="w-full flex items-center justify-end mt-2">
            <Button
              onClick={() => {
                setContrastTitle(title);
                setContrastDescription(desc);
                FlashMessage(
                  "success",
                  "Contrast content updated successfully.",
                );
              }}
              variant={"primary"}
              size={"md"}
            >
              Save Update
            </Button>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-5 mt-8 max-sm:flex-col max-sm:items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Explore palette view.
            </h3>
            <p className="text-sm font-semibold text-gray-500">
              Choose how palettes are displayed by switching between vertical
              and horizontal views.
            </p>
          </div>
          <div className="shrink-0">
            <ExplorePaletteViewMenu />
          </div>
        </div>
        <div className="w-full mt-8 p-4 border border-gray-200 rounded-xl flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-start">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-gray-900">Reset</h3>
            <p className="text-sm font-semibold text-gray-500">
              Restore all your settings to their default state. This will clear
              your saved preferences and filters, giving you a fresh start. Use
              this if you want to remove customizations and return to the
              original experience.
            </p>
          </div>
          <Button
            variant={"primary"}
            size={"md"}
            className="bg-red-500 shrink-0 hover:bg-red-600"
            onClick={() => toggleResetPreferencesModel()}
          >
            Reset Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
