import Accordion from "@/components/client/Accordion";
import CommonHeaderFooterSection from "@/components/server/CommonHeaderFooterSection";
import {
  exportAndUsageQuestions,
  generalQuestions,
  paletteAndColorsQuestions,
  paletteFiltersQuestions,
  settingsAndPreferencesQuestions,
  updateAndAccountsQuestions,
} from "@/utils/Items";

export default function page() {
  return (
    <CommonHeaderFooterSection>
      <div className="w-full h-max max-w-350 mx-auto py-20 max-sm:py-10">
        <h1 className="text-4xl font-bold text-gray-900 text-center">FAQ's</h1>
        <div className="w-full">
          <Accordion
            title="General Questions"
            accordionData={generalQuestions}
          />
          <Accordion
            title="Palettes & Colors"
            accordionData={paletteAndColorsQuestions}
          />
          <Accordion title="Filters" accordionData={paletteFiltersQuestions} />
          <Accordion
            title="Export & Usage"
            accordionData={exportAndUsageQuestions}
          />
          <Accordion
            title="Settings & Preferences"
            accordionData={settingsAndPreferencesQuestions}
          />
          <Accordion
            title="Updates & Account"
            accordionData={updateAndAccountsQuestions}
          />
        </div>
      </div>
    </CommonHeaderFooterSection>
  );
}
