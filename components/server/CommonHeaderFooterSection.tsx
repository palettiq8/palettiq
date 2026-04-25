import HeaderSection from "@/components/server/HeaderSection";
import FooterSection from "@/components/server/FooterSection";

export default function CommonHeaderFooterSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-max bg-white">
      <header className="w-full bg-white/10 backdrop-blur-lg h-15 border-b border-gray-200 sticky top-0 z-30">
        <HeaderSection />
      </header>
      <section className="w-full h-full bg-white">{children}</section>
      <section className="w-full h-max bg-white border-t border-gray-200">
        <FooterSection />
      </section>
    </div>
  );
}
