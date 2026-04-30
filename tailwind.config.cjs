/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0D0D0D",
        accent: "#d71b6b",
        gold: "#d8b15a",
        violet: {
          950: "#0b0612",
          900: "#12061f",
          800: "#1c0a2f",
          700: "#2b0e48",
          600: "#3a1463"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans Devanagari",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "Cinzel Decorative",
          "Noto Serif Devanagari",
          "ui-serif",
          "Georgia",
          "serif"
        ]
      },
      boxShadow: {
        glow: "0 0 40px rgba(215,27,107,0.35)",
        gold: "0 0 35px rgba(216,177,90,0.28)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        gradient: "gradient 12s ease-in-out infinite",
        pulseSoft: "pulseSoft 3.5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
