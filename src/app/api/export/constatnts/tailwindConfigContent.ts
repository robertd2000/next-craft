export const tailwindConfigContent = `
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
    `;

export const indexCssContent = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
        `;
