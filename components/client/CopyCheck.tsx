import { Dispatch, SetStateAction, useEffect } from "react";
import { LuCheck, LuCopy } from "react-icons/lu";

export default function CopyCheck({
  content,
  copied,
  setCopied,
}: {
  content: string;
  copied: string;
  setCopied: Dispatch<SetStateAction<string>>;
}) {
  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const isShown = copied === content && content !== "";

  return <>{isShown ? <LuCheck size={16} /> : <LuCopy size={16} />}</>;
}
