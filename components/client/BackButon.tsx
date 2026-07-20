"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button variant={"outline"} size={"md"} onClick={() => router.back()}>
            <LuChevronLeft size={16} />
            <span>Back</span>
        </Button>
    );
}