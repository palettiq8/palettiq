"use client";

import { useGeneratorStore } from "@/libs/stores/dataStore";
import { preferredColors } from "@/utils/Items";
import { FlashMessage } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { LuCheck } from "react-icons/lu";
import { Button } from "../Button";

const ColorItems = ({
  preferredItems,
  setPreferredItems,
}: {
  preferredItems: string[];
  setPreferredItems: (item: string) => void;
}) => {
  return (
    <>
      {preferredColors.map((color, index) => {
        const isExist = preferredItems.includes(color.name);
        return (
          <button
            type="button"
            key={index}
            onClick={() => setPreferredItems(color.name)}
            className={`w-full cursor-pointer active:scale-95 transition-all py-3 pl-3 pr-4 rounded-full bg-white border ${isExist ? "border-gray-300" : "border-gray-200"} flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: color.hex }}
              ></div>
              <p className="text-md max-sm:text-sm font-semibold">
                {color.name}
              </p>
            </div>
            {isExist && <LuCheck size={18} />}
          </button>
        );
      })}
    </>
  );
};

export default function HomeColorFamilySection() {
  const preferredItems = useGeneratorStore((state) => state.preferredItems);
  const setPreferredItems = useGeneratorStore(
    (state) => state.setPreferredItems,
  );
  const clearPreferredItems = useGeneratorStore(
    (state) => state.clearPreferredItems,
  );
  const setGeneratedPalette = useGeneratorStore(
    (state) => state.setGeneratedPalette,
  );
  const router = useRouter();
  const generatePaletteHandler = async () => {
    try {
      if (preferredItems.length === 0) {
        FlashMessage("error", "Select at-least one color!");
        return;
      } else {
        setGeneratedPalette();
        router.push("/studio");
      }
    } catch (error: any) {
      FlashMessage(
        "error",
        "Something went to wrong when generating palette from home selection!",
      );
    }
  };
  return (
    <section className="max-w-350 mx-auto flex justify-between mt-15 bg-white border border-gray-200 rounded-xl px-6 py-8">
      <div className="w-full flex flex-col items-start justify-between">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-900">
            Generate Color Palettes From Your Preferred Colors
          </h2>
          <p className="text-sm font-semibold text-gray-800 mt-4 max-w-150 max-2xl:max-w-130">
            Select one or more preferred colors and instantly generate
            harmonious, design-ready color palettes tailored to your vision.
            PalettIQ generates color combinations for branding, UI design,
            websites, and digital products around your selected colors.
          </p>
          <div className="w-full hidden max-xl:block mt-8">
            <div className="w-full h-full grid grid-cols-3 gap-1 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2">
              <ColorItems
                preferredItems={preferredItems}
                setPreferredItems={setPreferredItems}
              />
            </div>
          </div>
          <div className="flex items-center mt-5">
            {preferredItems.map((item, index) => {
              const color = preferredColors.find((c) => c.name === item);
              return (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 border-gray-50 ${index !== 0 && "-ml-2"}`}
                  style={{ backgroundColor: color?.hex ?? item }}
                />
              );
            })}
            <span
              className={`text-sm font-semibold text-gray-900 ${preferredItems.length > 0 && "ml-2.5"}`}
            >
              +{preferredColors.length - preferredItems.length} colors available
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-3">
          <Button
            onClick={() => generatePaletteHandler()}
            variant={"primary"}
            size={"lg"}
          >
            😍 Generate Palette
          </Button>
          <Button
            onClick={() => clearPreferredItems()}
            variant={"distrcutiveText"}
            size={"p0"}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-3 gap-1 max-xl:hidden">
        <ColorItems
          preferredItems={preferredItems}
          setPreferredItems={setPreferredItems}
        />
      </div>
    </section>
  );
}
