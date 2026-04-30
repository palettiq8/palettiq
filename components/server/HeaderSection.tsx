import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { headerLinkItems } from "@/utils/Items";
import HeaderMenu from "../client/HeaderMenu";
import { LuBolt } from "react-icons/lu";

export default function HeaderSection() {
  return (
    <div className="w-full px-4 h-full mx-auto flex items-center justify-between">
      <div className="w-max h-max flex items-center gap-1">
        <Link href={"/"} className="w-auto h-auto">
          <Image
            src={"/logo_50.svg"}
            height={35}
            width={35}
            alt="header logo"
            priority
          />
        </Link>
        <span className="text-2xl font-semibold text-gray-500">~</span>
        <div className="flex items-center gap-6.5 ml-2">
          {headerLinkItems.map(({ id, title, url }) => {
            return (
              <Link
                href={url}
                key={id}
                className={`${["Gradients"].includes(title) && "max-md:hidden"} ${["Palettes", "Colors"].includes(title) && "max-sm:hidden"}`}
              >
                <Button variant={"text"} size={"p0"}>
                  {title}
                </Button>
              </Link>
            );
          })}
        </div>
        <div className="ml-5 hidden max-md:block max-sm:ml-0">
          <HeaderMenu />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={"/settings/feedback"}
          className="h-10 px-4 rounded-full text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer border border-white hover:border-gray-200 transition-all active:scale-95 place-content-center max-sm:hidden"
        >
          Feedback
        </Link>
        <Link href={"/settings"}>
          <Button variant={"outline"} size={"md"}>
            <LuBolt size={16} />
            <span>Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
