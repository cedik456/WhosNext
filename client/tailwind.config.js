/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-500": ["Poppins_500Medium"],
        "poppins-600": ["Poppins_600SemiBold"],
        "poppins-700": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
