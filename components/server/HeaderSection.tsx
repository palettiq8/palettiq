import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { headerLinkItems } from "@/utils/Items";
import HeaderMenu from "../client/HeaderMenu";
import { LuBolt } from "react-icons/lu";

export default function HeaderSection() {
  return (
    <div className="max-w-380 max-2xl:px-4 h-full mx-auto flex items-center justify-between">
      <div className="w-max h-max flex items-center gap-2">
        <Link
          href={"/"}
          aria-label="PalettIQ — Free Color Palette Generator"
          className="w-auto h-auto"
        >
          <Image
            src={"/logo.svg"}
            height={30}
            width={30}
            alt="PalettIQ — Color Design Tool"
            priority
          />
        </Link>
        <span className="text-2xl font-semibold text-gray-500">~</span>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-6.5 ml-2"
        >
          {headerLinkItems.map(({ id, title, url }) => {
            return (
              <Link
                href={url}
                key={id}
                className={`${["Explore Gradients", "Color Palettes", "Color Shades Explorer"].includes(title) && "max-md:hidden"}`}
              >
                <Button variant={"text"} size={"p0"}>
                  {title}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="ml-5 hidden max-md:block max-md:ml-0">
          <HeaderMenu />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={"/settings/feedback"}
          aria-label="Send feedback about PalettIQ"
          className="h-10 px-4 rounded-full text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer border border-white hover:border-gray-200 transition-all active:scale-95 place-content-center max-sm:hidden"
        >
          Feedback
        </Link>
        <Link href={"/settings"} aria-label="PalettIQ Settings">
          <Button variant={"outline"} size={"md"}>
            <LuBolt size={16} />
            <span>Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
