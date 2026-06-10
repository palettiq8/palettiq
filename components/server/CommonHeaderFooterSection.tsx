import HeaderSection from "@/components/server/HeaderSection";
import FooterSection from "@/components/server/FooterSection";

export default function CommonHeaderFooterSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:border"
      >
        Skip to main content
      </a>

      <header className="w-full bg-white/90 backdrop-blur-lg h-15 border-b border-gray-200 sticky top-0 z-30">
        <HeaderSection />
      </header>

      <main id="main-content" className="w-full h-full graydotbg">
        {children}
      </main>

      <footer className="w-full bg-white border-t border-gray-200">
        <FooterSection />
      </footer>
    </div>
  );
}
