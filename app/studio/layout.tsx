import StudioLeftMenuContent from "@/components/client/StudioLeftMenuContent";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-gray-100 flex gap-4 p-4">
      <div className="w-62 h-full bg-white rounded-xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.1)] shrink-0 max-xl:hidden">
        <StudioLeftMenuContent from="Non-Responsive" />
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
