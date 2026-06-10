import Link from "next/link";
import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <CommonHeaderFooterSection>
      <main className="w-full min-h-[600px] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-black text-gray-900">
          404 - Page Not Found
        </h1>

        <p className="max-w-xl mt-5 text-gray-600 font-medium">
          The page you are looking for may have been moved, deleted, or never
          existed. Explore PalettIQ's color tools and resources below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link href={"/"}>
            <Button variant={"outline"} size={"md"}>
              Home
            </Button>
          </Link>
          <Link href={"/studio"}>
            <Button variant={"outline"} size={"md"}>
              Color Palette Generator
            </Button>
          </Link>
          <Link href={"/studio/color-palette-visualizer"}>
            <Button variant={"outline"} size={"md"}>
              Color Palette Visualizer
            </Button>
          </Link>
          <Link href={"/explore/palettes"}>
            <Button variant={"outline"} size={"md"}>
              Browse Palettes
            </Button>
          </Link>
          <Link href={"/explore/gradients"}>
            <Button variant={"outline"} size={"md"}>
              Browse Gradients
            </Button>
          </Link>
        </div>
      </main>
    </CommonHeaderFooterSection>
  );
}
