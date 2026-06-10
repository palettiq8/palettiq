import { features } from "@/utils/Items";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

export default function HomeFeaturesSection() {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-900">
        Professional Color Tools for Designers and Developers
      </h2>
      <div className="max-w-350 mx-auto grid grid-cols-4 gap-1 mt-12 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {features
          .slice(0, 4)
          .map(({ title, desc, url, urlTitle, oneBgColor }, index) => {
            return (
              <article
                key={index}
                className={`w-full rounded-xl h-60 bg-white border border-gray-200 p-6 flex flex-col items-start justify-between`}
              >
                <div className="w-full flex flex-col items-start gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="text-sm font-semibold text-gray-700">{desc}</p>
                </div>
                <Link
                  href={url}
                  aria-label={`Open ${title} tool`}
                  className={`group w-max text-sm font-semibold rounded-full flex items-center justify-center gap-1 h-10 px-4 ${oneBgColor} active:scale-95 text-gray-900 transition-all`}
                >
                  <span>{urlTitle}</span>
                  <LuArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </article>
            );
          })}
      </div>
      <div className="max-w-350 mx-auto grid grid-cols-3 gap-1 mt-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {features
          .slice(4, 7)
          .map(({ title, desc, url, urlTitle, oneBgColor }, index) => {
            return (
              <article
                key={index}
                className={`w-full rounded-xl h-60 bg-white border border-gray-200 p-6 flex flex-col items-start justify-between`}
              >
                <div className="w-full flex flex-col items-start gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="text-sm font-semibold text-gray-700">{desc}</p>
                </div>
                <Link
                  href={url}
                  aria-label={`Open ${title} tool`}
                  className={`group w-max text-sm font-semibold rounded-full flex items-center justify-center gap-1 h-10 px-4 ${oneBgColor} active:scale-95 text-gray-900 transition-all`}
                >
                  <span>{urlTitle}</span>
                  <LuArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </article>
            );
          })}
      </div>
    </section>
  );
}
