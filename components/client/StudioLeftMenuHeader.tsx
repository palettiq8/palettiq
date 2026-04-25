"use client";

import Image from "next/image";
import { Button } from "../Button";
import { LuCornerUpLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudioLeftMenuHeader() {
  const router = useRouter();
  return (
    <div className="w-full px-4 h-16 border-b border-gray-200 flex items-center justify-between">
      <Link href={"/"}>
        <Image
          src={"/studio_logo.svg"}
          width={81}
          height={24}
          alt="studio logo"
        />
      </Link>
      <Button onClick={() => router.back()} variant={"text"} size={"p0"}>
        <LuCornerUpLeft size={18} />
      </Button>
    </div>
  );
}
