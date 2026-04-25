export default function ToggleButton({
  isTrue,
  setIsTrue,
}: {
  isTrue: boolean;
  setIsTrue: () => void;
}) {
  return (
    <div
      onClick={setIsTrue}
      className={`w-10 hover:cursor-pointer p-1.5 transition-all ${
        isTrue ? "bg-indigo-500" : "bg-gray-300"
      } rounded-full`}
    >
      <div
        className={`w-3.5 h-3.5 ${
          isTrue && "translate-x-3.5"
        } transition-all rounded-full bg-white`}
      ></div>
    </div>
  );
}
