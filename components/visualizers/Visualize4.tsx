"use client";

import { useVisualizerStore } from "@/libs/stores/dataStore";
import { PaletteColor } from "@/utils/Types";
import { distributePalette } from "@/utils/utils";

export default function Visualize4({ palette }: { palette: PaletteColor[] }) {
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
      viewBox="0 0 382 363"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M195.17 363C151.391 363 118.851 362.2 95.571 361.244C62.1877 359.871 28.1698 334.785 28.1698 295.635V294.904C28.3368 279.928 35.7934 268.306 45.7549 260.874C55.491 253.599 67.8657 250 79.8229 250H310.517C322.474 250 334.84 253.59 344.585 260.865C354.546 268.315 362.003 279.928 362.161 294.904L362.17 295.635C362.17 334.785 328.152 359.871 294.769 361.244C271.489 362.2 238.949 363 195.17 363Z"
        fill={color5}
        onClick={() => clickHandler(color5)}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.7547 302.18C60.879 292.126 41.9029 294.836 29.6272 298.159C22.0351 300.222 13.4846 299.249 9.32602 290.92C4.10905 280.442 1.51723 266.388 0.30049 253.106C-1.99964 227.939 9.051 202.697 28.4438 196.739C49.2117 190.368 70.1712 195.829 90.6141 213.154C109.324 228.997 126.933 228.997 145.634 213.154C175.511 187.839 206.487 187.839 236.373 213.154C255.074 228.997 272.683 228.997 291.384 213.154C311.827 195.829 332.786 190.368 353.554 196.75C372.947 202.697 384.006 227.939 381.698 253.106C380.481 266.388 377.889 280.453 372.672 290.909C368.522 299.249 359.971 300.222 352.371 298.159C340.104 294.836 321.119 292.126 309.252 302.18C279.367 327.496 248.39 327.496 218.505 302.18C199.804 286.337 182.194 286.337 163.502 302.18C133.608 327.496 102.64 327.496 72.7547 302.18Z"
        fill={color2}
        onClick={() => clickHandler(color2)}
      />
      <path
        d="M373.845 185.717C371.82 169.667 357.095 161.283 340.928 160.517C316.428 159.35 270.861 158 191.345 158C108.62 158 62.6451 159.458 38.8952 160.65C24.4952 161.375 11.3369 168.508 9.17024 182.767C8.37513 188.364 7.988 194.013 8.01191 199.667C8.01191 206.333 8.47024 211.917 9.17857 216.567C11.3452 230.817 24.4952 237.958 38.8952 238.683C62.6451 239.875 108.62 288 191.345 288C270.861 288 316.428 239.983 340.928 238.817C357.095 238.05 371.811 229.667 373.845 213.617C374.361 209.583 374.678 204.95 374.678 199.667C374.678 194.383 374.361 189.75 373.845 185.717Z"
        fill={color3}
        onClick={() => clickHandler(color3)}
      />
      <path
        d="M373.502 173.55C371.477 157.5 356.752 149.117 340.586 148.35C316.086 147.184 270.519 145.834 191.003 145.834C108.278 145.834 62.303 147.292 38.553 148.484C24.153 149.209 10.9947 156.342 8.82807 170.6C8.03296 176.198 7.64583 181.846 7.66974 187.5C7.66974 194.167 8.12808 199.75 8.83641 204.4C11.0031 218.65 24.153 225.792 38.553 226.517C62.303 227.709 108.278 229.167 191.003 229.167C270.519 229.167 316.086 227.817 340.586 226.65C356.752 225.884 371.469 217.5 373.502 201.45C374.019 197.417 374.336 192.784 374.336 187.5C374.336 182.217 374.019 177.584 373.502 173.55Z"
        fill={color4}
        onClick={() => clickHandler(color4)}
      />
      <path
        d="M195.17 0C173.361 0 154.32 0.358332 137.82 0.941665C77.3281 3.06666 28.5031 50.0499 28.5031 111.458C28.5031 125.85 30.1197 138.275 31.8864 147.592C34.9531 163.725 47.8031 175.175 63.6197 177.258C83.9531 179.95 123.703 183.333 195.17 183.333C266.636 183.333 306.386 179.95 326.72 177.266C342.528 175.175 355.386 163.725 358.453 147.592C360.22 138.275 361.836 125.842 361.836 111.458C361.836 50.0499 313.003 3.06666 252.52 0.941665C236.02 0.358332 216.978 0 195.17 0Z"
        fill={color1}
        onClick={() => clickHandler(color1)}
      />
      <g filter="url(#filter0_d_107_2)">
        <path
          d="M287.205 27.0471C287.214 27.0211 287.242 27.0072 287.268 27.016L290.378 28.07C293.865 29.252 295.734 33.0369 294.552 36.524C293.961 38.2675 292.068 39.2018 290.325 38.6108C286.838 37.4289 284.969 33.6439 286.151 30.1569L287.205 27.0471Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_d_107_2)">
        <path
          d="M243.205 20.0471C243.214 20.0211 243.242 20.0072 243.268 20.016L246.378 21.07C249.865 22.252 251.734 26.0369 250.552 29.524C249.961 31.2675 248.068 32.2018 246.325 31.6108C242.838 30.4289 240.969 26.6439 242.151 23.1569L243.205 20.0471Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter2_d_107_2)">
        <path
          d="M259.151 138.157C259.742 136.413 261.634 135.479 263.378 136.07C266.865 137.252 268.734 141.037 267.552 144.524C266.961 146.267 265.068 147.202 263.325 146.611C259.838 145.429 257.969 141.644 259.151 138.157Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter3_d_107_2)">
        <path
          d="M289.151 67.1569C289.742 65.4134 291.634 64.4791 293.378 65.07C296.865 66.252 298.734 70.0369 297.552 73.524C296.961 75.2675 295.068 76.2018 293.325 75.6108C289.838 74.4289 287.969 70.6439 289.151 67.1569Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter4_d_107_2)">
        <path
          d="M84.1509 128.157C84.7419 126.413 86.6343 125.479 88.3779 126.07C91.8649 127.252 93.7335 131.037 92.5516 134.524C91.9606 136.267 90.0682 137.202 88.3246 136.611C84.8376 135.429 82.969 131.644 84.1509 128.157Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter5_d_107_2)">
        <path
          d="M315.151 71.1569C315.742 69.4134 317.634 68.4791 319.378 69.07C322.865 70.252 324.734 74.0369 323.552 77.524C322.961 79.2675 321.068 80.2018 319.325 79.6108C315.838 78.4289 313.969 74.6439 315.151 71.1569Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter6_d_107_2)">
        <path
          d="M152.151 82.1569C152.742 80.4134 154.634 79.4791 156.378 80.07C159.865 81.252 161.734 85.0369 160.552 88.524C159.961 90.2675 158.068 91.2018 156.325 90.6108C152.838 89.4289 150.969 85.6439 152.151 82.1569Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter7_d_107_2)">
        <path
          d="M194.151 82.702C194.742 80.9585 196.634 80.0242 198.378 80.6151C201.865 81.7971 203.734 85.582 202.552 89.069C201.961 90.8126 200.068 91.7469 198.325 91.1559C194.838 89.974 192.969 86.189 194.151 82.702Z"
          fill="white"
        />
      </g>
      <g filter="url(#filter8_d_107_2)">
        <path
          d="M210.129 70.7588C211.693 69.7874 213.748 70.2677 214.719 71.8316C216.662 74.9593 215.701 79.0696 212.574 81.0123C211.01 81.9836 208.955 81.5033 207.983 79.9395C206.041 76.8118 207.001 72.7015 210.129 70.7588Z"
          fill="white"
        />
      </g>
      <circle cx="116.011" cy="274" r="25" fill="white" />
      <circle cx="263.011" cy="274" r="25" fill="white" />
      <circle
        cx="116.011"
        cy="274"
        r="10"
        fill={color1}
        onClick={() => clickHandler(color1)}
      />
      <circle
        cx="263.011"
        cy="274"
        r="10"
        fill={color1}
        onClick={() => clickHandler(color1)}
      />
      <defs>
        <filter
          id="filter0_d_107_2"
          x="285.796"
          y="27.0133"
          width="9.10999"
          height="13.7748"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_107_2"
          x="241.796"
          y="20.0133"
          width="9.10999"
          height="13.7748"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_107_2"
          x="258.796"
          y="135.893"
          width="9.10999"
          height="12.8954"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_107_2"
          x="288.796"
          y="64.8927"
          width="9.10999"
          height="12.8954"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_107_2"
          x="83.7963"
          y="125.893"
          width="9.10999"
          height="12.8954"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_107_2"
          x="314.796"
          y="68.8927"
          width="9.10999"
          height="12.8954"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter6_d_107_2"
          x="151.796"
          y="79.8927"
          width="9.10999"
          height="12.8954"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter7_d_107_2"
          x="193.796"
          y="80.4378"
          width="9.10999"
          height="12.8954"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter8_d_107_2"
          x="206.979"
          y="70.2566"
          width="8.74475"
          height="13.2579"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_107_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_107_2"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
