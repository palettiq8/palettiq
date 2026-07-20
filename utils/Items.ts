import {
  LuActivity,
  LuArrowLeftRight,
  LuArrowUpRight,
  LuBlend,
  LuBolt,
  LuCircleDot,
  LuCloudUpload,
  LuContrast,
  LuCopy,
  LuDroplet,
  LuEye,
  LuGalleryHorizontalEnd,
  LuGrid2X2,
  LuGrid2X2Plus,
  LuHistory,
  LuLink,
  LuMaximize2,
  LuMessageSquare,
  LuPalette,
  LuPanelRight,
  LuPencil,
  LuPencilLine,
  LuPickaxe,
  LuPlus,
  LuScissors,
  LuShrink,
  LuShuffle,
  LuTrash2,
  LuView,
} from "react-icons/lu";
import { RiColorFilterLine } from "react-icons/ri";
import { FaCss3 } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { ColorFamily, Degree, Position } from "./Types";
import { SiTailwindcss } from "react-icons/si";
import {
  BsFiletypeJson,
  BsFiletypePng,
  BsFiletypeScss,
  BsFiletypeSvg,
} from "react-icons/bs";
import { MdDataArray } from "react-icons/md";
import Visualize1 from "@/components/visualizers/Visualize1";
import Visualize2 from "@/components/visualizers/Visualize2";
import Visualize3 from "@/components/visualizers/Visualize3";
import Visualize4 from "@/components/visualizers/Visualize4";
import Visualize5 from "@/components/visualizers/Visualize5";
import Visualize6 from "@/components/visualizers/Visualize6";
import Visualize7 from "@/components/visualizers/Visualize7";
import VisualizeSVG from "@/components/visualizers/VisualizeSVG";

export const headerLinkItems = [
  {
    id: 1,
    title: "Palettes",
    url: "/explore/palettes",
    hideOnTablet: true,
  },
  {
    id: 2,
    title: "Colors",
    url: "/explore/colors",
    hideOnTablet: true,
  },
  {
    id: 3,
    title: "Gradients",
    url: "/explore/gradients",
    hideOnTablet: true,
  },
];

export const features = [
  {
    id: 1,
    title: "Color Palette Generator",
    urlTitle: "Generate Color Palettes",
    icon: LuGrid2X2,
    desc: "Generate personalized color palettes from your selected colors and harmonies. Adjust hue, saturation, and lightness to create pastel, vibrant, or custom palettes instantly.",
    bgColors: ["from-red-600", "to-red-500"],
    oneBgColor: "bg-red-300",
    url: "/studio",
  },
  {
    id: 2,
    title: "Color Palette Visualizer",
    urlTitle: "Visualize Color Palettes",
    icon: LuActivity,
    desc: "Preview color palettes on ready-made UI templates, or upload your own SVG design to see exactly how your colors will look before using them in production.",
    bgColors: ["from-amber-600", "to-amber-500"],
    oneBgColor: "bg-amber-300",
    url: "/studio/color-palette-visualizer",
  },
  {
    id: 3,
    title: "CSS Gradient Generator",
    urlTitle: "Generate CSS Gradients",
    icon: LuCircleDot,
    desc: "Create linear, radial, and conic CSS gradients visually. Customize colors, directions, and stops, then copy production-ready CSS gradient code instantly.",
    bgColors: ["from-lime-600", "to-lime-500"],
    oneBgColor: "bg-lime-300",
    url: "/studio/css-gradient-generator",
  },
  {
    id: 4,
    title: "Color Extractor",
    urlTitle: "Extract Colors from Images",
    icon: LuPickaxe,
    desc: "Extract dominant colors from any image and generate a palette instantly. Get HEX, RGB, and HSL values ready for branding and design projects.",
    bgColors: ["from-green-600", "to-green-500"],
    oneBgColor: "bg-green-300",
    url: "/studio/color-extractor",
  },
  {
    id: 5,
    title: "Color Contrast Checker",
    urlTitle: "Check Color Contrast Ratios",
    icon: LuContrast,
    desc: "Check WCAG AA and AAA color contrast ratios instantly. Test foreground and background combinations for accessible, compliant designs.",
    bgColors: ["from-indigo-600", "to-indigo-500"],
    oneBgColor: "bg-indigo-300",
    url: "/studio/color-contrast-checker",
  },
  {
    id: 6,
    title: "Online Color Picker",
    urlTitle: "Pick Color Online",
    icon: LuPencil,
    desc: "Pick any color online and instantly get HEX, RGB, HSL, CMYK, LAB, LCH, and XYZ values, plus harmonies, tints, shades, and tones.",
    bgColors: ["from-violet-600", "to-violet-500"],
    oneBgColor: "bg-violet-300",
    url: "/studio/online-color-picker",
  },
  {
    id: 7,
    title: "CSS Shadow Generator",
    urlTitle: "Generate CSS Shadows",
    icon: LuDroplet,
    desc: "Create box shadows and text shadows visually. Adjust blur, spread, offset, color, and inset settings, then copy CSS shadow code instantly.",
    bgColors: ["from-purple-600", "to-purple-500"],
    oneBgColor: "bg-purple-300",
    url: "/studio/css-shadow-generator",
  },
];

