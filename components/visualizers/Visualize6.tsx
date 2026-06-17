"use client";

import { useVisualizerStore } from "@/libs/stores/dataStore";
import { PaletteColor } from "@/utils/Types";
import { checkIsLight, distributePalette } from "@/utils/utils";

export default function Visualize6({ palette }: { palette: PaletteColor[] }) {
  const setVisualizerActiveColors = useVisualizerStore(
    (state) => state.setVisualizerActiveColors,
  );
  const colors = distributePalette(palette, 6);
  const color1 = colors[0]?.color;
  const color2 = colors[1]?.color;
  const color3 = colors[2]?.color;
  const color4 = colors[3]?.color;
  const color5 = colors[4]?.color;
  const color6 = colors[5]?.color;
  const clickHandler = (color: string) => {
    setVisualizerActiveColors([color]);
    console.log(color);
  };
  return (
    <svg
      viewBox="0 0 1440 1024"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="1440" height="1024" rx="24" fill="#262626" />
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="24"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="27" y="53.94">
          Dashboard
        </tspan>
      </text>
      <rect x="309" y="19" width="1119" height="990" rx="20" fill="#F0F0F0" />
      <rect x="337" y="40" width="267" height="60" rx="30" fill="white" />
      <path
        d="M253.5 106C267.583 106 279 117.417 279 131.5C279 145.583 267.583 157 253.5 157H104.5C98.1554 157 92.3524 154.683 87.8905 150.849C84.7168 148.121 78.527 148.158 75.365 150.899C70.98 154.7 65.2589 157 59 157C45.1929 157 34 145.807 34 132C34 118.193 45.1929 107 59 107C65.0612 107 70.6181 109.157 74.9456 112.746C78.1668 115.417 84.3563 115.318 87.4697 112.521C91.9845 108.467 97.9539 106 104.5 106H253.5Z"
        fill="white"
      />
      <path
        d="M57.9949 124.68V128.56C57.9949 128.881 57.9315 129.199 57.8082 129.496C57.685 129.793 57.5044 130.062 57.2767 130.289C57.0491 130.516 56.7789 130.695 56.4818 130.817C56.1846 130.939 55.8662 131.001 55.5449 131H51.6849C51.3645 131.002 51.047 130.939 50.7515 130.815C50.4559 130.692 50.1884 130.51 49.9649 130.28C49.738 130.055 49.5584 129.787 49.4365 129.492C49.3145 129.196 49.2528 128.88 49.2549 128.56V124.69C49.2549 124.045 49.5106 123.425 49.9661 122.968C50.4215 122.511 51.0395 122.253 51.6849 122.25H55.5549C55.875 122.25 56.1918 122.314 56.4871 122.438C56.7823 122.561 57.0501 122.742 57.2749 122.97C57.5024 123.193 57.6832 123.459 57.8069 123.753C57.9305 124.046 57.9944 124.361 57.9949 124.68ZM68.7449 124.69V128.56C68.7397 129.204 68.4824 129.82 68.0281 130.276C67.5738 130.732 66.9587 130.992 66.3149 131H62.4349C61.7881 130.996 61.168 130.742 60.7049 130.29C60.4786 130.062 60.2995 129.793 60.1776 129.496C60.0558 129.199 59.9937 128.881 59.9949 128.56V124.69C59.9941 124.37 60.0574 124.053 60.1811 123.757C60.3047 123.462 60.4862 123.194 60.7149 122.97C60.9398 122.742 61.2076 122.561 61.5028 122.438C61.798 122.314 62.1149 122.25 62.4349 122.25H66.3049C66.9504 122.255 67.568 122.514 68.0245 122.97C68.481 123.427 68.7397 124.044 68.7449 124.69ZM68.7449 135.44V139.31C68.7397 139.954 68.4824 140.57 68.0281 141.026C67.5738 141.482 66.9587 141.742 66.3149 141.75H62.4349C61.784 141.757 61.1562 141.509 60.6849 141.06C60.4578 140.833 60.278 140.563 60.1561 140.266C60.0342 139.969 59.9726 139.651 59.9749 139.33V135.46C59.9741 135.14 60.0374 134.823 60.1611 134.527C60.2847 134.232 60.4662 133.964 60.6949 133.74C60.9198 133.512 61.1876 133.331 61.4828 133.208C61.778 133.084 62.0949 133.02 62.4149 133.02H66.2849C66.9304 133.025 67.548 133.284 68.0045 133.74C68.461 134.197 68.7197 134.814 68.7249 135.46L68.7449 135.44ZM57.9949 135.45V139.32C57.9871 139.965 57.7258 140.582 57.2675 141.037C56.8091 141.491 56.1905 141.747 55.5449 141.75H51.6849C51.3655 141.751 51.0489 141.689 50.7535 141.568C50.458 141.446 50.1896 141.267 49.9637 141.041C49.7378 140.815 49.5589 140.547 49.4372 140.251C49.3156 139.956 49.2536 139.639 49.2549 139.32V135.45C49.2575 134.804 49.5137 134.186 49.9683 133.727C50.4229 133.269 51.0394 133.008 51.6849 133H55.5549C56.2031 133.007 56.8234 133.265 57.2849 133.72C57.741 134.18 57.9963 134.802 57.9949 135.45Z"
        fill="black"
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="88" y="139.273">
          Overview
        </tspan>
      </text>
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="88" y="208.273">
          Home
        </tspan>
      </text>
      <path
        d="M52.133 210C50.955 210 50 209.02 50 207.81V199.008C50 198.343 50.295 197.713 50.8 197.298L56.667 192.48C57.0419 192.17 57.5133 192 58 192C58.4867 192 58.9581 192.17 59.333 192.48L65.199 197.298C65.705 197.713 66 198.343 66 199.008V207.81C66 209.02 65.045 210 63.867 210H52.133Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M55.5 210V204.5C55.5 203.97 55.7107 203.461 56.0858 203.086C56.4609 202.711 56.9696 202.5 57.5 202.5H58.5C59.0304 202.5 59.5391 202.711 59.9142 203.086C60.2893 203.461 60.5 203.97 60.5 204.5V210"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="88" y="271.273">
          Notifications
        </tspan>
      </text>
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="88" y="337.273">
          Analytics
        </tspan>
      </text>
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="88" y="400.273">
          Requested
        </tspan>
      </text>
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="88" y="463.273">
          Messages
        </tspan>
      </text>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.0001 253.25C55.9446 253.25 53.9734 254.067 52.52 255.52C51.0666 256.973 50.2501 258.945 50.2501 261V261.704C50.25 262.401 50.0437 263.082 49.6571 263.662L48.5101 265.385C47.1761 267.385 48.1941 270.103 50.5131 270.735C51.2684 270.941 52.0297 271.115 52.7971 271.258L52.7991 271.263C53.5671 273.315 55.6221 274.75 58.0001 274.75C60.3781 274.75 62.4331 273.315 63.2021 271.263L63.2041 271.258C63.9721 271.115 64.7341 270.94 65.4881 270.735C67.8071 270.103 68.8251 267.385 67.4911 265.385L66.3431 263.662C65.9565 263.082 65.7501 262.401 65.7501 261.704V261C65.7501 258.945 64.9335 256.973 63.4801 255.52C62.0267 254.067 60.0555 253.25 58.0001 253.25ZM61.3761 271.537C59.133 271.805 56.8661 271.805 54.6231 271.537C55.3341 272.558 56.5711 273.25 58.0001 273.25C59.4291 273.25 60.6651 272.558 61.3761 271.537ZM51.7501 261C51.7501 259.342 52.4085 257.753 53.5806 256.581C54.7527 255.408 56.3425 254.75 58.0001 254.75C59.6577 254.75 61.2474 255.408 62.4195 256.581C63.5916 257.753 64.2501 259.342 64.2501 261V261.704C64.2501 262.697 64.5441 263.668 65.0951 264.494L66.2431 266.217C66.421 266.483 66.5329 266.788 66.5698 267.107C66.6066 267.425 66.5672 267.747 66.4549 268.047C66.3425 268.347 66.1605 268.616 65.9237 268.832C65.6869 269.048 65.4022 269.204 65.0931 269.288C60.4489 270.555 55.5503 270.555 50.9061 269.288C50.5971 269.204 50.3126 269.048 50.0759 268.832C49.8392 268.616 49.6572 268.347 49.5449 268.047C49.4326 267.748 49.3931 267.425 49.4299 267.107C49.4666 266.789 49.5784 266.484 49.7561 266.218L50.9061 264.494C51.4566 263.668 51.7503 262.697 51.7501 261.704V261Z"
        fill="white"
      />
      <path
        d="M52 390C52.7956 390 53.5587 389.684 54.1213 389.121C54.6839 388.559 55 387.796 55 387C55 386.204 54.6839 385.441 54.1213 384.879C53.5587 384.316 52.7956 384 52 384C51.2044 384 50.4413 384.316 49.8787 384.879C49.3161 385.441 49 386.204 49 387C49 387.796 49.3161 388.559 49.8787 389.121C50.4413 389.684 51.2044 390 52 390ZM52 390V402M64 396C64.7956 396 65.5587 396.316 66.1213 396.879C66.6839 397.441 67 398.204 67 399C67 399.796 66.6839 400.559 66.1213 401.121C65.5587 401.684 64.7956 402 64 402C63.2044 402 62.4413 401.684 61.8787 401.121C61.3161 400.559 61 399.796 61 399C61 398.204 61.3161 397.441 61.8787 396.879C62.4413 396.316 63.2044 396 64 396ZM64 396V388.5C64 387.97 63.7893 387.461 63.4142 387.086C63.0391 386.711 62.5304 386.5 62 386.5H59.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60.5 389L58 386.5L60.5 384"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="257"
        cy="132"
        r="11"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill={checkIsLight(color2) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="253.7" y="135.036">
          3
        </tspan>
      </text>
      <rect
        x="27"
        y="815"
        width="252"
        height="183"
        rx="20"
        fill={color1}
        onClick={() => clickHandler(color1)}
      />
      <rect x="42" y="934" width="221" height="49" rx="24.5" fill="#262626" />
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="98.667" y="965.045">
          Upgrade pro
        </tspan>
      </text>
      <text
        fill={checkIsLight(color1) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="20"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="45" y="858.273">
          Unlock all features
        </tspan>
      </text>
      <text
        fill={checkIsLight(color1) ? "#364153" : "#d1d5dc"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="45" y="883.591">
          Upgrade today and experience{" "}
        </tspan>
        <tspan x="45" y="902.591">
          the difference.
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="64"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="329" y="192.773">
          Task Overview
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="332" y="232.318">
          Make your daily routine organize today.
        </tspan>
      </text>
      <circle
        cx="1244"
        cy="70"
        r="30"
        fill={color2}
        onClick={() => clickHandler(color2)}
        fillOpacity="0.15"
      />
      <path
        d="M1254.83 84.0001H1233.17C1232.59 84.0001 1232.04 83.7658 1231.63 83.3487C1231.23 82.9316 1231 82.3659 1231 81.776C1231 79.9796 1231.53 78.226 1232.53 76.7495C1233.53 75.2731 1234.94 74.1442 1236.58 73.5137L1237.25 73.2568C1241.6 71.5812 1246.4 71.5812 1250.75 73.2568L1251.42 73.5137C1253.06 74.1442 1254.47 75.2731 1255.47 76.7495C1256.47 78.226 1257 79.9796 1257 81.776C1257 82.3659 1256.77 82.9316 1256.37 83.3487C1255.96 83.7658 1255.41 84.0001 1254.83 84.0001Z"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <path
        d="M1241.23 69.6463C1242.2 70.1491 1243.29 70.4196 1244.39 70.4371C1245.49 70.4546 1246.57 70.2185 1247.57 69.7471C1248.56 69.2757 1249.44 68.5817 1250.12 67.7189C1250.8 66.8561 1251.28 65.8477 1251.51 64.7718L1251.63 64.2113C1251.85 63.1485 1251.85 62.0494 1251.62 60.9878C1251.39 59.9261 1250.93 58.9264 1250.28 58.0558L1250.08 57.7981C1249.44 56.9295 1248.59 56.2244 1247.62 55.7386C1246.65 55.2529 1245.58 55 1244.5 55C1243.41 55 1242.34 55.2529 1241.38 55.7386C1240.41 56.2244 1239.56 56.9295 1238.91 57.7981L1238.72 58.0558C1238.07 58.9264 1237.61 59.926 1237.38 60.9875C1237.15 62.0491 1237.15 63.148 1237.37 64.2107L1237.49 64.7723C1237.71 65.8106 1238.16 66.7865 1238.81 67.6295C1239.46 68.4726 1240.28 69.1616 1241.22 69.6469"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1285" y="65.5455">
          Muhammad
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="13"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1285" y="88.7273">
          <a href="mailto:muhammadhu62@gmail.com">muh62@gmail.co</a>
        </tspan>
      </text>
      <circle cx="1170" cy="70" r="30" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1170 59.25C1167.94 59.25 1165.97 60.0665 1164.52 61.5199C1163.07 62.9733 1162.25 64.9446 1162.25 67V67.704C1162.25 68.4009 1162.04 69.0822 1161.66 69.662L1160.51 71.385C1159.18 73.385 1160.19 76.103 1162.51 76.735C1163.27 76.941 1164.03 77.1153 1164.8 77.258L1164.8 77.263C1165.57 79.315 1167.62 80.75 1170 80.75C1172.38 80.75 1174.43 79.315 1175.2 77.263L1175.2 77.258C1175.97 77.1145 1176.73 76.94 1177.49 76.735C1179.81 76.103 1180.83 73.385 1179.49 71.385L1178.34 69.662C1177.96 69.0822 1177.75 68.4009 1177.75 67.704V67C1177.75 64.9446 1176.93 62.9733 1175.48 61.5199C1174.03 60.0665 1172.06 59.25 1170 59.25ZM1173.38 77.537C1171.13 77.8046 1168.87 77.8046 1166.62 77.537C1167.33 78.558 1168.57 79.25 1170 79.25C1171.43 79.25 1172.67 78.558 1173.38 77.537ZM1163.75 67C1163.75 65.3424 1164.41 63.7527 1165.58 62.5806C1166.75 61.4085 1168.34 60.75 1170 60.75C1171.66 60.75 1173.25 61.4085 1174.42 62.5806C1175.59 63.7527 1176.25 65.3424 1176.25 67V67.704C1176.25 68.697 1176.54 69.668 1177.1 70.494L1178.24 72.217C1178.42 72.4834 1178.53 72.7883 1178.57 73.1065C1178.61 73.4247 1178.57 73.7471 1178.45 74.0471C1178.34 74.3471 1178.16 74.6161 1177.92 74.8319C1177.69 75.0476 1177.4 75.204 1177.09 75.288C1172.45 76.5546 1167.55 76.5546 1162.91 75.288C1162.6 75.2039 1162.31 75.0476 1162.08 74.8319C1161.84 74.6162 1161.66 74.3473 1161.54 74.0475C1161.43 73.7476 1161.39 73.4254 1161.43 73.1073C1161.47 72.7892 1161.58 72.4844 1161.76 72.218L1162.91 70.494C1163.46 69.6677 1163.75 68.6969 1163.75 67.704V67Z"
        fill="black"
      />
      <circle
        cx="1180"
        cy="59"
        r="9"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill={checkIsLight(color2) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="1177" y="61.7727">
          3
        </tspan>
      </text>
      <rect x="337" y="277" width="420" height="711" rx="30" fill="white" />
      <rect x="764" y="273" width="312" height="285" rx="30" fill="white" />
      <rect x="777" y="324" width="286" height="42" rx="12" fill="#F2F2F2" />
      <rect x="764" y="565" width="630" height="419" rx="30" fill="white" />
      <circle
        cx="381"
        cy="318"
        r="30"
        fill={color2}
        onClick={() => clickHandler(color2)}
        fillOpacity="0.15"
      />
      <path
        d="M375.654 308.388C376.131 308.721 376.244 309.377 375.912 309.849L373.462 313.349C373.283 313.603 373.003 313.765 372.692 313.791C372.381 313.817 372.075 313.712 371.856 313.494L370.106 311.744C369.699 311.332 369.699 310.667 370.106 310.256C370.513 309.845 371.183 309.849 371.594 310.256L372.46 311.122L374.193 308.646C374.525 308.169 375.181 308.056 375.654 308.388ZM375.654 315.388C376.131 315.721 376.244 316.377 375.912 316.849L373.462 320.349C373.283 320.603 373.003 320.765 372.692 320.791C372.381 320.817 372.075 320.712 371.856 320.494L370.106 318.744C369.695 318.332 369.695 317.667 370.106 317.261C370.518 316.854 371.183 316.849 371.589 317.261L372.456 318.127L374.188 315.651C374.521 315.174 375.177 315.06 375.649 315.392L375.654 315.388ZM379.6 311C379.6 310.226 380.226 309.6 381 309.6H390.8C391.574 309.6 392.2 310.226 392.2 311C392.2 311.774 391.574 312.4 390.8 312.4H381C380.226 312.4 379.6 311.774 379.6 311ZM379.6 318C379.6 317.226 380.226 316.6 381 316.6H390.8C391.574 316.6 392.2 317.226 392.2 318C392.2 318.774 391.574 319.4 390.8 319.4H381C380.226 319.4 379.6 318.774 379.6 318ZM376.8 325C376.8 324.226 377.426 323.6 378.2 323.6H390.8C391.574 323.6 392.2 324.226 392.2 325C392.2 325.774 391.574 326.4 390.8 326.4H378.2C377.426 326.4 376.8 325.774 376.8 325ZM372.6 323.25C373.567 323.25 374.35 324.033 374.35 325C374.35 325.967 373.567 326.75 372.6 326.75C371.633 326.75 370.85 325.967 370.85 325C370.85 324.033 371.633 323.25 372.6 323.25Z"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="429" y="324.545">
          Only today
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="42"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="351" y="414.773">
          782
        </tspan>
      </text>
      <path
        d="M716 308.333C717.283 308.333 718.333 307.283 718.333 306C718.333 304.717 717.283 303.667 716 303.667C714.717 303.667 713.667 304.717 713.667 306C713.667 307.283 714.717 308.333 716 308.333ZM716 310.667C714.717 310.667 713.667 311.717 713.667 313C713.667 314.283 714.717 315.333 716 315.333C717.283 315.333 718.333 314.283 718.333 313C718.333 311.717 717.283 310.667 716 310.667ZM716 317.667C714.717 317.667 713.667 318.717 713.667 320C713.667 321.283 714.717 322.333 716 322.333C717.283 322.333 718.333 321.283 718.333 320C718.333 318.717 717.283 317.667 716 317.667Z"
        fill="#616161"
      />
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="437" y="414.591">
          All days listed
        </tspan>
      </text>
      <rect
        x="435"
        y="379"
        width="35"
        height="19"
        rx="9.5"
        fill={color1}
        onClick={() => clickHandler(color1)}
      />
      <text
        fill={checkIsLight(color1) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="10"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="442" y="391.636">
          +3%
        </tspan>
      </text>
      <path
        d="M351 455C351 446.716 357.716 440 366 440H545V642H366C357.716 642 351 635.284 351 627V455Z"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <path
        d="M547 440H726C734.284 440 741 446.716 741 455V540H547V440Z"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <path
        d="M547 542H741V627C741 635.284 734.284 642 726 642H547V542Z"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <text
        fill={checkIsLight(color2) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="50"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="397.219" y="546.682">
          5.7k
        </tspan>
      </text>
      <text
        fill={checkIsLight(color2) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="431.443" y="575.591">
          Total
        </tspan>
      </text>
      <text
        fill={checkIsLight(color3) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="611.861" y="489.909">
          4.9k
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="351" y="694.909">
          30.5{" "}
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="424.564" y="694.909">
          %
        </tspan>
      </text>
      <text
        fill={checkIsLight(color3) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="607.223" y="515.591">
          Completed
        </tspan>
      </text>
      <text
        fill={checkIsLight(color4) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="615.333" y="587.909">
          558
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
        <tspan x="616.711" y="613.591">
          Running
        </tspan>
      </text>
      <rect
        x="729"
        y="681"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="682.162" y="691.591">
          Today
        </tspan>
      </text>
      <rect x="351" y="711" width="390" height="13" rx="6.5" fill="#F0F0F0" />
      <rect
        x="351"
        y="711"
        width="119"
        height="13"
        rx="6.5"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="351" y="774.909">
          90.7{" "}
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="422.66" y="774.909">
          %
        </tspan>
      </text>
      <rect
        x="729"
        y="761"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="649.445" y="771.591">
          Completed
        </tspan>
      </text>
      <rect x="351" y="791" width="390" height="13" rx="6.5" fill="#F0F0F0" />
      <rect
        x="351"
        y="791"
        width="280"
        height="13"
        rx="6.5"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="351" y="856.909">
          60.87{" "}
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="441.908" y="856.909">
          %
        </tspan>
      </text>
      <rect
        x="729"
        y="843"
        width="12"
        height="12"
        rx="6"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="668.422" y="853.591">
          Running
        </tspan>
      </text>
      <rect x="351" y="873" width="390" height="13" rx="6.5" fill="#F0F0F0" />
      <rect
        x="351"
        y="873"
        width="214"
        height="13"
        rx="6.5"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="351" y="934.909">
          14.0{" "}
        </tspan>
      </text>
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="420.082" y="934.909">
          %
        </tspan>
      </text>
      <rect
        x="729"
        y="921"
        width="12"
        height="12"
        rx="6"
        fill={color5}
        onClick={() => clickHandler(color5)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="659.74" y="931.591">
          Canceled
        </tspan>
      </text>
      <rect x="351" y="951" width="390" height="13" rx="6.5" fill="#F0F0F0" />
      <rect
        x="351"
        y="951"
        width="84"
        height="13"
        rx="6.5"
        fill={color5}
        onClick={() => clickHandler(color5)}
      />
      <rect
        x="782"
        y="761"
        width="141"
        height="155"
        rx="70.5"
        fill={color6}
        onClick={() => clickHandler(color6)}
      />
      <rect
        x="932"
        y="659"
        width="141"
        height="257"
        rx="70.5"
        fill={color6}
        onClick={() => clickHandler(color6)}
      />
      <rect
        x="1233"
        y="692"
        width="141"
        height="224"
        rx="70.5"
        fill={color6}
        onClick={() => clickHandler(color6)}
      />
      <rect
        x="1082"
        y="746"
        width="141"
        height="170"
        rx="70.5"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <rect
        x="870"
        y="944"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="823" y="954.591">
          Today
        </tspan>
      </text>
      <rect
        x="1037"
        y="944"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="957" y="954.591">
          Completed
        </tspan>
      </text>
      <rect
        x="1178"
        y="945"
        width="12"
        height="12"
        rx="6"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1117" y="954.591">
          Running
        </tspan>
      </text>
      <rect
        x="1328"
        y="945"
        width="12"
        height="12"
        rx="6"
        fill={color5}
        onClick={() => clickHandler(color5)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="14"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1257" y="955.591">
          Canceled
        </tspan>
      </text>
      <rect x="1196" y="585" width="178" height="60" rx="30" fill="#262626" />
      <text
        fill="white"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1223" y="620.545">
          Last Month
        </tspan>
      </text>
      <path d="M1337.75 612L1343 617.25L1348.25 612" stroke="white" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="30"
        fontWeight="600"
        letterSpacing="0em"
      >
        <tspan x="782" y="618.909">
          Look in Graph
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="784" y="308.545">
          Today added
        </tspan>
      </text>
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="814" y="351.318">
          Wake up early
        </tspan>
      </text>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1047.14 302L1039.91 309.226L1038.59 307.901L1044.49 302L1038.59 296.101L1039.91 294.774L1047.14 302Z"
        fill="black"
      />
      <rect
        x="1036"
        y="339"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <rect x="777" y="368" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="814" y="395.318">
          Pray Fajr
        </tspan>
      </text>
      <rect
        x="1036"
        y="383"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <rect x="777" y="412" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="814" y="439.318">
          Morning exercise
        </tspan>
      </text>
      <rect
        x="1036"
        y="427"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <rect x="777" y="456" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="814" y="483.318">
          Healthy breakfast
        </tspan>
      </text>
      <rect
        x="1036"
        y="471"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <rect x="777" y="500" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="814" y="527.318">
          Plan the day
        </tspan>
      </text>
      <rect
        x="1036"
        y="515"
        width="12"
        height="12"
        rx="6"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <rect x="1082" y="274" width="312" height="285" rx="30" fill="white" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1102" y="309.545">
          Completed
        </tspan>
      </text>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1365.14 303L1357.91 310.226L1356.59 308.901L1362.49 303L1356.59 297.101L1357.91 295.774L1365.14 303Z"
        fill="black"
      />
      <rect x="1095" y="369" width="286" height="42" rx="12" fill="#F2F2F2" />
      <rect x="1095" y="325" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1132" y="396.318">
          Revise chemistry notes
        </tspan>
      </text>
      <rect
        x="1354"
        y="384"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <rect x="1095" y="413" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1132" y="440.318">
          Design homepage layout
        </tspan>
      </text>
      <rect
        x="1354"
        y="428"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <rect x="1095" y="457" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1132" y="484.318">
          Clean room
        </tspan>
      </text>
      <rect
        x="1354"
        y="472"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <rect x="1095" y="501" width="286" height="42" rx="12" fill="#F2F2F2" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1132" y="528.318">
          Call parents
        </tspan>
      </text>
      <rect
        x="1354"
        y="516"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="16"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1132" y="352.318">
          Fix dashboard bug
        </tspan>
      </text>
      <rect
        x="1354"
        y="340"
        width="12"
        height="12"
        rx="6"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <g clipPath="url(#clip0_127_266)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1124.08 346C1124.08 351.569 1119.57 356.083 1114 356.083C1108.43 356.083 1103.92 351.569 1103.92 346C1103.92 340.431 1108.43 335.917 1114 335.917C1119.57 335.917 1124.08 340.431 1124.08 346ZM1109.42 346.917L1110.79 345.542L1112.62 347.375L1117.21 342.792L1118.58 344.167L1112.62 350.125L1109.42 346.917Z"
          fill={color3}
          onClick={() => clickHandler(color3)}
        />
      </g>
      <g clipPath="url(#clip1_127_266)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1124.08 390C1124.08 395.569 1119.57 400.083 1114 400.083C1108.43 400.083 1103.92 395.569 1103.92 390C1103.92 384.431 1108.43 379.917 1114 379.917C1119.57 379.917 1124.08 384.431 1124.08 390ZM1109.42 390.917L1110.79 389.542L1112.62 391.375L1117.21 386.792L1118.58 388.167L1112.62 394.125L1109.42 390.917Z"
          fill={color3}
          onClick={() => clickHandler(color3)}
        />
      </g>
      <g clipPath="url(#clip2_127_266)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1124.08 434C1124.08 439.569 1119.57 444.083 1114 444.083C1108.43 444.083 1103.92 439.569 1103.92 434C1103.92 428.431 1108.43 423.917 1114 423.917C1119.57 423.917 1124.08 428.431 1124.08 434ZM1109.42 434.917L1110.79 433.542L1112.62 435.375L1117.21 430.792L1118.58 432.167L1112.62 438.125L1109.42 434.917Z"
          fill={color3}
          onClick={() => clickHandler(color3)}
        />
      </g>
      <g clipPath="url(#clip3_127_266)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1124.08 478C1124.08 483.569 1119.57 488.083 1114 488.083C1108.43 488.083 1103.92 483.569 1103.92 478C1103.92 472.431 1108.43 467.917 1114 467.917C1119.57 467.917 1124.08 472.431 1124.08 478ZM1109.42 478.917L1110.79 477.542L1112.62 479.375L1117.21 474.792L1118.58 476.167L1112.62 482.125L1109.42 478.917Z"
          fill={color3}
          onClick={() => clickHandler(color3)}
        />
      </g>
      <g clipPath="url(#clip4_127_266)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1124.08 522C1124.08 527.569 1119.57 532.083 1114 532.083C1108.43 532.083 1103.92 527.569 1103.92 522C1103.92 516.431 1108.43 511.917 1114 511.917C1119.57 511.917 1124.08 516.431 1124.08 522ZM1109.42 522.917L1110.79 521.542L1112.62 523.375L1117.21 518.792L1118.58 520.167L1112.62 526.125L1109.42 522.917Z"
          fill={color3}
          onClick={() => clickHandler(color3)}
        />
      </g>
      <rect
        x="1046"
        y="140"
        width="167"
        height="60"
        rx="30"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <text
        fill={checkIsLight(color2) ? "black" : "white"}
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1106" y="176.545">
          Add Task
        </tspan>
      </text>
      <rect x="1227" y="140" width="167" height="60" rx="30" fill="white" />
      <text
        fill="black"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="1257.19" y="176.545">
          Import Tasks
        </tspan>
      </text>
      <path
        d="M1089.25 171H1083V177.25C1083 177.582 1082.87 177.899 1082.63 178.134C1082.4 178.368 1082.08 178.5 1081.75 178.5C1081.42 178.5 1081.1 178.368 1080.87 178.134C1080.63 177.899 1080.5 177.582 1080.5 177.25V171H1074.25C1073.92 171 1073.6 170.868 1073.37 170.634C1073.13 170.399 1073 170.082 1073 169.75C1073 169.418 1073.13 169.101 1073.37 168.866C1073.6 168.632 1073.92 168.5 1074.25 168.5H1080.5V162.25C1080.5 161.918 1080.63 161.601 1080.87 161.366C1081.1 161.132 1081.42 161 1081.75 161C1082.08 161 1082.4 161.132 1082.63 161.366C1082.87 161.601 1083 161.918 1083 162.25V168.5H1089.25C1089.58 168.5 1089.9 168.632 1090.13 168.866C1090.37 169.101 1090.5 169.418 1090.5 169.75C1090.5 170.082 1090.37 170.399 1090.13 170.634C1089.9 170.868 1089.58 171 1089.25 171Z"
        fill={checkIsLight(color2) ? "black" : "white"}
      />
      <path
        d="M796.003 355.5C794.552 355.5 793.187 355.225 791.908 354.674C790.631 354.123 789.519 353.374 788.573 352.429C787.627 351.484 786.879 350.374 786.327 349.097C785.776 347.821 785.5 346.456 785.5 345.003C785.5 343.551 785.776 342.186 786.327 340.908C786.878 339.631 787.625 338.519 788.568 337.573C789.512 336.627 790.623 335.879 791.902 335.327C793.18 334.776 794.545 334.5 795.996 334.5C797.448 334.5 798.813 334.776 800.091 335.327C801.369 335.878 802.481 336.625 803.427 337.569C804.373 338.514 805.121 339.625 805.673 340.903C806.224 342.181 806.5 343.545 806.5 344.996C806.5 346.448 806.225 347.813 805.674 349.091C805.123 350.37 804.375 351.482 803.429 352.427C802.484 353.372 801.373 354.121 800.097 354.673C798.822 355.225 797.457 355.501 796.003 355.5ZM796 354.333C798.606 354.333 800.812 353.429 802.621 351.621C804.429 349.812 805.333 347.606 805.333 345C805.333 342.394 804.429 340.187 802.621 338.379C800.812 336.571 798.606 335.667 796 335.667C793.394 335.667 791.187 336.571 789.379 338.379C787.571 340.187 786.667 342.394 786.667 345C786.667 347.606 787.571 349.812 789.379 351.621C791.187 353.429 793.394 354.333 796 354.333Z"
        fill="#9E9E9E"
      />
      <path
        d="M796.003 399.5C794.552 399.5 793.187 399.225 791.908 398.674C790.631 398.123 789.519 397.374 788.573 396.429C787.627 395.484 786.879 394.374 786.327 393.097C785.776 391.821 785.5 390.456 785.5 389.003C785.5 387.551 785.776 386.186 786.327 384.908C786.878 383.631 787.625 382.519 788.568 381.573C789.512 380.627 790.623 379.879 791.902 379.327C793.18 378.776 794.545 378.5 795.996 378.5C797.448 378.5 798.813 378.776 800.091 379.327C801.369 379.878 802.481 380.625 803.427 381.569C804.373 382.514 805.121 383.625 805.673 384.903C806.224 386.181 806.5 387.545 806.5 388.996C806.5 390.448 806.225 391.813 805.674 393.091C805.123 394.37 804.375 395.482 803.429 396.427C802.484 397.372 801.373 398.121 800.097 398.673C798.822 399.225 797.457 399.501 796.003 399.5ZM796 398.333C798.606 398.333 800.812 397.429 802.621 395.621C804.429 393.812 805.333 391.606 805.333 389C805.333 386.394 804.429 384.187 802.621 382.379C800.812 380.571 798.606 379.667 796 379.667C793.394 379.667 791.187 380.571 789.379 382.379C787.571 384.187 786.667 386.394 786.667 389C786.667 391.606 787.571 393.812 789.379 395.621C791.187 397.429 793.394 398.333 796 398.333Z"
        fill="#9E9E9E"
      />
      <path
        d="M796.003 443.5C794.552 443.5 793.187 443.225 791.908 442.674C790.631 442.123 789.519 441.374 788.573 440.429C787.627 439.484 786.879 438.374 786.327 437.097C785.776 435.821 785.5 434.456 785.5 433.003C785.5 431.551 785.776 430.186 786.327 428.908C786.878 427.631 787.625 426.519 788.568 425.573C789.512 424.627 790.623 423.879 791.902 423.327C793.18 422.776 794.545 422.5 795.996 422.5C797.448 422.5 798.813 422.776 800.091 423.327C801.369 423.878 802.481 424.625 803.427 425.569C804.373 426.514 805.121 427.625 805.673 428.903C806.224 430.181 806.5 431.545 806.5 432.996C806.5 434.448 806.225 435.813 805.674 437.091C805.123 438.37 804.375 439.482 803.429 440.427C802.484 441.372 801.373 442.121 800.097 442.673C798.822 443.225 797.457 443.501 796.003 443.5ZM796 442.333C798.606 442.333 800.812 441.429 802.621 439.621C804.429 437.812 805.333 435.606 805.333 433C805.333 430.394 804.429 428.187 802.621 426.379C800.812 424.571 798.606 423.667 796 423.667C793.394 423.667 791.187 424.571 789.379 426.379C787.571 428.187 786.667 430.394 786.667 433C786.667 435.606 787.571 437.812 789.379 439.621C791.187 441.429 793.394 442.333 796 442.333Z"
        fill="#9E9E9E"
      />
      <path
        d="M796.003 487.5C794.552 487.5 793.187 487.225 791.908 486.674C790.631 486.123 789.519 485.374 788.573 484.429C787.627 483.484 786.879 482.374 786.327 481.097C785.776 479.821 785.5 478.456 785.5 477.003C785.5 475.551 785.776 474.186 786.327 472.908C786.878 471.631 787.625 470.519 788.568 469.573C789.512 468.627 790.623 467.879 791.902 467.327C793.18 466.776 794.545 466.5 795.996 466.5C797.448 466.5 798.813 466.776 800.091 467.327C801.369 467.878 802.481 468.625 803.427 469.569C804.373 470.514 805.121 471.625 805.673 472.903C806.224 474.181 806.5 475.545 806.5 476.996C806.5 478.448 806.225 479.813 805.674 481.091C805.123 482.37 804.375 483.482 803.429 484.427C802.484 485.372 801.373 486.121 800.097 486.673C798.822 487.225 797.457 487.501 796.003 487.5ZM796 486.333C798.606 486.333 800.812 485.429 802.621 483.621C804.429 481.812 805.333 479.606 805.333 477C805.333 474.394 804.429 472.187 802.621 470.379C800.812 468.571 798.606 467.667 796 467.667C793.394 467.667 791.187 468.571 789.379 470.379C787.571 472.187 786.667 474.394 786.667 477C786.667 479.606 787.571 481.812 789.379 483.621C791.187 485.429 793.394 486.333 796 486.333Z"
        fill="#9E9E9E"
      />
      <path
        d="M796.003 531.5C794.552 531.5 793.187 531.225 791.908 530.674C790.631 530.123 789.519 529.374 788.573 528.429C787.627 527.484 786.879 526.374 786.327 525.097C785.776 523.821 785.5 522.456 785.5 521.003C785.5 519.551 785.776 518.186 786.327 516.908C786.878 515.631 787.625 514.519 788.568 513.573C789.512 512.627 790.623 511.879 791.902 511.327C793.18 510.776 794.545 510.5 795.996 510.5C797.448 510.5 798.813 510.776 800.091 511.327C801.369 511.878 802.481 512.625 803.427 513.569C804.373 514.514 805.121 515.625 805.673 516.903C806.224 518.181 806.5 519.545 806.5 520.996C806.5 522.448 806.225 523.813 805.674 525.091C805.123 526.37 804.375 527.482 803.429 528.427C802.484 529.372 801.373 530.121 800.097 530.673C798.822 531.225 797.457 531.501 796.003 531.5ZM796 530.333C798.606 530.333 800.812 529.429 802.621 527.621C804.429 525.812 805.333 523.606 805.333 521C805.333 518.394 804.429 516.187 802.621 514.379C800.812 512.571 798.606 511.667 796 511.667C793.394 511.667 791.187 512.571 789.379 514.379C787.571 516.187 786.667 518.394 786.667 521C786.667 523.606 787.571 525.812 789.379 527.621C791.187 529.429 793.394 530.333 796 530.333Z"
        fill="#9E9E9E"
      />
      <path
        d="M66.4845 324.75C66.1919 324.75 65.9038 324.822 65.6451 324.958C65.3865 325.095 65.1652 325.293 65.0003 325.535C64.8355 325.776 64.7322 326.055 64.6994 326.345C64.6666 326.636 64.7052 326.93 64.812 327.203L61.031 330.984C60.6095 330.818 60.1407 330.818 59.7192 330.984L57.0163 328.281C57.1233 328.008 57.1622 327.714 57.1295 327.423C57.0968 327.132 56.9935 326.854 56.8287 326.612C56.6638 326.37 56.4424 326.172 56.1836 326.035C55.9248 325.898 55.6366 325.827 55.3438 325.827C55.0511 325.827 54.7629 325.898 54.5041 326.035C54.2453 326.172 54.0239 326.37 53.859 326.612C53.6942 326.854 53.5909 327.132 53.5582 327.423C53.5255 327.714 53.5644 328.008 53.6714 328.281L49.1716 332.781C48.7873 332.63 48.3628 332.616 47.9695 332.742C47.5762 332.867 47.2381 333.124 47.012 333.469C46.7859 333.815 46.6856 334.227 46.728 334.638C46.7704 335.049 46.9529 335.432 47.2448 335.724C47.5367 336.016 47.9202 336.198 48.3308 336.241C48.7415 336.283 49.1542 336.183 49.4995 335.957C49.8449 335.731 50.1019 335.393 50.2273 334.999C50.3527 334.606 50.3389 334.182 50.1882 333.797L54.688 329.297C55.1095 329.463 55.5782 329.463 55.9997 329.297L58.7027 332C58.5956 332.273 58.5568 332.567 58.5895 332.858C58.6222 333.149 58.7254 333.428 58.8903 333.669C59.0551 333.911 59.2766 334.109 59.5353 334.246C59.7941 334.383 60.0824 334.454 60.3751 334.454C60.6678 334.454 60.9561 334.383 61.2149 334.246C61.4736 334.109 61.6951 333.911 61.8599 333.669C62.0248 333.428 62.128 333.149 62.1607 332.858C62.1934 332.567 62.1546 332.273 62.0475 332L65.8286 328.219C66.0747 328.316 66.339 328.357 66.6028 328.34C66.8666 328.323 67.1233 328.247 67.3547 328.12C67.5861 327.992 67.7864 327.814 67.9414 327.6C68.0963 327.386 68.2021 327.14 68.2513 326.881C68.3004 326.621 68.2915 326.354 68.2254 326.098C68.1593 325.842 68.0376 325.603 67.8688 325.4C67.7001 325.196 67.4885 325.033 67.2493 324.92C67.01 324.808 66.7488 324.75 66.4845 324.75Z"
        fill="white"
      />
      <path
        d="M67.34 453.32L53.34 446.32C52.7875 446.045 52.1636 445.947 51.5534 446.04C50.9433 446.132 50.3765 446.411 49.9303 446.837C49.4842 447.264 49.1805 447.817 49.0605 448.423C48.9405 449.028 49.0102 449.656 49.26 450.22L51.66 455.59C51.7145 455.72 51.7425 455.859 51.7425 456C51.7425 456.141 51.7145 456.28 51.66 456.41L49.26 461.78C49.0567 462.237 48.9708 462.737 49.01 463.235C49.0492 463.734 49.2123 464.214 49.4846 464.634C49.7568 465.053 50.1295 465.398 50.5688 465.636C51.0081 465.875 51.5001 466 52 466C52.4682 465.995 52.9295 465.886 53.35 465.68L67.35 458.68C67.8466 458.43 68.264 458.047 68.5557 457.574C68.8474 457.101 69.0018 456.556 69.0018 456C69.0018 455.444 68.8474 454.899 68.5557 454.426C68.264 453.953 67.8466 453.57 67.35 453.32H67.34ZM66.45 456.89L52.45 463.89C52.2662 463.978 52.0597 464.008 51.8584 463.976C51.657 463.943 51.4704 463.85 51.3235 463.709C51.1766 463.567 51.0765 463.384 51.0365 463.184C50.9966 462.984 51.0187 462.777 51.1 462.59L53.49 457.22C53.5209 457.148 53.5477 457.075 53.57 457H60.46C60.7252 457 60.9796 456.895 61.1671 456.707C61.3546 456.52 61.46 456.265 61.46 456C61.46 455.735 61.3546 455.48 61.1671 455.293C60.9796 455.105 60.7252 455 60.46 455H53.57C53.5477 454.925 53.5209 454.852 53.49 454.78L51.1 449.41C51.0187 449.223 50.9966 449.016 51.0365 448.816C51.0765 448.616 51.1766 448.433 51.3235 448.291C51.4704 448.15 51.657 448.057 51.8584 448.024C52.0597 447.992 52.2662 448.022 52.45 448.11L66.45 455.11C66.6138 455.194 66.7513 455.321 66.8473 455.478C66.9433 455.635 66.994 455.816 66.994 456C66.994 456.184 66.9433 456.365 66.8473 456.522C66.7513 456.679 66.6138 456.806 66.45 456.89Z"
        fill="white"
      />
      <path
        d="M371.096 71.43C371.096 71.6766 370.997 71.9132 370.822 72.0876C370.646 72.262 370.407 72.36 370.159 72.36H361.959C361.71 72.36 361.472 72.262 361.296 72.0876C361.12 71.9132 361.021 71.6766 361.021 71.43C361.021 71.1833 361.12 70.9468 361.296 70.7724C361.472 70.598 361.71 70.5 361.959 70.5H370.159C370.407 70.5 370.646 70.598 370.822 70.7724C370.997 70.9468 371.096 71.1833 371.096 71.43ZM368.059 67.09C368.059 67.3366 367.96 67.5732 367.784 67.7476C367.608 67.922 367.37 68.02 367.121 68.02H361.959C361.71 68.02 361.472 67.922 361.296 67.7476C361.12 67.5732 361.021 67.3366 361.021 67.09C361.021 66.8433 361.12 66.6068 361.296 66.4324C361.472 66.258 361.71 66.16 361.959 66.16H367.121C367.37 66.16 367.608 66.258 367.784 66.4324C367.96 66.6068 368.059 66.8433 368.059 67.09Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M354.5 69.2588C354.5 62.9236 359.677 57.79 366.062 57.79C372.447 57.79 377.625 62.9236 377.625 69.2575C377.63 71.9799 376.654 74.6144 374.872 76.6851L379.224 81.0003C379.313 81.0861 379.385 81.1886 379.434 81.3021C379.483 81.4155 379.509 81.5376 379.51 81.661C379.511 81.7845 379.488 81.907 379.441 82.0213C379.394 82.1356 379.324 82.2395 379.236 82.3269C379.148 82.4142 379.043 82.4833 378.928 82.5301C378.813 82.5769 378.69 82.6005 378.565 82.5995C378.441 82.5985 378.318 82.5729 378.203 82.5242C378.089 82.4755 377.985 82.4047 377.899 82.316L373.546 77.9995C371.459 79.7641 368.805 80.7308 366.062 80.725C359.677 80.725 354.5 75.5927 354.5 69.2588ZM366.062 59.65C364.778 59.6295 363.501 59.8629 362.308 60.3365C361.115 60.8101 360.029 61.5146 359.113 62.4087C358.197 63.3029 357.469 64.369 356.973 65.5448C356.476 66.7206 356.221 67.9827 356.221 69.2575C356.221 70.5323 356.476 71.7944 356.973 72.9703C357.469 74.1461 358.197 75.2121 359.113 76.1063C360.029 77.0005 361.115 77.7049 362.308 78.1785C363.501 78.6521 364.778 78.8855 366.062 78.865C367.347 78.8855 368.624 78.6521 369.817 78.1785C371.01 77.7049 372.096 77.0005 373.012 76.1063C373.928 75.2121 374.656 74.1461 375.152 72.9703C375.649 71.7944 375.904 70.5323 375.904 69.2575C375.904 67.9827 375.649 66.7206 375.152 65.5448C374.656 64.369 373.928 63.3029 373.012 62.4087C372.096 61.5146 371.01 60.8101 369.817 60.3365C368.624 59.8629 367.347 59.6295 366.062 59.65Z"
        fill="black"
      />
      <text
        fill="#616161"
        style={{ whiteSpace: "pre" }}
        fontFamily="Inter"
        fontSize="18"
        fontWeight="500"
        letterSpacing="0em"
      >
        <tspan x="395" y="75.5455">
          Search ...
        </tspan>
      </text>
      <defs>
        <clipPath id="clip0_127_266">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(1103 335)"
          />
        </clipPath>
        <clipPath id="clip1_127_266">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(1103 379)"
          />
        </clipPath>
        <clipPath id="clip2_127_266">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(1103 423)"
          />
        </clipPath>
        <clipPath id="clip3_127_266">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(1103 467)"
          />
        </clipPath>
        <clipPath id="clip4_127_266">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(1103 511)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
