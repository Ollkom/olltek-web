/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        darkBlue: "#273665",
        lightBlue: "#445EAB",
        darkGrayText: "#323539",
        lightGrayText: "#525D6A",
        lightGrayBackground: "#F8F9FB",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container-custom': {
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '1000px',
          },
          '@screen xl': {
            maxWidth: '1200px',
          },
          '@screen 2xl': {
            maxWidth: '1680px',
          },
        },
      });
    },
    function ({ addVariant }) {
      addVariant("nth-child-3", "&:nth-child(3)");
    },
  ],
};
