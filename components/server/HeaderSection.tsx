import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { headerLinkItems } from "@/utils/Items";
import HeaderMenu from "../client/HeaderMenu";
import { LuBolt } from "react-icons/lu";

export default function HeaderSection() {
  return (
    <div className="max-w-350 max-2xl:px-4 h-full mx-auto flex items-center justify-between">
      <div className="w-max flex items-center gap-2">
        <Link href="/" aria-label="PalettIQ Home" title="PalettIQ Home">
          <Image
            src="/logo.svg"
            width={30}
            height={30}
            alt="PalettIQ Logo"
            priority
          />
        </Link>

        <span
          className="text-2xl font-semibold text-gray-500"
          aria-hidden="true"
        >
          ~
        </span>

        <nav
          aria-label="Primary site navigation"
          className="flex items-center gap-6.5 ml-2"
        >
          {headerLinkItems.map(({ id, title, url }) => (
            <Link
              key={id}
              href={url}
              title={title}
              className={`${
                [
                  "Browse Gradients",
                  "Browse Color Palettes",
                  "Explore Color Shades",
                ].includes(title)
                  ? "max-lg:hidden"
                  : ""
              }`}
            >
              <Button variant="text" size="p0">
                {title}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="ml-5 hidden max-lg:block max-lg:ml-0">
          <HeaderMenu />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/settings/feedback"
          aria-label="Send feedback about PalettIQ"
          title="Send Feedback"
          className="h-10 px-4 rounded-full text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer border border-white hover:border-gray-200 transition-all active:scale-95 place-content-center max-sm:hidden"
        >
          Feedback
        </Link>

        <Link href="/settings" aria-label="PalettIQ Settings" title="Settings">
          <Button variant="outline" size="md">
            <LuBolt size={16} />
            <span>Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
