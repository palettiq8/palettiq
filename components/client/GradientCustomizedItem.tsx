"use client";

import { useGradientStore } from "@/libs/stores/dataStore";
import GradientColorPositionMenu from "./GradientColorPositionMenu";
import { gradientContainerSizes } from "@/utils/Items";
import { ICONBUTTONCOMMONSTYLE } from "@/utils/styles/Classes";
import { ConicType, RadialType } from "@/utils/Types";
import GradientColorRotationMenu from "./GradientColorRotationMenu";

const INPUTCOMMONSTYLE =
  "h-10 px-4 border-y border-gray-200 outline-none text-gray-900 font-semibold text-sm placeholder:text-gray-400 caret-gray-400";

const RadialObjectPosition = ({
  position,
  value,
  activeRadial,
  setValue,
}: {
  position: string;
  value: number;
  activeRadial: RadialType;
  setValue: (radial: RadialType) => void;
}) => {
  return (
    <div className="flex items-center">
      <p
        className={`${ICONBUTTONCOMMONSTYLE} text-sm font-semibold text-gray-900 rounded-l-full`}
      >
        {position}
      </p>
      <input
        type="number"
        value={value}
        min={0}
        placeholder="Number"
        onChange={(e) => {
          const value = Number(e.target.value);
          setValue({ ...activeRadial, [position]: value });
        }}
        className={`${INPUTCOMMONSTYLE} w-18`}
      />
      <p
        className={`${ICONBUTTONCOMMONSTYLE} text-sm font-semibold text-gray-900 rounded-r-full`}
      >
        %
      </p>
    </div>
  );
};

const ConicCenter = ({
  position,
  value,
  activeConic,
  setValue,
}: {
  position: string;
  value: number;
  activeConic: ConicType;
  setValue: (radial: ConicType) => void;
}) => {
  return (
    <div className="flex items-center">
      <p
        className={`${ICONBUTTONCOMMONSTYLE} text-sm font-semibold text-gray-900 rounded-l-full`}
      >
        {position}
      </p>
      <input
        type="number"
        value={value}
        min={0}
        placeholder="Number"
        onChange={(e) => {
          const value = Number(e.target.value);
          setValue({ ...activeConic, [position]: value });
        }}
        className={`${INPUTCOMMONSTYLE} w-18`}
      />
      <p
        className={`${ICONBUTTONCOMMONSTYLE} text-sm font-semibold text-gray-900 rounded-r-full`}
      >
        %
      </p>
    </div>
  );
};

