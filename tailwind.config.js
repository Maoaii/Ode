/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#FFFBF5",
        "custom-bege": "#F7EFE5",
        "custom-light-purple": "#C3ACD0",
        "custom-purple": "#674188",
        "custom-purple-faded": "rgb(103, 65, 136, 0.2)",
        "custom-darker-purple": "rgb(43, 05, 76)",
        "custom-pink": "#EAC7C7",
        "custom-light-blue": "#A0C3D2",
        "custom-dark-blue": "#61757D",
        "font-color": "#3A244D",
      }
    },
    fontFamily: {
      Shantell: ["Shantell\\ Sans, cursive"]
    }
  },
  plugins: [],
}
