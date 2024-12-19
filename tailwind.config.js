/** @type {import('tailwindcss').Config} */
export default {
  // 清除打包生成的css文件大小
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 控制是否开启主题模式
  darkMode: 'class',
  variants: {},
  theme: {
    extend: {}
  },
  plugins: []
}
