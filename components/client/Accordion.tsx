"use client";

import { AccordionDataType } from "@/utils/Types";
import Link from "next/link";
import { useState } from "react";
import { LuArrowUpRight, LuChevronDown } from "react-icons/lu";
import { Button } from "../Button";

export default function Accordion({
  title,
  accordionData,
}: {
  title?: string;
  accordionData: AccordionDataType[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-12 max-xl:px-4">
      <h3 className="text-xs font-semibold text-gray-900">{title}</h3>
      <div className="border border-gray-200 mt-4 rounded-xl overflow-hidden">
        {accordionData.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className={`border-b border-gray-200 last:border-none`}
            >
              <button
                id={`faq-question-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className={`w-full flex justify-between gap-5 p-5 cursor-pointer items-center hover:bg-gray-100 transition-colors text-gray-800 ${
                  isOpen ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-md font-semibold text-start">
                  {item.title}
                </h3>
                <span
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <LuChevronDown size={20} aria-hidden="true" />
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 text-gray-500 text-sm font-semibold border-t border-gray-100 leading-relaxed">
                  {item.content}
                </div>
                {item.title === "How do I create a color palette?" && (
                  <div className="w-full p-5 flex items-center justify-start">
                    <Link href={"/studio"}>
                      <Button variant={"outline"} size={"md"}>
                        <span>Color Palette Generator</span>
                        <LuArrowUpRight size={16} />
                      </Button>
                    </Link>
                  </div>
                )}
                {item.title ===
                  "Can I import colors from an image or external source?" && (
                  <div className="w-full p-5 flex items-center justify-start">
                    <Link href={"/studio/color-extractor"}>
                      <Button variant={"outline"} size={"md"}>
                        <span>Color Extractor</span>
                        <LuArrowUpRight size={16} />
                      </Button>
                    </Link>
                  </div>
                )}
                {(item.title === "How do I search for palettes?" ||
                  item.title === "How can I delete my published palettes?") && (
                  <div className="w-full p-5 flex items-center justify-start">
                    <Link href={"/explore/palettes"}>
                      <Button variant={"outline"} size={"md"}>
                        <span>Explore Palettes</span>
                        <LuArrowUpRight size={16} />
                      </Button>
                    </Link>
                  </div>
                )}
                {item.title === "How do I reset my preferences?" && (
                  <div className="w-full p-5 flex items-center justify-start">
                    <Link href={"/settings"}>
                      <Button variant={"outline"} size={"md"}>
                        <span>Settings</span>
                        <LuArrowUpRight size={16} />
                      </Button>
                    </Link>
                  </div>
                )}
                {item.title === "How do I subscribe to product updates?" && (
                  <div className="w-full p-5 flex items-center justify-start">
                    <Link href={"/settings/updates"}>
                      <Button variant={"outline"} size={"md"}>
                        <span>Go to updates</span>
                        <LuArrowUpRight size={16} />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
