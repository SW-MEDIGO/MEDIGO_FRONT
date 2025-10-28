import { Platform } from "react-native";

export const theme = {
  fonts: {
    primary: Platform.select({
      ios: "Apple SD Gothic Neo",
      android: "sans-serif",
      default: "System",
    }),
  },
  colors: {
    primary: "#007AFF",
    secondary: "#5856D6",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    background: "#F0F2F5",
    surface: "#F2F2F7",
    text: {
      primary: "#4A4A4A",
      secondary: "#8E8E93",
    },
    border: "#C6C6C8",
    white: "#FFFFFF",
    black: "#000000",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 80,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
