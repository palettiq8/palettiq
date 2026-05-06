"use client";

import Image from "next/image";
import { Button } from "../Button";
import { LuCornerUpLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useModelStore from "@/libs/stores/modelStore";

export default function StudioLeftMenuHeader({ from }: { from: string }) {
  const router = useRouter();
  const toggleStudioLeftMenuModel = useModelStore(
    (state) => state.toggleStudioLeftMenuModel,
  );
  return (
    <div className="w-full px-4 h-16 border-b border-gray-200 flex items-center justify-between">
      <Link
        href={"/"}
        onClick={() => {
          if (from === "Responsive") {
            toggleStudioLeftMenuModel();
          }
        }}
      >
        <Image
          src={"/studio_logo.svg"}
          width={101}
          height={30}
          alt="studio logo"
          priority
        />
      </Link>
      <Button
        onClick={() => {
          router.back();
          if (from === "Responsive") {
            toggleStudioLeftMenuModel();
          }
        }}
        variant={"text"}
        size={"p0"}
      >
        <LuCornerUpLeft size={18} />
      </Button>
    </div>
  );
}
