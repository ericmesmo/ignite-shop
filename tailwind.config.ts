import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        home: 'calc(100vw - ((100vw - 1180px) / 2))',
        1180: '1180px',
      },
      height: {
        656: '656px',
      },
      minHeight: {
        home: '656px',
      },
      transitionProperty: {
        footer: 'all 0.2s ease-in-out',
      },
      translate: {
        110: 'translateY(110%)',
      },
      backgroundColor: {
        backgroud: '#121214',
        elements: '#202024',
        icon: '#8D8D99',
        principal: '#00875F',
        light: '#00B37E',
      },
      textColor: {
        text: '#C4C4CC',
        title: '#E1E1E6',
        icon: '#8D8D99',
        principal: '#00875F',
        light: '#00B37E',
      },
      animation: {
        overlayShow: 'all 0.5s ease-in-out',
        contentShow: 'all 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
