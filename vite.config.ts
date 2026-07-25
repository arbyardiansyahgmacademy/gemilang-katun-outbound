import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function getHtmlInputs() {
  const inputs: Record<string, string> = {
    main: path.resolve(__dirname, 'index.html'),
    about: path.resolve(__dirname, 'about.html'),
    paket: path.resolve(__dirname, 'paket.html'),
    paketDetail: path.resolve(__dirname, 'paket-detail.html'),
    gallery: path.resolve(__dirname, 'gallery.html'),
    blog: path.resolve(__dirname, 'blog.html'),
    blogDetail: path.resolve(__dirname, 'blog-detail.html'),
    contact: path.resolve(__dirname, 'contact.html'),
  };

  const paketDir = path.resolve(__dirname, 'paket');
  if (fs.existsSync(paketDir)) {
    const files = fs.readdirSync(paketDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const key = `paket_${file.replace('.html', '')}`;
        inputs[key] = path.resolve(paketDir, file);
      }
    });
  }

  const blogDir = path.resolve(__dirname, 'blog');
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const key = `blog_${file.replace('.html', '')}`;
        inputs[key] = path.resolve(blogDir, file);
      }
    });
  }

  return inputs;
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: getHtmlInputs(),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});