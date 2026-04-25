import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <div className="w-full min-h-120 h-max grid place-content-center">
        <h1 className="text-4xl font-bold text-gray-800">Content Not Found!</h1>
      </div>
    </CommonHeaderFooterSection>
  );
}
