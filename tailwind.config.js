module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Jost"],
      },
      animation: {
        fade: "fadeOut 3s ease-out",
      },

      keyframes: (theme) => ({
        fadeOut: {
          "0%": {
            backgroundColor: theme("colors.red.500"),
            transform: "scale(0.7)",
            opacity: "0.7",
          },
          "7%": {
            backgroundColor: theme("colors.red.500"),
            transform: "scale(1.2)",
            opacity: "1",
          },
          "12%": {
            backgroundColor: theme("colors.red.500"),
            transform: "scale(1)",
          },
          "75%": {
            backgroundColor: theme("colors.red.500"),
            // textColor: theme("colors.transparent"),
          },
          "90%": {
            // backgroundColor: theme("colors.transparent"),
            // textColor: theme("colors.transparent"),
            opacity: "1",
          },
          "100%": {
            // backgroundColor: theme("colors.transparent"),
            // textColor: theme("colors.transparent"),
            opacity: "0",
          },
        },
      }),
    },
  },
  plugins: [],
};
