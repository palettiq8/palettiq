import { useVisualizerStore } from "@/libs/stores/dataStore";
import { PaletteColor } from "@/utils/Types";
import { distributePalette } from "@/utils/utils";

export default function Visualize2({ palette }: { palette: PaletteColor[] }) {
  const setVisualizerActiveColor = useVisualizerStore(
    (state) => state.setVisualizerActiveColor,
  );
  const colors = distributePalette(palette, 5);
  const color1 = colors[0]?.color;
  const color2 = colors[1]?.color;
  const color3 = colors[2]?.color;
  const color4 = colors[3]?.color;
  const color5 = colors[4]?.color;
  const clickHandler = (color: string) => {
    setVisualizerActiveColor(color);
  };
  return (
    <svg
      viewBox="0 0 600 387"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <ellipse
        cx="215.624"
        cy="98.3236"
        rx="67.0422"
        ry="67.0394"
        fill={color1}
        onClick={() => clickHandler(color1)}
      />
      <path
        d="M371.454 3.36082L170.287 383.657C169.583 384.989 170.549 386.592 172.055 386.592H572.153C573.656 386.592 574.622 384.997 573.925 383.665L374.994 3.36897C374.247 1.94205 372.207 1.93735 371.454 3.36082Z"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <path
        d="M198.132 197.95L3.62195 383.144C2.3143 384.389 3.1955 386.592 5.00106 386.592H397.192C399.006 386.592 399.883 384.372 398.56 383.133L200.878 197.939C200.105 197.214 198.9 197.219 198.132 197.95Z"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <path
        d="M368.541 195.483L143.879 383.057C142.444 384.255 143.291 386.592 145.161 386.592H594.484C596.354 386.592 597.201 384.255 595.766 383.057L371.104 195.483C370.362 194.864 369.283 194.864 368.541 195.483Z"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <path
        d="M600 386.5L370 194.5L534 386.5H600Z"
        fill={color5}
        onClick={() => clickHandler(color5)}
      />
    </svg>
  );
}
