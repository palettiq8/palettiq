import { Button } from "../Button";
import { FlashMessage } from "@/utils/utils";
import { LuCopy } from "react-icons/lu";

export default function FormatCard({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase text-gray-500">{name}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
      <Button
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          FlashMessage("success", "Copied to the clipboard!");
        }}
        variant={"outline"}
        size={"circle"}
        className="w-10 h-10"
      >
        <LuCopy size={16} />
      </Button>
    </div>
  );
}