export default function GradientCustomizedItem() {
  const modifyActiveColor = useGradientStore(
    (state) => state.modifyActiveColor,
  );
  const updateGradientStop = useGradientStore(
    (state) => state.updateGradientStop,
  );
  const gradientContainerSize = useGradientStore(
    (state) => state.gradientContainerSize,
  );
  const setGradientContainerSize = useGradientStore(
    (state) => state.setGradientContainerSize,
  );
  const gradientCornerRadius = useGradientStore(
    (state) => state.gradientCornerRadius,
  );
  const setGradientCornerRadius = useGradientStore(
    (state) => state.setGradientCornerRadius,
  );
  const activeGradientType = useGradientStore(
    (state) => state.activeGradientType,
  );
  const setActiveGradientType = useGradientStore(
    (state) => state.setActiveGradientType,
  );
  const activeRadial = useGradientStore((state) => state.activeRadial);
  const setActiveRadial = useGradientStore((state) => state.setActiveRadial);
  const activeConic = useGradientStore((state) => state.activeConic);
  const setActiveConic = useGradientStore((state) => state.setActiveConic);
  const gradientRotationValue = useGradientStore(
    (state) => state.gradientRotationValue,
  );
  const setGradientRotationValue = useGradientStore(
    (state) => state.setGradientRotationValue,
  );
  const gradientsTypes = ["Linear", "Radial", "Conic"];
  const radialShapes = ["circle", "ellipse"];
  const radialObjectPositions = [
    { position: "x", value: activeRadial.x },
    { position: "y", value: activeRadial.y },
  ];
  const conicCenters = [
    { position: "x", value: activeConic.x },
    { position: "y", value: activeConic.y },
  ];

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <p className={`text-md font-semibold text-gray-900`}>Position</p>
        <div className="flex items-center">
          <input
            type="number"
            value={modifyActiveColor.position}
            min={0}
            max={100}
            placeholder="Number"
            onChange={(e) => {
              const value = e.target.value;
              updateGradientStop(modifyActiveColor.id, value, "position");
            }}
            className={`${INPUTCOMMONSTYLE} border-l rounded-l-full w-20`}
          />
          <GradientColorPositionMenu />
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-3">
        <p className={`text-md font-semibold text-gray-900`}>Container Size</p>
        <div className="w-full flex items-center gap-2">
          {gradientContainerSizes.map((item, index) => {
            const isMatch = gradientContainerSize.content === item.content;
            return (
              <button
                onClick={() => setGradientContainerSize(item)}
                key={index}
                className={`w-full shadow-inner text-center border text-sm font-semibold py-3 rounded-lg cursor-pointer transition-all active:scale-90 ${isMatch ? "border-gray-200 text-gray-900 bg-gray-100" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"}`}
              >
                {item.content}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className={`text-md font-semibold text-gray-900`}>Corner Radius</p>
        <div className="flex items-center">
          <input
            type="number"
            value={gradientCornerRadius}
            min={0}
            placeholder="Number"
            onChange={(e) => {
              const value = Number(e.target.value);
              setGradientCornerRadius(value);
            }}
            className={`${INPUTCOMMONSTYLE} border-l rounded-l-full w-25`}
          />
          <p
            className={`${ICONBUTTONCOMMONSTYLE} text-sm font-semibold text-gray-900 rounded-r-full`}
          >
            px
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <p className={`text-md font-semibold text-gray-900`}>Gradient Type</p>
        <div className="flex items-center border border-gray-200 rounded-full p-1">
          {gradientsTypes.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => setActiveGradientType(_)}
                className={`h-10 px-4 text-sm font-semibold border rounded-full ${activeGradientType === _ ? "bg-gray-100 border-gray-200 text-gray900" : "bg-white border-white text-gray-900"} cursor-pointer transition-all`}
              >
                {_}
              </button>
            );
          })}
        </div>
      </div>
      {activeGradientType === "Radial" && (
        <>
          <div className="w-full flex items-center justify-between">
            <p className={`text-md font-semibold text-gray-900`}>
              Radial Shape
            </p>
            <div className="flex items-center border border-gray-200 rounded-full p-1">
              {radialShapes.map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() =>
                      setActiveRadial({
                        shape: _,
                        x: 50,
                        y: 50,
                      })
                    }
                    className={`h-10 px-4 text-sm font-semibold border rounded-full ${activeRadial.shape === _ ? "bg-gray-100 border-gray-200 text-gray900" : "bg-white border-white text-gray-900"} cursor-pointer transition-all capitalize`}
                  >
                    {_}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className={`text-md font-semibold text-gray-900`}>
              Object Position
            </p>
            <div className="flex items-center gap-2">
              {radialObjectPositions.map(({ position, value }, index) => (
                <RadialObjectPosition
                  key={index}
                  position={position}
                  value={value}
                  activeRadial={activeRadial}
                  setValue={setActiveRadial}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {activeGradientType === "Conic" && (
        <div className="w-full flex items-center justify-between">
          <p className={`text-md font-semibold text-gray-900`}>Conic Center</p>
          <div className="flex items-center gap-2">
            {conicCenters.map(({ position, value }, index) => (
              <ConicCenter
                key={index}
                position={position}
                value={value}
                activeConic={activeConic}
                setValue={setActiveConic}
              />
            ))}
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-between">
        <p className={`text-md font-semibold text-gray-900`}>Rotation</p>
        <div className="flex items-center">
          <input
            type="number"
            value={gradientRotationValue}
            min={0}
            max={360}
            placeholder="Number"
            onChange={(e) => {
              const value = e.target.value;
              setGradientRotationValue(value);
            }}
            className={`${INPUTCOMMONSTYLE} border-l rounded-l-full w-20`}
          />
          <GradientColorRotationMenu />
        </div>
      </div>
    </>
  );
}
