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
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
      {mainTitle}
    </p>
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
    <div className="max-w-350 px-4 mx-auto">
      <div className="w-full grid grid-cols-6 gap-10 py-12 max-lg:grid-cols-3 max-sm:grid-cols-2">
        <div className="w-full">
          <Link href={"/"}>
            <Image
              src={"/logo_50.svg"}
              height={50}
              width={50}
              alt="PalettIQ Logo"
              priority={false}
            />
          </Link>
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
          <Link href="#" aria-label="Facebook">
            <LuFacebook
              className={`${SOCIAL_ICON_STYLE} hover:text-blue-600`}
            />
          </Link>
          <Link href="#" aria-label="Instagram">
            <LuInstagram
              className={`${SOCIAL_ICON_STYLE} hover:text-rose-500`}
            />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <LuLinkedin
              className={`${SOCIAL_ICON_STYLE} hover:text-blue-700`}
            />
          </Link>
          <Link href="#" aria-label="Twitter">
            <LuTwitter className={`${SOCIAL_ICON_STYLE} hover:text-sky-400`} />
          </Link>
        </div>
      </div>
    </div>
  );
}
