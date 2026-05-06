import { footerSectionItems } from "@/utils/Items";
import { FooterItem } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";
import { Button } from "../Button";
import SupportEmail from "../client/SupportEmail";

const SOCIAL_ICON_STYLE = "size-6";

const FooterLinkItem = ({
  mainTitle,
  items,
}: {
  mainTitle: string;
  items: FooterItem[];
}) => (
  <nav className="w-full" aria-label={mainTitle}>
    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {mainTitle}
    </h3>
    <ul className="flex flex-col gap-3 mt-6">
      {items.map(({ id, title, url }) => (
        <li key={id}>
          <Link href={url} className="transition-colors">
            <Button variant={"textUnderline"} size={"p0"}>
              {title}
            </Button>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default function FooterSection() {
  return (
    <footer className="max-w-350 px-4 mx-auto">
      <div className="w-full grid grid-cols-6 gap-10 py-12 max-lg:grid-cols-3 max-sm:grid-cols-2">
        <div className="w-full">
          <Link href={"/"} aria-label="PalettIQ — Free Color Palette Generator">
            <Image
              src={"/logo.svg"}
              height={50}
              width={50}
              alt="PalettIQ — Color Design Tool"
              priority={false}
            />
          </Link>
          <p className="text-xs font-medium text-gray-500 mt-4">
            A unified color design platform for designers. Generate beautiful
            color palettes, gradients, and more — all free.
          </p>
        </div>
        {footerSectionItems.map((section) => (
          <FooterLinkItem
            key={section.id}
            mainTitle={section.title}
            items={section.data}
          />
        ))}
      </div>
      <div className="w-full border-t py-10 border-gray-200 flex items-center justify-between max-md:flex-col max-md:gap-10">
        <p className="text-sm font-medium text-gray-600">
          © {new Date().getFullYear()} PalettIQ. All rights reserved.
        </p>
        <SupportEmail />
        <div className="flex items-center gap-7">
          <Link href="#" aria-label="Follow PalettIQ on Facebook">
            <LuFacebook
              className={`${SOCIAL_ICON_STYLE} hover:text-blue-600`}
            />
          </Link>
          <Link href="#" aria-label="Follow PalettIQ on Instagram">
            <LuInstagram
              className={`${SOCIAL_ICON_STYLE} hover:text-rose-500`}
            />
          </Link>
          <Link href="#" aria-label="Follow PalettIQ on LinkedIn">
            <LuLinkedin
              className={`${SOCIAL_ICON_STYLE} hover:text-blue-700`}
            />
          </Link>
          <Link href="#" aria-label="Follow PalettIQ on Twitter">
            <LuTwitter className={`${SOCIAL_ICON_STYLE} hover:text-sky-400`} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
