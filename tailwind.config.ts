import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      gradientColorStopPositions: {
        50: "50%",
      },
      backgroundImage: {
        "challenge-image":
          "url('https://blog.kakaocdn.net/dn/bcOXTW/btsvdteG3PE/yHP14OhQdgspKPHUKhCY4K/img.png')",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      // 폰트 타입
      fontFamily: {
        suite: ["SUITE"],
      },
      fontSize: {
        "title-xl": ["24px", { lineHeight: "135%", fontWeight: "bold" }],
        "title-l": ["22px", { lineHeight: "135%", fontWeight: "bold" }],
        "title-m": ["20px", { lineHeight: "135%", fontWeight: "bold" }],
        "title-s": ["18px", { lineHeight: "135%", fontWeight: "bold" }],
        "title-xs": ["16px", { lineHeight: "130%", fontWeight: "bold" }],
        "body-xxs": ["14px", { lineHeight: "135%", fontWeight: "bold" }],
        "body-xl": ["18px", { lineHeight: "135%", fontWeight: "medium" }],
        "body-l": ["16px", { lineHeight: "135%", fontWeight: "medium" }],
        "body-m": ["14px", { lineHeight: "135%", fontWeight: "medium" }],
        "body-s": ["12px", { lineHeight: "135%", fontWeight: "medium" }],
        "body-xs": ["12px", { lineHeight: "130%", fontWeight: "medium" }],
        "sub-m": ["10px", { lineHeight: "135%", fontWeight: "right" }],
      },
      fontWeight: {
        bold: "700",
        medium: "500",
      },

      // 섹상 타입
      colors: {
        primary: "#FC5A6B",
        secondary: "#82D0DC",
        black: "#1A1A1A",
        white: "#FCFCFC",

        grey: {
          50: "#141414",
          100: "#2E2E2E",
          200: "#474747",
          300: "#616161",
          400: "#7A7A7A",
          500: "#949494",
          600: "#ADADAD",
          700: "#C7C7C7",
          800: "#E0E0E0",
          900: "#FAFAFA",
        },

        blue: {
          50: "#0A2024",
          100: "#15444C",
          200: "#206874",
          300: "#2C8C9B",
          400: "#37B0C3",
          500: "#5CC2D1",
          600: "#82D0DC",
          700: "#ABE0E8",
          800: "#D3EFF3",
          900: "#FBFDFE",
        },

        pink: {
          50: "#230104",
          100: "#55020B",
          200: "#870311",
          300: "#B90417",
          400: "#EB041E",
          500: "#FB283F",
          600: "#FC5A6B",
          700: "#FD8C98",
          800: "#FEBEC5",
          850: "#FFE5E9",
          900: "#FFF0F2",
        },

        red: {
          50: "#0F0100",
          100: "#420400",
          200: "#750800",
          300: "#A80B00",
          400: "#DB0F00",
          500: "#FF1F0F",
          600: "#FF4F42",
          700: "#FF7E75",
          800: "#FFAEA8",
          900: "#FFDEDB",
        },

        green: {
          50: "#001407",
          100: "#001407",
          200: "#017A29",
          300: "#01AB3A",
          400: "#01DF4C",
          500: "#16FE64",
          600: "#48FE85",
          700: "#7BFEA7",
          800: "#AEFFC9",
          900: "#E1FFEB",
        },

        orange: {
          50: "#0A0300",
          100: "#3D1400",
          200: "#702500",
          300: "#A33600",
          400: "#D64700",
          500: "#FF5B0A",
          600: "#FF7D3D",
          700: "#FFA070",
          800: "#FFC2A3",
          900: "#FFE4D6",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // boxShadow
      boxShadow: {
        1: "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
        2: "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 2px 4px 0px rgba(0, 0, 0, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
        3: "0 5px 10px rgba(0, 0, 0, 0.2)",
        custom:
          "1px 1px 1px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.15), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // calendar modal
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 300ms ease-out",
        "slide-down": "slide-down 300ms ease-in",
      },
    },
  },
  variants: {
    extend: {
      placeholder: ["focus"],
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
} satisfies Config

export default config
