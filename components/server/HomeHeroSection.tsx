import Link from "next/link";
import { Button } from "../Button";

export default function HomeHeroSection() {
  return (
    <section className="max-w-350 mx-auto">
      <span className="text-sm max-sm:text-xs font-bold text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-3.5 py-1.5 w-max mx-auto block">
        A Unified Color Design Platform for Designers
      </span>
      <h1 className="text-7xl font-black text-gray-900 text-center mt-8 max-sm:text-5xl leading-20 max-sm:leading-13">
        <span className="text-indigo-500">Generate Color Palettes</span> <br />{" "}
        From Your Selected Colors
      </h1>
      <p className="max-w-148 text-lg max-md:text-base font-semibold text-gray-800 mt-8 mx-auto text-center max-sm:mt-5">
        Generate personalized color palettes from your selected colors and
        harmonies. Control hue, saturation, and lightness to create accessible
        color schemes for branding, UI design, websites, mobile apps, and
        digital products.
      </p>
      <div className="w-full flex items-center justify-center gap-3 mt-8">
        <Link
          href="/studio"
          className="rounded-full bg-linear-to-r from-indigo-500 to-orange-500 p-1 h-14"
          aria-label="Open PalettIQ Studio to generate a custom color palette"
        >
          <Button
            variant={"primary"}
            size={"lg"}
            className="-mt-1.5 hover:mt-0 transition-all shadow-2xl shadow-red-300"
          >
            Get Started Free →
          </Button>
        </Link>
      </div>
    </section>
  );
}
