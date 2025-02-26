export interface Colors {
  background: string;
  foreground: string;
}

// ColorThemeKind: 1 => Light, 2 => Dark, 3 => HighContrast, 4 => HighContrastLight
interface PredefinedColors {
  [theme: number]: {
    [themeName: string]: Colors;
  };
}

export const predefinedTheme: PredefinedColors = {
  1: {
    Afternoon: {
      background: "#81689D",
      foreground: "#FFD0EC",
    },
    Night: {
      background: "#535C91",
      foreground: "#b6b5e2",
    },
    Winter: {
      background: "#DDE6ED",
      foreground: "#27374D",
    },
    Warm: {
      background: "#B47B84",
      foreground: "#FFE7E7",
    },
    Sunset: {
      background: "#f37c88",
      foreground: "#1d3b55",
    },
    Space: {
      background: "#dd8dbb",
      foreground: "#2f1161",
    },
    Sky: {
      background: "#a1d8e6",
      foreground: "#445f71",
    },
    Sea: {
      background: "#62ccdd",
      foreground: "#005746",
    },
    Lima: {
      background: "#fffca1",
      foreground: "#8eba43",
    },
    Militar: {
      background: "#9DC08B",
      foreground: "#374633",
    },
    Nature: {
      background: "#ADBC9F",
      foreground: "#12372A",
    },
    Racing: {
      background: "#f4d22a",
      foreground: "#16784f",
    },
    Earth: {
      background: "#F1DEC9",
      foreground: "#765e45",
    },
    Peach: {
      background: "#E0CCBE",
      foreground: "#3C3633",
    },
    Coffee: {
      background: "#EAC696",
      foreground: "#65451F",
    },
    Silver: {
      background: "#dcdee5",
      foreground: "#434341",
    },
    Luxury: {
      background: "#F8F0E5",
      foreground: "#102C57",
    },
    Industrial: {
      background: "#83d6da",
      foreground: "#222831",
    },
    Strawberry: {
      background: "#F8E8EE",
      foreground: "#cd4c7b",
    },
    Kids: {
      background: "#C0DBEA",
      foreground: "#89419d",
    },
    Neon: {
      background: "#f55fb1",
      foreground: "#000000",
    },
    Voltage: {
      background: "#ffd249",
      foreground: "#1d1707",
    },
    Rose: {
      background: "#ea4f67",
      foreground: "#621e33",
    },
  },
  2: {
    Afternoon: {
      background: "#474F7A",
      foreground: "#FFD0EC",
    },
    Night: {
      background: "#1B1A55",
      foreground: "#9290C3",
    },
    Winter: {
      background: "#27374D",
      foreground: "#DDE6ED",
    },
    Warm: {
      background: "#944E63",
      foreground: "#FFE7E7",
    },
    Sunset: {
      background: "#6C5B7B",
      foreground: "#F67280",
    },
    Space: {
      background: "#37306B",
      foreground: "#D27685",
    },
    Sky: {
      background: "#378ec8",
      foreground: "#e9f6ff",
    },
    Sea: {
      background: "#0A4D68",
      foreground: "#01dcb0",
    },
    Lima: {
      background: "#6e9b21",
      foreground: "#FFFC9B",
    },
    Militar: {
      background: "#40513B",
      foreground: "#EDF1D6",
    },
    Nature: {
      background: "#12372A",
      foreground: "#FBFADA",
    },
    Racing: {
      background: "#495E57",
      foreground: "#F4CE14",
    },
    Earth: {
      background: "#8D7B68",
      foreground: "#F1DEC9",
    },
    Peach: {
      background: "#3C3633",
      foreground: "#E0CCBE",
    },
    Coffee: {
      background: "#65451F",
      foreground: "#EAC696",
    },
    Silver: {
      background: "#565656",
      foreground: "#C7C8CC",
    },
    Luxury: {
      background: "#102C57",
      foreground: "#F8F0E5",
    },
    Industrial: {
      background: "#393E46",
      foreground: "#00ADB5",
    },
    Strawberry: {
      background: "#af4d71",
      foreground: "#fcdfea",
    },
    Kids: {
      background: "#9772a1",
      foreground: "#ddf3ff",
    },
    Neon: {
      background: "#000000",
      foreground: "#f55fb1",
    },
    Voltage: {
      background: "#efc035",
      foreground: "#080602",
    },
    Rose: {
      background: "#88303f",
      foreground: "#fcb6c0",
    },
  },
};
