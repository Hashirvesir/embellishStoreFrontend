/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      fontFamily: {
          oswald: "Oswald, sans-serif", 
          urbanist: "Urbanist, sans-serif",
      },
      extend: {
          backgroundImage: {
              'hero-pattern': "url('/img/hero-pattern.svg')",
              'footer-texture': "url('/img/footer-texture.png')",
          },
          keyframes: {
              wiggle: {
                  'from': { transform: 'translateX(0)' },
                  'to': { transform: 'translateX(-100%)' },
              },
              searchslide: { // Define the searchslide animation
                  '0%': { transform: 'translateY(100%)' },
                  '100%': { transform: 'translateY(0)' },
              },
          },
          animation: {
              searchslide: 'searchslide 1s ease forward',
          },
      },  
  },
  plugins: [],
};