export const footerItems = [
  { id: 1, title: "Color palette generator", url: "/studio" },
  { id: 2, title: "Online color picker", url: "/studio/online-color-picker" },
  {
    id: 3,
    title: "CSS gradient generator",
    url: "/studio/css-gradient-generator",
  },
  { id: 4, title: "Color extractor", url: "/studio/color-extractor" },
  {
    id: 5,
    title: "Color contrast checker",
    url: "/studio/color-contrast-checker",
  },
  {
    id: 6,
    title: "Color palette visualizer",
    url: "/studio/color-palette-visualizer",
  },
  { id: 7, title: "CSS shadow generator", url: "/studio/css-shadow-generator" },
  { id: 8, title: "Explore palettes", url: "/explore/palettes" },
  { id: 9, title: "Explore colors", url: "/explore/colors" },
  { id: 10, title: "Explore gradients", url: "/explore/gradients" },
  { id: 11, title: "Blog", url: "/blog" },
  { id: 12, title: "About us", url: "/about-us" },
  { id: 13, title: "Settings", url: "/settings" },
  { id: 14, title: "Help center", url: "/help-center" },
  { id: 15, title: "Feedback", url: "/settings/feedback" },
  { id: 16, title: "Twitter / X", url: "https://x.com/palettiq" },
  {
    id: 17,
    title: "Pinterest",
    url: "https://www.pinterest.com/palettiq8/_created/",
  },
  {
    id: 18,
    title: "Instagram",
    url: "https://www.instagram.com/palett.iq/",
  },
  {
    id: 19,
    title: "Linkedin",
    url: "https://www.linkedin.com/company/palettiq/",
  },
  {
    id: 20,
    title: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61589009866760/",
  },
  { id: 21, title: "Terms & conditions", url: "/terms-and-conditions" },
  { id: 22, title: "Privacy policy", url: "/privacy-policy" },
  { id: 23, title: "Cookie policy", url: "/cookie-policy" },
];
export const footerSectionItems = [
  { id: 1, title: "Studio Services", data: footerItems.slice(0, 7) },
  { id: 2, title: "Explore Services", data: footerItems.slice(7, 10) },
  { id: 3, title: "Resources", data: footerItems.slice(10, 15) },
  { id: 4, title: "Social Links", data: footerItems.slice(15, 20) },
  { id: 5, title: "Legal", data: footerItems.slice(20, 23) },
];
export const paletteMoreItems = [
  { id: 1, title: "Copy", icon: LuCopy },
  { id: 2, title: "Quick view", icon: LuEye },
  { id: 3, title: "View details", icon: LuView },
  { id: 4, title: "Edit on generator", icon: LuPencilLine },
  { id: 5, title: "Make gradient", icon: LuCircleDot },
  { id: 6, title: "Open on screen", icon: LuMaximize2 },
  { id: 7, title: "View mode", icon: LuShrink },
  { id: 8, title: "Open on visualizer", icon: LuActivity },
  { id: 9, title: "Explore similar", icon: LuArrowUpRight },
  { id: 10, title: "Export", icon: BiExport },
];
export const gradientMoreItems = [
  { id: 1, title: "Copy CSS", icon: LuCopy },
  { id: 2, title: "Quick view", icon: LuEye },
  { id: 3, title: "View details", icon: LuView },
  { id: 4, title: "Open on gradient", icon: LuCircleDot },
  { id: 5, title: "Open on generator", icon: LuGrid2X2Plus },
  { id: 6, title: "Open on screen", icon: LuMaximize2 },
  { id: 7, title: "View mode", icon: LuShrink },
  { id: 8, title: "Export", icon: BiExport },
];
export const generatorContentHeaderMoreItems = [
  { id: 1, title: "Copy", icon: LuCopy },
  { id: 2, title: "History", icon: LuHistory },
  { id: 3, title: "Harmonies", icon: LuBlend },
  { id: 4, title: "View mode", icon: LuShrink },
  { id: 5, title: "Quick view", icon: LuEye },
  { id: 6, title: "Make gradient", icon: LuCircleDot },
  { id: 7, title: "Open on screen", icon: LuMaximize2 },
  { id: 8, title: "Add to community", icon: LuPlus },
  { id: 9, title: "Visualize the palette", icon: LuActivity },
  { id: 10, title: "Export", icon: BiExport },
];
export const pickerResponsiveMoreMenuItems = [
  { id: 1, title: "History", icon: LuHistory },
  { id: 2, title: "Open on screen", icon: LuMaximize2 },
  { id: 3, title: "Export", icon: BiExport },
];
export const gradientResponsiveMoreMenuItems = [
  { id: 1, title: "History", icon: LuHistory },
  { id: 2, title: "Quick view", icon: LuEye },
  { id: 3, title: "Open on screen", icon: LuMaximize2 },
  { id: 4, title: "Export", icon: BiExport },
];
export const extractorResponsiveMoreMenuItems = [
  { id: 1, title: "History", icon: LuHistory },
  { id: 2, title: "Quick view", icon: LuEye },
  { id: 3, title: "Open on screen", icon: LuMaximize2 },
  { id: 4, title: "Edit on generator", icon: LuPencilLine },
  { id: 5, title: "Export", icon: BiExport },
];
export const contrastResponsiveMoreMenuItems = [
  { id: 1, title: "History", icon: LuHistory },
  { id: 2, title: "Alter color", icon: LuArrowLeftRight },
  { id: 3, title: "Open on screen", icon: LuMaximize2 },
  { id: 4, title: "Export", icon: BiExport },
];
export const visualizerResponsiveMoreMenuItems = [
  { id: 1, title: "History", icon: LuHistory },
  { id: 2, title: "Quick view", icon: LuEye },
  { id: 3, title: "Shuffle palette", icon: LuShuffle },
  { id: 4, title: "Upload SVG", icon: LuCloudUpload },
  { id: 5, title: "Edit on generator", icon: LuPencilLine },
  { id: 6, title: "Open on screen", icon: LuMaximize2 },
  { id: 7, title: "Make gradient", icon: LuCircleDot },
  { id: 8, title: "Templetes", icon: LuPanelRight },
  { id: 9, title: "Export", icon: BiExport },
];
export const shadowResponsiveMoreMenuItems = [
  { id: 1, title: "Open on screen", icon: LuMaximize2 },
  { id: 2, title: "Export", icon: BiExport },
];
export const paletteDetailsMenuItems = [
  { id: 1, title: "Copy", icon: LuCopy },
  { id: 2, title: "Quick view", icon: LuEye },
  { id: 3, title: "View mode", icon: LuShrink },
  { id: 4, title: "Edit on generator", icon: LuPencilLine },
  { id: 5, title: "Open on screen", icon: LuMaximize2 },
  { id: 6, title: "Make gradient", icon: LuCircleDot },
  { id: 7, title: "Visualize the palette", icon: LuActivity },
  { id: 8, title: "Export", icon: BiExport },
];
export const colorFamilies: Record<string, ColorFamily> = {
  Black: { hue: [0, 360], sat: [0, 50], light: [0, 30] },
  White: { hue: [0, 360], sat: [0, 30], light: [80, 100] },
  Gray: { hue: [0, 360], sat: [0, 10], light: [25, 85] },
  Red: { hue: [350, 10], sat: [70, 100], light: [20, 80] },
  Orange: { hue: [20, 40], sat: [70, 100], light: [30, 80] },
  Yellow: { hue: [45, 65], sat: [70, 100], light: [40, 85] },
  Lime: { hue: [70, 140], sat: [60, 100], light: [30, 80] },
  Green: { hue: [90, 150], sat: [60, 100], light: [20, 70] },
  Cyan: { hue: [160, 190], sat: [60, 100], light: [40, 80] },
  Blue: { hue: [200, 240], sat: [60, 100], light: [20, 70] },
  Indigo: { hue: [245, 275], sat: [50, 100], light: [20, 60] },
  Violet: { hue: [270, 295], sat: [50, 100], light: [30, 70] },
  Purple: { hue: [300, 320], sat: [50, 100], light: [20, 70] },
  Pink: { hue: [320, 355], sat: [60, 100], light: [40, 90] },
  Brown: { hue: [0, 30], sat: [40, 70], light: [20, 45] },
};
export const palettesCount = [
  "1 Palette",
  "2 Palettes",
  "3 Palettes",
  "4 Palettes",
  "5 Palettes",
  "6 Palettes",
];
export const quickViewTabItems = [
  { id: 1, title: "Formats" },
  { id: 2, title: "Tints" },
  { id: 3, title: "Shades" },
  { id: 4, title: "Tones" },
  { id: 5, title: "Harmonies" },
];
export const defaultGradients = [
  [
    { id: "1", color: "#FF6B6B", isHide: false, position: 0 },
    { id: "2", color: "#FFE66D", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#A18CD1", isHide: false, position: 0 },
    { id: "2", color: "#FBC2EB", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#43E97B", isHide: false, position: 0 },
    { id: "2", color: "#38F9D7", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#F7971E", isHide: false, position: 0 },
    { id: "2", color: "#FFD200", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#4FACFE", isHide: false, position: 0 },
    { id: "2", color: "#00F2FE", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#F953C6", isHide: false, position: 0 },
    { id: "2", color: "#B91D73", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#667EEA", isHide: false, position: 0 },
    { id: "2", color: "#764BA2", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#11998E", isHide: false, position: 0 },
    { id: "2", color: "#38EF7D", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#FC5C7D", isHide: false, position: 0 },
    { id: "2", color: "#6A3093", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#F5AF19", isHide: false, position: 0 },
    { id: "2", color: "#F12711", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#1D976C", isHide: false, position: 0 },
    { id: "2", color: "#93F9B9", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#E96443", isHide: false, position: 0 },
    { id: "2", color: "#904E95", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#00C6FF", isHide: false, position: 0 },
    { id: "2", color: "#0072FF", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#FDC830", isHide: false, position: 0 },
    { id: "2", color: "#F37335", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#C94B4B", isHide: false, position: 0 },
    { id: "2", color: "#4B134F", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#56CCF2", isHide: false, position: 0 },
    { id: "2", color: "#2F80ED", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#EECDA3", isHide: false, position: 0 },
    { id: "2", color: "#EF629F", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#7F7FD5", isHide: false, position: 0 },
    { id: "2", color: "#91EAE4", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#134E5E", isHide: false, position: 0 },
    { id: "2", color: "#71B280", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#FF0099", isHide: false, position: 0 },
    { id: "2", color: "#493240", isHide: false, position: 100 },
  ],
  [
    { id: "1", color: "#5C258D", isHide: false, position: 0 },
    { id: "2", color: "#4389A2", isHide: false, position: 100 },
  ],
];
export const gradientContainerSizes = [
  { content: "10%", width: "10%", height: "10%" },
  { content: "30%", width: "30%", height: "30%" },
  { content: "40%", width: "40%", height: "40%" },
  { content: "60%", width: "60%", height: "60%" },
  { content: "80%", width: "80%", height: "80%" },
  { content: "90%", width: "90%", height: "90%" },
  { content: "100%", width: "100%", height: "100%" },
];
export const colorCountMenuItems = [
  "2 Colors",
  "3 Colors",
  "4 Colors",
  "5 Colors",
  "6 Colors",
  "7 Colors",
  "8 Colors",
  "9 Colors",
  "10 Colors",
];

export const tags = [
  "#technology",
  "#finance&banking",
  "#healthcare&medical",
  "#education",
  "#retail&ecommerce",
  "#manufacturing",
  "#agriculture&farming",
  "#food&beverage",
  "#entertainment&media",
  "#realestate",
  "#transportation",
  "#energy&utilities",
  "#hospitality&tourism",
  "#fashion&apparel",
  "#beauty&personalcare",
  "#automotive",
  "#government&publicsector",
  "#nonprofit&ngo",
  "#sports&fitness",
  "#telecom",
  "#science&research",
  "#legal&consulting",
  "#arts&creative",
  "#home",
  "#cryptocurrency",
  "#black",
  "#white",
  "#gray",
  "#red",
  "#orange",
  "#yellow",
  "#lime",
  "#green",
  "#cyan",
  "#blue",
  "#indigo",
  "#violet",
  "#purple",
  "#pink",
  "#brown",
  "#calm",
  "#relaxed",
  "#peaceful",
  "#energetic",
  "#focused",
  "#motivated",
  "#confident",
  "#happy",
  "#friendly",
  "#elegant",
  "#luxury",
  "#premium",
  "#modern",
  "#minimal",
  "#professional",
  "#corporate",
  "#creative",
  "#artistic",
  "#bold",
  "#powerful",
  "#trustworthy",
  "#secure",
  "#futuristic",
  "#innovative",
  "#natureinspired",
  "#organic",
  "#vintage",
  "#retro",
  "#mysterious",
  "#romantic",
  "#sophisticated",
  "#verylight",
  "#light",
  "#softlight",
  "#balanced",
  "#medium",
  "#dark",
  "#verydark",
  "#pastel",
  "#soft",
  "#muted",
  "#moderate",
  "#rich",
  "#vibrant",
  "#intense",
  "#neon",
  "#lightmode",
  "#darkmode",
  "#light&darkboth",
  "#branding",
  "#logodesign",
  "#websiteui",
  "#landingpage",
  "#mobileappui",
  "#dashboardoradminpanel",
  "#ecommercewebsite",
  "#socialmediagraphics",
  "#presentationorslides",
  "#posterdesign",
  "#marketingmaterials",
  "#illustration",
  "#infographics",
  "#gameui",
  "#videomotiongraphics",
  "#productpackaging",
  "#printdesign",
  "#interiordesign",
  "#fashiondesign",
  "#generalpurpose",
  "#analogous",
  "#monochromatic",
  "#complementary",
  "#doublesplitcomplementary",
  "#rectangle",
  "#splitcomplementary",
  "#tetradic",
  "#triadic",
];
export const industries = [
  "Technology",
  "Finance_&_Banking",
  "Healthcare_&_Medical",
  "Education",
  "Retail_&_Ecommerce",
  "Manufacturing",
  "Agriculture_&_Farming",
  "Food_&_Beverage",
  "Entertainment_&_Media",
  "Real_Estate",
  "Transportation",
  "Energy_&_Utilities",
  "Hospitality_&_Tourism",
  "Fashion_&_Apparel",
  "Beauty_&_Personal_Care",
  "Automotive",
  "Government_&_Public_Sector",
  "Non_Profit_&_NGO",
  "Sports_&_Fitness",
  "Telecom",
  "Science_&_Research",
  "Legal_&_Consulting",
  "Arts_&_Creative",
  "Home",
  "Cryptocurrency",
];
export const preferredColors = [
  { id: 1, name: "Black", hex: "#000000" },
  { id: 2, name: "White", hex: "#FFFFFF" },
  { id: 3, name: "Gray", hex: "#808080" },
  { id: 4, name: "Red", hex: "#FF0000" },
  { id: 5, name: "Orange", hex: "#FFA500" },
  { id: 6, name: "Yellow", hex: "#FFFF00" },
  { id: 7, name: "Lime", hex: "#00FF00" },
  { id: 8, name: "Green", hex: "#008000" },
  { id: 9, name: "Cyan", hex: "#00FFFF" },
  { id: 10, name: "Blue", hex: "#0000FF" },
  { id: 11, name: "Indigo", hex: "#4B0082" },
  { id: 12, name: "Violet", hex: "#8F00FF" },
  { id: 13, name: "Purple", hex: "#800080" },
  { id: 14, name: "Pink", hex: "#FFC0CB" },
  { id: 15, name: "Brown", hex: "#A52A2A" },
];
export const moods = [
  "Calm",
  "Relaxed",
  "Peaceful",
  "Energetic",
  "Focused",
  "Motivated",
  "Confident",
  "Happy",
  "Friendly",
  "Elegant",
  "Luxury",
  "Premium",
  "Modern",
  "Minimal",
  "Professional",
  "Corporate",
  "Creative",
  "Artistic",
  "Bold",
  "Powerful",
  "Trustworthy",
  "Secure",
  "Futuristic",
  "Innovative",
  "Nature_Inspired",
  "Organic",
  "Vintage",
  "Retro",
  "Mysterious",
  "Romantic",
  "Sophisticated",
];
export const brightnessLevels = [
  "Very_Light",
  "Light",
  "Soft_Light",
  "Balanced",
  "Medium",
  "Dark",
  "Very_Dark",
];
export const saturationLevels = [
  "Pastel",
  "Soft",
  "Muted",
  "Moderate",
  "Rich",
  "Vibrant",
  "Intense",
  "Neon",
];
export const modes = ["Light_Mode", "Dark_Mode", "Light_&_Dark_Both"];
export const useCases = [
  "Branding",
  "Logo_Design",
  "Website_UI",
  "Landing_Page",
  "Mobile_App_UI",
  "Dashboard_or_Admin_Panel",
  "Ecommerce_Website",
  "Social_Media_Graphics",
  "Presentation_or_Slides",
  "Poster_Design",
  "Marketing_Materials",
  "Illustration",
  "Infographics",
  "Game_UI",
  "Video_or_Motion_Graphics",
  "Product_Packaging",
  "Print_Design",
  "Interior_Design",
  "Fashion_Design",
  "General_Purpose",
];
export const colorHarmonies = [
  { id: 1, title: "Analogous", harmony: "analogous" },
  { id: 2, title: "Monochromatic", harmony: "monochromatic" },
  { id: 3, title: "Complementary", harmony: "complementary" },
  {
    id: 4,
    title: "Double_Split_Complementary",
    harmony: "double-split-complementary",
  },
  { id: 5, title: "Rectangle", harmony: "rectangle" },
  { id: 6, title: "Split_Complementary", harmony: "split-complementary" },
  { id: 7, title: "Tetradic", harmony: "tetradic" },
  { id: 8, title: "Triadic", harmony: "triadic" },
];
export const exportMethods = [
  { icon: FaCss3, method: "CSS" },
  { icon: SiTailwindcss, method: "Tailwind CSS" },
  { icon: BsFiletypeScss, method: "SCSS" },
  { icon: LuCircleDot, method: "Gradient CSS" },
  { icon: BsFiletypeJson, method: "JSON" },
  { icon: BsFiletypeSvg, method: "SVG" },
  { icon: MdDataArray, method: "Array" },
  { icon: LuLink, method: "Share Studio Link" },
  { icon: BsFiletypePng, method: "PNG Image" },
];
export const exportShadowMethods = [
  { icon: FaCss3, method: "CSS" },
  { icon: SiTailwindcss, method: "Tailwind CSS" },
  { icon: BsFiletypeScss, method: "SCSS" },
  { icon: BsFiletypeJson, method: "JSON" },
  { icon: BsFiletypeSvg, method: "SVG" },
];
export const positions: Position[] = [
  { title: "0%", value: 0 },
  { title: "10%", value: 10 },
  { title: "20%", value: 20 },
  { title: "30%", value: 30 },
  { title: "40%", value: 40 },
  { title: "50%", value: 50 },
  { title: "60%", value: 60 },
  { title: "70%", value: 70 },
  { title: "80%", value: 80 },
  { title: "85%", value: 85 },
  { title: "90%", value: 90 },
  { title: "100%", value: 100 },
];
export const degrees: Degree[] = [
  { title: "0°", value: 0 },
  { title: "15°", value: 15 },
  { title: "30°", value: 30 },
  { title: "45°", value: 45 },
  { title: "75°", value: 70 },
  { title: "90°", value: 90 },
  { title: "105°", value: 105 },
  { title: "120°", value: 120 },
  { title: "150°", value: 150 },
  { title: "180°", value: 180 },
  { title: "210°", value: 210 },
  { title: "230°", value: 230 },
  { title: "250°", value: 250 },
  { title: "270°", value: 270 },
  { title: "300°", value: 300 },
  { title: "330°", value: 330 },
  { title: "345°", value: 345 },
  { title: "360°", value: 360 },
];
export const gradientStopMoreMenuItems = [
  { id: 1, title: "Show/Hide", icon: LuScissors },
  { id: 2, title: "Remove stop", icon: LuTrash2 },
];
export const studioLeftFooterMenuItems = [
  {
    id: 1,
    title: "Explore palettes",
    icon: LuPalette,
    url: "/explore/palettes",
  },
  {
    id: 2,
    title: "Explore colors",
    icon: LuGalleryHorizontalEnd,
    url: "/explore/colors",
  },
  {
    id: 3,
    title: "Explore gradients",
    icon: RiColorFilterLine,
    url: "/explore/gradients",
  },
  { id: 4, title: "Settings", icon: LuBolt, url: "/settings" },
  {
    id: 5,
    title: "Feedback",
    icon: LuMessageSquare,
    url: "/settings/feedback",
  },
];
export const settingsMenuItems = [
  { id: 1, title: "General", url: "/settings" },
  { id: 2, title: "Updates", url: "/settings/updates" },
  { id: 3, title: "Feedback", url: "/settings/feedback" },
];
export const generalQuestions = [
  {
    title: "What is PalettIQ?",
    content:
      "PalettIQ is a smart color tool designed for designers, developers, and anyone who works with colors. It helps you generate color palettes from your preferred colors and harmonies, with full control over hue, saturation, and lightness. You can also explore ready-made palettes filtered by mood, use case, and more. Beyond palettes, PalettIQ offers gradient generation, color contrast checking, color extraction from images, and much more, making it a complete toolkit for working with colors.",
  },
  {
    title: "Who is PalettIQ for?",
    content:
      "PalettIQ is designed for designers, developers, and creators who work with colors. Whether you're building a UI, branding a product, or just exploring color ideas, PalettIQ helps streamline your workflow.",
  },
  {
    title: "Is PalettIQ free to use?",
    content:
      "Yes, PalettIQ offers free access to its core features, including palette creation, exploration, and exporting. Additional features may be introduced in the future.",
  },
  {
    title: "Do I need an account to use PalettIQ?",
    content:
      "No, you don’t need an account to use PalettIQ. All current features are available without signing up, so you can explore, generate, and use palettes freely. Account-based features like saving palettes or creating projects may be introduced in future updates.",
  },
  {
    title: "What makes PalettIQ different from other palette tools?",
    content:
      "PalettIQ lets you generate palettes from your preferred colors and harmonies with full HSL control, so results match your exact vision — not random shuffles. You can also explore ready-made palettes filtered by mood, use case, and more. It also provides additional tools like gradient generation, contrast checking, and color extraction, making it more than just a basic palette generator.",
  },
  {
    title: "Can beginners use PalettIQ easily?",
    content:
      "Yes, PalettIQ is designed to be simple and intuitive, so beginners can easily explore and generate palettes without needing prior experience.",
  },
  {
    title: "Is PalettIQ available on mobile devices?",
    content:
      "PalettIQ is currently available as a web application and works on modern mobile browsers. A dedicated mobile app is not available yet but may be introduced in the future.",
  },
  {
    title: "Do I need design experience to use PalettIQ?",
    content:
      "No, you don’t need design experience. PalettIQ helps guide you with tools and options that make working with colors easier for everyone.",
  },
  {
    title: "Can I use PalettIQ for professional projects?",
    content:
      "Yes, you can use palettes and colors from PalettIQ in both personal and professional projects, including design and development work.",
  },
  {
    title: "Is my data safe on PalettIQ?",
    content:
      "PalettIQ aims to handle user data responsibly and securely. Currently, since no account or personal data storage system is required, your usage remains minimal and safe. Any future features involving user data will be designed with security and privacy in mind.",
  },
];
export const paletteAndColorsQuestions = [
  {
    title: "How do I create a color palette?",
    content:
      "Go to the Generator section and click the 'Generate Palette' button or press Enter to create a palette instantly. You can also customize your results by selecting preferred colors and adjusting each color’s Hue, Saturation, and Lightness (HSL) values before generating.",
  },
  {
    title: "Can I edit an existing palette?",
    content:
      "Palettes created in the Generator can be edited directly. Explore palettes are read-only, but you can open them in the Generator to customize and edit them. More improvements and features may be added in future updates.",
  },
  {
    title: "How many colors can I add to a palette?",
    content:
      "You can add a minimum of 2 and a maximum of 10 colors to a palette.",
  },
  {
    title: "Can I generate random palettes?",
    content:
      "Yes, you can generate random palettes. By default, the generator creates random palettes with a variety of colors. You can also customize the result by selecting your preferred colors and adjusting Hue, Saturation, and Lightness (HSL) to generate a palette that fits your needs.",
  },
  {
    title: "How do I copy a color code?",
    content:
      "You can copy a color by simply clicking on it — the HEX code is copied instantly. In some cases, a quick view panel opens where you can copy the color in different formats. You’ll also find copy buttons in various places throughout the app for quick access.",
  },
  {
    title: "Does PalettIQ support HEX, RGB, and HSL formats?",
    content:
      "Yes, PalettIQ supports HEX, RGB, and HSL formats. You can view and copy colors in different formats depending on your needs.",
  },
  {
    title: "Can I lock specific colors while generating palettes?",
    content: "Yes, you can lock one or more colors while generating a palette.",
  },
  {
    title: "Can I duplicate a palette?",
    content:
      "No, duplicating palettes is not supported. Each palette is generated or created uniquely, and duplicate actions are not available at the moment.",
  },
  {
    title: "Can I publish palettes?",
    content: "Yes, you can publish palettes even without creating an account.",
  },
  {
    title: "How can I see my published palettes?",
    content:
      "Currently, there is no dedicated section to view your published palettes. However, you can find published palettes in the Explore section using search. A dedicated account-based system to manage and view your published palettes may be added in the future.",
  },
  {
    title: "Can I save palettes for later use?",
    content:
      "Currently, saving palettes for later use is not available. However, this feature may be added in the future.",
  },
  {
    title: "How can I delete my published palettes?",
    content:
      "To delete a published palette, please search for the palette in the Explore section and contact our support team via email with the palette name. We will take care of the deletion for you.",
  },
  {
    title: "Can I import colors from an image or external source?",
    content:
      "Yes, you can import colors from images using the Color Extractor tool. Simply upload an image, extract colors as a palette, and open it in the Generator.",
  },
];
export const paletteFiltersQuestions = [
  {
    title: "How do I search for palettes?",
    content:
      "Use the search bar in the Explore section to find palettes by name.",
  },
  {
    title: "Can I filter palettes by color or mood?",
    content: "Yes, you can filter palettes by color, mood, use case, and more.",
  },
  {
    title: "Can I combine multiple filters at once?",
    content:
      "Yes, you can combine multiple filters at once. Filters work together, meaning each new filter is applied on top of the existing results. For example, if you select preferred colors like black and white, only matching palettes are shown. If you then apply another filter, it will further narrow down results from those already filtered palettes.",
  },
  {
    title: "How do I reset or clear filters?",
    content:
      "Click the 'Clear all' button at the bottom of the filter model to reset all filters.",
  },
  {
    title: "Can I filter palettes by brightness or saturation?",
    content: "Yes.",
  },
  {
    title: "Why am I not seeing relevant palettes?",
    content:
      "You may not see relevant palettes if no matches are available or due to active filters. Try adjusting your search or filters, or report the issue if it persists.",
  },
  {
    title: "Can I search using keywords or color names?",
    content:
      "You can search by palette name or color name. Keyword search is not supported at the moment.",
  },
];
export const exportAndUsageQuestions = [
  {
    title: "Can I export palettes as CSS?",
    content: "Yes.",
  },
  {
    title: "Can I download palettes as images (PNG)?",
    content: "Yes.",
  },
  {
    title: "Can I export palettes from explore?",
    content: "Yes.",
  },
  {
    title: "What is “download without hex” option?",
    content:
      "The “Download without hex” option lets you download the palette as an image without showing HEX color codes. If it’s turned off, the HEX codes will be included in the downloaded image.",
  },
  {
    title: "Can I use these palettes in my design tools?",
    content: "Yes, absolutely.",
  },
  {
    title: "Are palettes safe for commercial use?",
    content: "Yes.",
  },
  {
    title: "What formats are available for export?",
    content:
      "CSS, Tailwind CSS, SCSS, Gradient CSS, JSON, SVG, and Array. You can also download as images or share palette links.",
  },
  {
    title: "Can I copy all colors in a palette at once?",
    content: "Yes, you can copy all colors at once in array format.",
  },
  {
    title:
      "Can I export palettes with different color formats (HEX, RGB, HSL)?",
    content:
      "Yes, you can export palettes in JSON format with HEX, RGB, or HSL.",
  },
  {
    title: "Can I use exported palettes in code projects?",
    content: "Yes, exported palettes are ready to use in code projects.",
  },
  {
    title: "Will exported images keep the same color accuracy?",
    content: "Yes.",
  },
];
export const settingsAndPreferencesQuestions = [
  {
    title: "How do I reset my preferences?",
    content:
      "Go to Settings → General and scroll down to find the reset option.",
  },
  {
    title: "What happens when I reset preferences?",
    content:
      "All preferences, filters, and configurations will be reset to default.",
  },
  {
    title: "Are my preferences saved automatically?",
    content:
      "Yes, all preferences are saved locally and persist even after reload.",
  },
  {
    title: "Can I change my preferences later?",
    content: "Yes, you can update your preferences anytime.",
  },
  {
    title: "Can I turn off product update emails?",
    content:
      "Yes, you can request to unsubscribe by emailing our support (hello@palettiq.net). Our team will remove your email from the update list.",
  },
];
export const updateAndAccountsQuestions = [
  {
    title: "How do I subscribe to product updates?",
    content: "Go to Settings → Updates and subscribe using your email address.",
  },
  {
    title: "Why am I not receiving update emails?",
    content:
      "You may not be subscribed yet, or there could be a temporary issue with the email system.",
  },
  {
    title: "Do I need an account to receive updates?",
    content:
      "No, you don’t need an account. You can subscribe using your email address.",
  },
  {
    title: "Can I change my email address?",
    content:
      "You cannot change a subscribed email address directly. However, you can contact support to remove it and subscribe again with a new email. You can also add multiple email addresses if needed.",
  },
  {
    title: "Is my email shared with third parties?",
    content: "No, your email is not shared with third parties.",
  },
  {
    title: "Why doesn’t PalettIQ require user accounts like other platforms?",
    content:
      "PalettIQ is designed to prioritize fast and powerful palette generation and exploration over account-based management. Instead of focusing on saving or organizing content behind accounts, it focuses on delivering the best possible creative output with minimal friction. Users can always request an account system or other features through the feedback section.",
  },
];
export const visualizers = [
  VisualizeSVG,
  Visualize6,
  Visualize7,
  Visualize4,
  Visualize1,
  Visualize2,
  Visualize5,
  Visualize3,
];
export const homeFAQQuestions = [
  {
    title: "Is PalettIQ free to use?",
    content:
      "Yes, PalettIQ offers free access to its core features, including palette creation, exploration, and exporting. Additional features may be introduced in the future.",
  },
  {
    title: "Do I need an account to use PalettIQ?",
    content:
      "No, you don’t need an account to use PalettIQ. All current features are available without signing up, so you can explore, generate, and use palettes freely. Account-based features like saving palettes or creating projects may be introduced in future updates.",
  },
  {
    title: "What makes PalettIQ different from other palette tools?",
    content:
      "PalettIQ lets you generate palettes from your preferred colors and harmonies with full HSL control, so results match your exact vision — not random shuffles. You can also explore ready-made palettes filtered by mood, use case, and more. It also provides additional tools like gradient generation, contrast checking, and color extraction, making it more than just a basic palette generator.",
  },
  {
    title: "Can I use PalettIQ for professional projects?",
    content:
      "Yes, you can use palettes and colors from PalettIQ in both personal and professional projects, including design and development work.",
  },
  {
    title: "Is my data safe on PalettIQ?",
    content:
      "PalettIQ aims to handle user data responsibly and securely. Currently, since no account or personal data storage system is required, your usage remains minimal and safe. Any future features involving user data will be designed with security and privacy in mind.",
  },
  {
    title: "How do I create a color palette?",
    content:
      "Go to the Generator section and click the 'Generate Palette' button or press Enter to create a palette instantly. You can also customize your results by selecting preferred colors and adjusting each color’s Hue, Saturation, and Lightness (HSL) values before generating.",
  },
  {
    title: "Can I generate random palettes?",
    content:
      "Yes, you can generate random palettes. By default, the generator creates random palettes with a variety of colors. You can also customize the result by selecting your preferred colors and adjusting Hue, Saturation, and Lightness (HSL) to generate a palette that fits your needs.",
  },
  {
    title: "How do I copy a color code?",
    content:
      "You can copy a color by simply clicking on it — the HEX code is copied instantly. In some cases, a quick view panel opens where you can copy the color in different formats. You’ll also find copy buttons in various places throughout the app for quick access.",
  },
  {
    title: "Does PalettIQ support HEX, RGB, and HSL formats?",
    content:
      "Yes, PalettIQ supports HEX, RGB, and HSL formats. You can view and copy colors in different formats depending on your needs.",
  },
  {
    title: "Can I duplicate a palette?",
    content:
      "No, duplicating palettes is not supported. Each palette is generated or created uniquely, and duplicate actions are not available at the moment.",
  },
  {
    title: "Can I publish palettes?",
    content: "Yes, you can publish palettes even without creating an account.",
  },
  {
    title: "How can I delete my published palettes?",
    content:
      "To delete a published palette, please search for the palette in the Explore section and contact our support team via email with the palette name. We will take care of the deletion for you.",
  },
  {
    title: "Why am I not seeing relevant palettes?",
    content:
      "You may not see relevant palettes if no matches are available or due to active filters. Try adjusting your search or filters, or report the issue if it persists.",
  },
  {
    title: "Can I search using keywords or color names?",
    content:
      "You can search by palette name or color name. Keyword search is not supported at the moment.",
  },
  {
    title: "Are palettes safe for commercial use?",
    content: "Yes.",
  },
  {
    title: "What formats are available for export?",
    content:
      "CSS, Tailwind CSS, SCSS, Gradient CSS, JSON, SVG, and Array. You can also download as images or share palette links.",
  },
  {
    title: "How do I reset my preferences?",
    content:
      "Go to Settings → General and scroll down to find the reset option.",
  },
  {
    title: "How do I subscribe to product updates?",
    content: "Go to Settings → Updates and subscribe using your email address.",
  },
  {
    title: "Why doesn’t PalettIQ require user accounts like other platforms?",
    content:
      "PalettIQ is designed to prioritize fast and powerful palette generation and exploration over account-based management. Instead of focusing on saving or organizing content behind accounts, it focuses on delivering the best possible creative output with minimal friction. Users can always request an account system or other features through the feedback section.",
  },
];

export const blogs = [
  {
    id: 1,
    title:
      "Color theory basics: a beginner's guide for designers and developers",
    category: "Fundamentals",
    url: "/blog/color-theory-basics-a-beginners-guide-for-designers-and-developers",
    author: "PalettIQ Team",
    date: "19 July, 2026",
  },
  {
    id: 2,
    title: "RGB vs HSL vs HEX: which color format should you actually use?",
    category: "Fundamentals",
    url: "/blog/rgb-vs-hsl-vs-hex-which-color-format-should-you-actually-use",
    author: "PalettIQ Team",
    date: "19 July, 2026",
  },
  {
    id: 3,
    title: "What is a color palette and how many colors do you actually need?",
    category: "Fundamentals",
    url: "/blog/what-is-a-color-palette-and-how-many-colors-do-you-actually-need",
    author: "PalettIQ Team",
    date: "19 July, 2026",
  },
  {
    id: 4,
    title: "Complementary, analogous, triadic: every color harmony explained",
    category: "Fundamentals",
    url: "/blog/complementary-analogous-triadic-every-color-harmony-explained",
    author: "PalettIQ Team",
    date: "18 July, 2026",
  },
  {
    id: 5,
    title: "Warm vs cool colors: how to choose the right mood for your brand",
    category: "Fundamentals",
    url: "/blog/warm-vs-cool-colors-how-to-choose-the-right-mood-for-your-brand",
    author: "PalettIQ Team",
    date: "9 July, 2026",
  },
  {
    id: 6,
    title: "WCAG color contrast explained: what 4.5:1 actually means",
    category: "Accessibility",
    url: "/blog/wcag-color-contrast-explained-what-4-5-1-actually-means",
    author: "PalettIQ Team",
    date: "17 July, 2026",
  },
  {
    id: 7,
    title: "How to design a color-blind friendly UI (with real examples)",
    category: "Accessibility",
    url: "/blog/how-to-design-a-color-blind-friendly-ui-with-real-examples",
    author: "PalettIQ Team",
    date: "17 July, 2026",
  },
  {
    id: 8,
    title: "Accessible color palettes: a checklist before you ship",
    category: "Accessibility",
    url: "/blog/accessible-color-palettes-a-checklist-before-you-ship",
    author: "PalettIQ Team",
    date: "16 July, 2026",
  },
  {
    id: 9,
    title: "How to extract a color palette from an image (step-by-step)",
    category: "Tutorials",
    url: "/blog/how-to-extract-a-color-palette-from-an-image-step-by-step",
    author: "PalettIQ Team",
    date: "16 July, 2026",
  },
  {
    id: 10,
    title: "How to build a CSS gradient that doesn't look dated in 2026",
    category: "Tutorials",
    url: "/blog/how-to-build-a-css-gradient-that-doesnt-look-dated-in-2026",
    author: "PalettIQ Team",
    date: "16 July, 2026",
  },
  {
    id: 11,
    title: "How to recolor SVG icons instantly using PalettIQ's visualizer",
    category: "Tutorials",
    url: "/blog/how-to-recolor-svg-icons-instantly-using-palettiqs-visualizer",
    author: "PalettIQ Team",
    date: "14 July, 2026",
  },
  {
    id: 12,
    title: "CSS box-shadow generator: how to create depth without overdoing it",
    category: "Tutorials",
    url: "/blog/css-box-shadow-generator-how-to-create-depth-without-overdoing-it",
    author: "PalettIQ Team",
    date: "14 July, 2026",
  },
  {
    id: 13,
    title: "How to check color contrast for accessibility in 30 seconds",
    category: "Tutorials",
    url: "/blog/how-to-check-color-contrast-for-accessibility-in-30-seconds",
    author: "PalettIQ Team",
    date: "13 July, 2026",
  },
  {
    id: 14,
    title: "Best color palettes for SaaS landing pages (with real examples)",
    category: "Case studies",
    url: "/blog/best-color-palettes-for-saas-landing-pages-with-real-examples",
    author: "PalettIQ Team",
    date: "12 July, 2026",
  },
  {
    id: 15,
    title: "Color palettes for fintech apps: why blue still dominates",
    category: "Case studies",
    url: "/blog/color-palettes-for-fintech-apps-why-blue-still-dominates",
    author: "PalettIQ Team",
    date: "12 July, 2026",
  },
  {
    id: 16,
    title:
      "Color palettes for eco and sustainability brands that don't feel generic",
    category: "Case studies",
    url: "/blog/brutal timing",
    author: "PalettIQ Team",
    date: "12 July, 2026",
  },
  {
    id: 17,
    title:
      "Dark mode color palettes: how to design UI that doesn't hurt the eyes",
    category: "Case studies",
    url: "/blog/dark-mode-color-palettes-how-to-design-ui-that-doesnt-hurt-the-eyes",
    author: "PalettIQ Team",
    date: "10 July, 2026",
  },
  {
    id: 18,
    title: "Coolors vs PalettIQ: which color tool fits your workflow?",
    category: "Comparisons",
    url: "/blog/coolors-vs-palettiq-which-color-tool-fits-your-workflow",
    author: "PalettIQ Team",
    date: "9 July, 2026",
  },
  {
    id: 19,
    title: "5 free alternatives to Adobe Color for palette generation",
    category: "Comparisons",
    url: "/blog/5-free-alternatives-to-adobe-color-for-palette-generation",
    author: "PalettIQ Team",
    date: "7 July, 2026",
  },
  {
    id: 20,
    title: "Best free color palette generators in 2026 (compared)",
    category: "Comparisons",
    url: "/blog/best-free-color-palette-generators-in-2026-compared",
    author: "PalettIQ Team",
    date: "7 July, 2026",
  },
];
