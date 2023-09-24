/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        scaffoldEth: {
          primary: "#642EFF",
          "primary-content": "#212638",
          secondary: "#DAE8FF",
          "secondary-content": "#212638",
          accent: "#642EFF",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#DAE8FF",
          "base-content": "#212638",

          info: "#642EFF",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          "--shadow-color": "#888197",

          "--custom-bg-gradient": "linear-gradient(to right, #FFFFFF, #FFFFFF)",

          "--custon-body-gradient": "linear-gradient(to right, #FFFFFF, #FFFFFF)",

          "--custom-text": "#631CB9",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },

          ".bg-shadow-color": {
            backgroundColor: "var(--shadow-color)", // Use the CSS variable
          },

          ".bg-custom-gradient": {
            backgroundImage: "var(--custom-bg-gradient)", // Use the CSS variable
          },

          ".bg-body-gradient": {
            backgroundImage: "var(--custom-body-gradient)", // Use the CSS variable
          },

          ".important-text": {
            color: "var(--custom-text)", // Use the CSS variable
          },

          ".stakeHeader": {
            background: "rgba(144, 40, 222, 0.44)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          },
        },
      },
      {
        scaffoldEthDark: {
          primary: "#642EFF",
          "primary-content": "#FFFFFF",
          secondary: "#A259FF",
          "secondary-content": "#F991CC",
          accent: "#642EFF",
          "accent-content": "#FFFFFF",
          neutral: "#",
          "neutral-content": "#",
          "base-100": "#141414",
          "base-200": "#060203",
          "base-300": "#323232",
          "base-content": "#FFFFFF",

          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          "--shadow-color": "#553B8B",

          "--custom-bg-gradient": "linear-gradient(to right, #141525, #140B1E)",

          "--custon-body-gradient": "linear-gradient(to right, #1B0A30, #000000)",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },

          ".bg-shadow-color": {
            backgroundColor: "var(--shadow-color)", // Use the CSS variable
          },

          "--custom-text": "#F991CC",

          ".bg-custom-gradient": {
            backgroundImage: "var(--custom-bg-gradient)", // Use the CSS variable
          },

          ".bg-body-gradient": {
            backgroundImage: "var(--custom-body-gradient)", // Use the CSS variable
          },

          ".important-text": {
            color: "var(--custom-text)", // Use the CSS variable
          },

          ".stakeHeader": {
            background: "rgba(200, 200, 200, 0.08)",
            strokeWidth: "1px",
            stroke: "#CDD5FE",
            filter: "drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.20))",
            backdropFilter: "blur(23px)",
          },
        },
      },
    ],
  },
  theme: {
    // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
    extend: {
      fontFamily: {
        "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
        inter: ["Inter"],
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.1, 1.1)" },
        },
      },
      animation: {
        grow: "grow 5s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 1s ease infinite",
      },
    },
  },
};
