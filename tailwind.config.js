module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "french-violet-1": "#800ACC",
        "french-violet-2": "#940BF0",
        "french-violet-3": "#A42BF5",
        "french-violet-4": "#B34EF7",
        "french-violet-5": "#C372F8",
        "french-violet-6": "#D295FA",
        "french-violet-7": "#E1B8FC",
        "french-violet-8": "#F0DCFD",
        "gun-metal-4": "#58759D",
        "gun-metal-3": "#455C7B",
        "success-1": "#57CC0A",
      },
      fontSize: {
        "1xs": ["0.688rem", "0.5rem"],
      },
      fontFamily: {
        encodeSans: ["Encode Sans", "sans-serif"],
      },
      letterSpacing: {
        "normal-1": "0.016rem",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["active"],
      textColor: ["active", "hover"],
    },
  },
  plugins: [require("daisyui")],
};
