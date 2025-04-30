import { defineConfig } from 'vite';

export default defineConfig({
  root: './',        // по умолчанию текущая папка
  server: {
    port: 3000,      // можешь указать любой порт
    open: true       // автоматическое открытие браузера
  },
  build: {
    outDir: 'dist'   // папка для продакшн-сборки
  }, 
  base: '/frontend-quiz-app',        // базовый путь для приложения
});