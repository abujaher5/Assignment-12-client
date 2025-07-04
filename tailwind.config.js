/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "wiggle-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        //  Flashing red text or icon
        "flash-red": {
          "0%, 100%": { color: "#DC2626" },
          "50%": { color: "#F87171" },
        },
        //  flash green
        "flash-green": {
          "0%, 100%": { color: "#16A34A" },
          "50%": { color: "#4ADE80" },
        },
        //  flash gray
        "flash-gray": {
          "0%, 100%": { color: "	#4B5563" },
          "50%": { color: "	#9CA3AF" },
        },
      },

      animation: {
        "wiggle-x": "wiggle-x 0.3s ease-in-out infinite",
        // Flashing color animation
        "flash-red": "flash-red 0.5s ease-in-out infinite",
        "flash-green": "flash-green 0.5s ease-in-out infinite",
        "flash-gray": "flash-gray 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
