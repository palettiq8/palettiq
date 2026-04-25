import { useVisualizerStore } from "@/libs/stores/dataStore";
import { PaletteColor } from "@/utils/Types";
import { checkIsLight, distributePalette } from "@/utils/utils";

export default function Visualize5({ palette }: { palette: PaletteColor[] }) {
  const setVisualizerActiveColor = useVisualizerStore(
    (state) => state.setVisualizerActiveColor,
  );
  const colors = distributePalette(palette, 4);
  const color1 = colors[0]?.color;
  const color2 = colors[1]?.color;
  const color3 = colors[2]?.color;
  const color4 = colors[3]?.color;
  const clickHandler = (color: string) => {
    setVisualizerActiveColor(color);
  };
  return (
    <svg
      viewBox="0 0 633 439"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0.5" y="0.5" width="632" height="438" rx="11.5" fill="white" />
      <rect
        x="0.5"
        y="0.5"
        width="632"
        height="438"
        rx="11.5"
        stroke="#E5E7EB"
        strokeWidth="1"
        fill="none"
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="24"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="24" y="57.2273">
          Collaborators
        </tspan>
      </text>
      <rect
        x="508"
        y="27"
        width="100"
        height="44"
        rx="22"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <text
        fill={checkIsLight(color4) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="528.718" y="56.4545">
          View All
        </tspan>
      </text>
      <rect x="24" y="87" width="585" height="73" rx="12" fill="#F2F2F2" />
      <circle cx="62" cy="123" r="22" fill="white" />
      <path
        d="M69.334 134.152H54.6673C54.2784 134.152 53.9053 133.998 53.6303 133.723C53.3552 133.448 53.2007 133.075 53.2007 132.686C53.2007 131.501 53.5623 130.344 54.2372 129.371C54.9121 128.397 55.868 127.653 56.9773 127.237L57.4283 127.068C60.3764 125.963 63.6249 125.963 66.573 127.068L67.024 127.237C68.1333 127.653 69.0893 128.397 69.7642 129.371C70.439 130.344 70.8006 131.501 70.8007 132.686C70.8007 133.075 70.6462 133.448 70.3711 133.723C70.096 133.998 69.723 134.152 69.334 134.152Z"
        fill={color1}
        onClick={() => setVisualizerActiveColor(color1)}
        stroke={color1}
        className="opacity-60"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M59.7633 122.737C60.4318 123.08 61.1703 123.265 61.9217 123.277C62.6731 123.289 63.4171 123.127 64.0961 122.806C64.7751 122.484 65.3709 122.01 65.8372 121.42C66.3035 120.831 66.6278 120.142 66.785 119.407L66.8668 119.025C67.0219 118.299 67.0201 117.548 66.8613 116.823C66.7026 116.098 66.3907 115.415 65.9464 114.82L65.8144 114.644C65.3709 114.051 64.7951 113.57 64.1328 113.238C63.4705 112.906 62.74 112.733 61.9993 112.733C61.2586 112.733 60.528 112.906 59.8658 113.238C59.2035 113.57 58.6277 114.051 58.1841 114.644L58.0521 114.82C57.6079 115.415 57.296 116.098 57.1373 116.823C56.9786 117.548 56.9767 118.298 57.1318 119.024L57.2135 119.408C57.3653 120.117 57.6728 120.783 58.1137 121.359C58.5546 121.935 59.1179 122.406 59.763 122.737"
        fill={color1}
        stroke={color1}
        onClick={() => setVisualizerActiveColor(color1)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="103" y="129.318">
          Muhammad.
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="446" y="130.591">
          Accepted
        </tspan>
      </text>
      <circle
        cx="430.5"
        cy="126.5"
        r="4.5"
        fill={color1}
        onClick={() => setVisualizerActiveColor(color1)}
      />
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="545.568" y="130.591">
          18 Dec
        </tspan>
      </text>
      <rect
        x="24"
        y="171"
        width="585"
        height="73"
        rx="12"
        fill={color4}
        onClick={() => setVisualizerActiveColor(color4)}
      />
      <circle
        cx="62"
        cy="207"
        r="22"
        fill={checkIsLight(color2) ? "black" : "white"}
        className="opacity-30"
      />
      <path
        d="M69.334 218.152H54.6673C54.2784 218.152 53.9053 217.998 53.6303 217.723C53.3552 217.448 53.2007 217.075 53.2007 216.686C53.2007 215.501 53.5623 214.344 54.2372 213.371C54.9121 212.397 55.868 211.653 56.9773 211.237L57.4283 211.068C60.3764 209.963 63.6249 209.963 66.573 211.068L67.024 211.237C68.1333 211.653 69.0893 212.397 69.7642 213.371C70.439 214.344 70.8006 215.501 70.8007 216.686C70.8007 217.075 70.6462 217.448 70.3711 217.723C70.096 217.998 69.723 218.152 69.334 218.152Z"
        fill={color2}
        stroke={color2}
        onClick={() => setVisualizerActiveColor(color2)}
        className="opacity-60"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M59.7633 206.737C60.4318 207.08 61.1703 207.265 61.9217 207.277C62.6731 207.289 63.4171 207.127 64.0961 206.806C64.7751 206.484 65.3709 206.01 65.8372 205.42C66.3035 204.831 66.6278 204.142 66.785 203.407L66.8668 203.025C67.0219 202.299 67.0201 201.548 66.8613 200.823C66.7026 200.098 66.3907 199.415 65.9464 198.82L65.8144 198.644C65.3709 198.051 64.7951 197.57 64.1328 197.238C63.4705 196.906 62.74 196.733 61.9993 196.733C61.2586 196.733 60.528 196.906 59.8658 197.238C59.2035 197.57 58.6277 198.051 58.1841 198.644L58.0521 198.82C57.6079 199.415 57.296 200.098 57.1373 200.823C56.9786 201.548 56.9767 202.298 57.1318 203.024L57.2135 203.408C57.3653 204.117 57.6728 204.783 58.1137 205.359C58.5546 205.935 59.1179 206.406 59.763 206.737"
        fill={color2}
        stroke={color2}
        onClick={() => setVisualizerActiveColor(color2)}
      />
      <text
        fill={checkIsLight(color4) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="103" y="213.318">
          Ahmad.
        </tspan>
      </text>
      <text
        fill={checkIsLight(color4) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="446" y="214.591">
          Pending
        </tspan>
      </text>
      <circle
        cx="430.5"
        cy="210.5"
        r="4.5"
        fill={color2}
        onClick={() => setVisualizerActiveColor(color2)}
      />
      <text
        fill={checkIsLight(color4) ? "#6A7282" : "#D1D5DC"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="545.568" y="214.591">
          18 Dec
        </tspan>
      </text>
      <rect x="24" y="256" width="584" height="73" rx="12" fill="#F2F2F2" />
      <circle cx="62" cy="291" r="22" fill="white" />
      <path
        d="M69.334 302.152H54.6673C54.2784 302.152 53.9053 301.998 53.6303 301.723C53.3552 301.448 53.2007 301.075 53.2007 300.686C53.2007 299.501 53.5623 298.344 54.2372 297.371C54.9121 296.397 55.868 295.653 56.9773 295.237L57.4283 295.068C60.3764 293.963 63.6249 293.963 66.573 295.068L67.024 295.237C68.1333 295.653 69.0893 296.397 69.7642 297.371C70.439 298.344 70.8006 299.501 70.8007 300.686C70.8007 301.075 70.6462 301.448 70.3711 301.723C70.096 301.998 69.723 302.152 69.334 302.152Z"
        fill={color1}
        stroke={color1}
        onClick={() => setVisualizerActiveColor(color1)}
        className="opacity-60"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M59.7633 290.737C60.4318 291.08 61.1703 291.265 61.9217 291.277C62.6731 291.289 63.4171 291.127 64.0961 290.806C64.7751 290.484 65.3709 290.01 65.8372 289.42C66.3035 288.831 66.6278 288.142 66.785 287.407L66.8668 287.025C67.0219 286.299 67.0201 285.548 66.8613 284.823C66.7026 284.098 66.3907 283.415 65.9464 282.82L65.8144 282.644C65.3709 282.051 64.7951 281.57 64.1328 281.238C63.4705 280.906 62.74 280.733 61.9993 280.733C61.2586 280.733 60.528 280.906 59.8658 281.238C59.2035 281.57 58.6277 282.051 58.1841 282.644L58.0521 282.82C57.6079 283.415 57.296 284.098 57.1373 284.823C56.9786 285.548 56.9767 286.298 57.1318 287.024L57.2135 287.408C57.3653 288.117 57.6728 288.783 58.1137 289.359C58.5546 289.935 59.1179 290.406 59.763 290.737"
        fill={color1}
        stroke={color1}
        onClick={() => setVisualizerActiveColor(color1)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="103" y="297.318">
          Yusuf.
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="446" y="298.591">
          Accepted
        </tspan>
      </text>
      <circle
        cx="430.5"
        cy="294.5"
        r="4.5"
        fill={color1}
        onClick={() => setVisualizerActiveColor(color1)}
      />
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="545.568" y="298.591">
          18 Dec
        </tspan>
      </text>
      <rect x="24" y="339" width="584" height="73" rx="12" fill="#F2F2F2" />
      <circle cx="62" cy="375" r="22" fill="white" />
      <path
        d="M69.334 386.152H54.6673C54.2784 386.152 53.9053 385.998 53.6303 385.723C53.3552 385.448 53.2007 385.075 53.2007 384.686C53.2007 383.501 53.5623 382.344 54.2372 381.371C54.9121 380.397 55.868 379.653 56.9773 379.237L57.4283 379.068C60.3764 377.963 63.6249 377.963 66.573 379.068L67.024 379.237C68.1333 379.653 69.0893 380.397 69.7642 381.371C70.439 382.344 70.8006 383.501 70.8007 384.686C70.8007 385.075 70.6462 385.448 70.3711 385.723C70.096 385.998 69.723 386.152 69.334 386.152Z"
        fill={color3}
        stroke={color3}
        onClick={() => setVisualizerActiveColor(color3)}
        className="opacity-60"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M59.7633 374.737C60.4318 375.08 61.1703 375.265 61.9217 375.277C62.6731 375.289 63.4171 375.127 64.0961 374.806C64.7751 374.484 65.3709 374.01 65.8372 373.42C66.3035 372.831 66.6278 372.142 66.785 371.407L66.8668 371.025C67.0219 370.299 67.0201 369.548 66.8613 368.823C66.7026 368.098 66.3907 367.415 65.9464 366.82L65.8144 366.644C65.3709 366.051 64.7951 365.57 64.1328 365.238C63.4705 364.906 62.74 364.733 61.9993 364.733C61.2586 364.733 60.528 364.906 59.8658 365.238C59.2035 365.57 58.6277 366.051 58.1841 366.644L58.0521 366.82C57.6079 367.415 57.296 368.098 57.1373 368.823C56.9786 369.548 56.9767 370.298 57.1318 371.024L57.2135 371.408C57.3653 372.117 57.6728 372.783 58.1137 373.359C58.5546 373.935 59.1179 374.406 59.763 374.737"
        fill={color3}
        stroke={color3}
        onClick={() => setVisualizerActiveColor(color3)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="103" y="381.318">
          Zayd Ali.
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="446" y="382.591">
          Rejected
        </tspan>
      </text>
      <circle
        cx="430.5"
        cy="378.5"
        r="4.5"
        fill={color3}
        onClick={() => setVisualizerActiveColor(color3)}
      />
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="545.568" y="382.591">
          18 Dec
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="382" y="55.5909">
          Few month ago
        </tspan>
      </text>
    </svg>
  );
}
