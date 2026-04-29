import StudioLeftFooterMenu from "./StudioLeftFooterMenu";
import StudioLeftMenuContainer from "./StudioLeftMenuContainer";
import StudioLeftMenuHeader from "./StudioLeftMenuHeader";

export default function StudioLeftMenuContent({from}: {from: string}) {
  return (
    <>
      <StudioLeftMenuHeader from={from} />
      <StudioLeftMenuContainer />
      <div className="w-full h-16 border-t border-gray-200 flex items-center px-4">
        <StudioLeftFooterMenu />
      </div>
    </>
  );
}
