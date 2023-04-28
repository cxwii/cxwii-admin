/** @type {import('tailwindcss').Config} */
export default {
  // 清除打包生成的css文件大小
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 关闭暗黑模式
  darkMode: false,
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

