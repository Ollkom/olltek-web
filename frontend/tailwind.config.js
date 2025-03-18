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
        lightGrayBorder: "#E5E5E7",
      },
      container: {
        center: true,
        screens: { sm: "640px", md: "728px", lg: "950px", xl: "1100px", "2xl": "1680px", },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("nth-child-3", "&:nth-child(3)");
    },
  ],
};
