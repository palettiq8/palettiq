import { footerSectionItems } from "@/utils/Items";
import { FooterItem } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";
import { LuFacebook, LuInstagram, LuLinkedin } from "react-icons/lu";
import { Button } from "../Button";
import SupportEmail from "../client/SupportEmail";
import { FaXTwitter } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";

const SocialIconStyle =
  "w-10 h-10 rounded-full border border-white grid place-content-center hover:bg-gray-100 transition-all hover:border-gray-200";

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
          <Link
            href={url}
            className="transition-colors"
            target={
              ["Pinterest", "Reddit", "Twitter / X", "Facebook"].includes(title)
                ? "_blank"
                : "_self"
            }
          >
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
          <p className="max-w-35 leading-8 text-sm font-semibold text-gray-900 mt-4">
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
          ©{new Date().getFullYear()} PalettIQ. All rights reserved.
        </p>
        <SupportEmail />
        <div className="flex items-center gap-3">
          <Link
            href="https://x.com/palettiq"
            target="_blank"
            aria-label="Follow PalettIQ on Twitter"
            className={SocialIconStyle}
          >
            <FaXTwitter size={22} />
          </Link>
          <Link
            href="https://www.pinterest.com/palettiq8/_created/"
            target="_blank"
            aria-label="Follow PalettIQ on Pinterest"
            className={SocialIconStyle}
          >
            <ImPinterest2 size={22} />
          </Link>
          <Link
            href="https://www.instagram.com/palett.iq/"
            target="_blank"
            aria-label="Follow PalettIQ on Instagram"
            className={SocialIconStyle}
          >
            <LuInstagram size={22} />
          </Link>
          <Link
            href="https://www.linkedin.com/company/palettiq/"
            target="_blank"
            aria-label="Follow PalettIQ on LinkedIn"
            className={SocialIconStyle}
          >
            <LuLinkedin size={22} />
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61589009866760/"
            target="_blank"
            aria-label="Follow PalettIQ on Facebook"
            className={SocialIconStyle}
          >
            <LuFacebook size={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
