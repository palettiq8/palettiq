"use client";
import Link from "next/link";
import { Button } from "../Button";
import { features, preferredColors } from "@/utils/Items";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import { useGeneratorStore } from "@/libs/stores/dataStore";
import { FlashMessage } from "@/utils/utils";
import { useRouter } from "next/navigation";

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
          <div
            key={index}
            onClick={() => setPreferredItems(color.name)}
            className={`w-full cursor-pointer active:scale-95 transition-all py-3 pl-3 pr-4 rounded-full bg-white border ${isExist ? "border-gray-300" : "border-gray-200"} flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: color.hex }}
              ></div>
              <p className="text-md max-sm:text-sm font-semibold text-semibold">
                {color.name}
              </p>
            </div>
            {isExist && <LuCheck size={18} />}
          </div>
        );
      })}
    </>
  );
};

export default function BodySection() {
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
    <div className="w-full py-13 max-sm:py-8 px-4">
      <p className="text-sm max-sm:text-xs font-bold text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-3.5 py-1.5 w-max mx-auto">
        A Unified platform for all your color needs.
      </p>
      <h1 className="text-6xl font-black text-gray-900 text-center mt-8 max-sm:text-5xl max-sm:mt-6">
        <span className="text-indigo-500">Deep Selection</span> & Detailed
        Palettes.
      </h1>
      <h1 className="text-6xl font-black text-gray-900 text-center mt-8 max-sm:text-5xl max-sm:mt-0">
        For Digital Products.
      </h1>
      <h3 className="max-w-148 text-lg max-md:text-base font-semibold text-gray-800 mt-8 mx-auto text-center max-sm:mt-5">
        Take control of your colors with a simple property-based system. Easily
        pick segments, build custom palettes, and speed up your design process
        with everything in one place.
      </h3>
      <div className="w-full flex items-center justify-center gap-3 mt-8">
        <Link href={"/studio"}>
          <Button variant={"primary"} size={"lg"}>
            Generate Color Palette
          </Button>
        </Link>
      </div>
      <div className="max-w-380 mx-auto grid grid-cols-4 gap-1 mt-12 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {features.map(({ title, desc, url, urlTitle, oneBgColor }, index) => {
          return (
            <div
              key={index}
              className={`w-full rounded-xl bg-gray-100 p-6 border border-gray-200`}
            >
              <h4 className="text-2xl font-bold text-gray-900">{title}</h4>
              <p className="text-sm font-semibold text-gray-700 mt-3">{desc}</p>
              <Link
                href={url}
                className={`group w-max mt-12 text-sm font-semibold rounded-full flex items-center justify-center gap-1 h-10 px-4 ${oneBgColor} active:scale-95 text-gray-900 transition-all`}
              >
                <span>{urlTitle}</span>
                <LuArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="max-w-380 mx-auto flex justify-between mt-15 bg-gray-100 border border-gray-200 rounded-xl p-6">
        <div className="w-full flex flex-col items-start justify-between">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900">
              Choose Your Colors
            </h1>
            <p className="text-sm font-semibold text-gray-800 mt-4 max-w-150 max-2xl:max-w-130">
              Take control of your palette creation by selecting the colors you
              love most. With “Choose Your Colors,” you can define your
              preferred shades as a starting point, and the system will
              intelligently generate harmonious palettes around them. Whether
              you’re working with a single base color or multiple favorites,
              this feature ensures every generated palette reflects your
              personal style and creative intent.
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
                return (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full border-2 border-gray-50 ${index !== 0 && "-ml-2"}`}
                    style={{ backgroundColor: item }}
                  ></div>
                );
              })}
              <span className="text-sm font-semibold text-gray-900">
                +{preferredColors.length - preferredItems.length}
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
      </div>
    </div>
  );
}
