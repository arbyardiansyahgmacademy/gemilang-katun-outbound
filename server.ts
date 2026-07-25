import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // URL rewrite middleware untuk request HTML tanpa ekstensi .html
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.includes(".")) {
      const rootPath = process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "dist")
        : process.cwd();
      const possibleHtml = path.join(rootPath, req.path + ".html");
      if (fs.existsSync(possibleHtml)) {
        req.url = req.path + ".html" + (req.url.includes("?") ? "?" + req.url.split("?")[1] : "");
      }
    }
    next();
  });

  // API Endpoints
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message, category } = req.body;
    res.json({
      success: true,
      message: `Terima kasih ${name || 'Kak'}! Pesan Anda telah diterima. Tim CS GemilangKatunOutbond akan segera menghubungi WhatsApp Anda dalam 5-15 menit.`,
    });
  });

  app.post("/api/booking", (req, res) => {
    const { name, phone, packageId, packageName, participants, eventDate } = req.body;
    res.json({
      success: true,
      message: `Pemesanan paket "${packageName || 'Outbound'}" untuk ${participants || 1} peserta pada tanggal ${eventDate || 'segera'} berhasil dicatat! Customer Support kami akan memverifikasi via WhatsApp.`,
    });
  });

  // Vite Middleware untuk Development & Static Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "mpa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      let pagePath = req.path;
      if (pagePath === "/") {
        pagePath = "/index.html";
      } else if (!pagePath.endsWith(".html") && !pagePath.includes(".")) {
        pagePath += ".html";
      }
      const fullPath = path.join(distPath, pagePath);
      if (fs.existsSync(fullPath)) {
        res.sendFile(fullPath);
      } else if (pagePath.startsWith("/paket")) {
        res.sendFile(path.join(distPath, "paket-detail.html"));
      } else if (pagePath.startsWith("/blog")) {
        res.sendFile(path.join(distPath, "blog-detail.html"));
      } else {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GemilangKatunOutbond Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();