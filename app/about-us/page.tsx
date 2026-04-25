import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <div className="w-full min-h-120 h-max grid place-content-center">
        <h1 className="text-md font-semibold text-gray-900">About us</h1>
      </div>
    </CommonHeaderFooterSection>
  );
}
