import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints for interactive features
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message, category } = req.body;
    console.log("Contact form submission:", { name, email, phone, message, category });
    res.json({
      success: true,
      message: `Terima kasih ${name || 'Kak'}! Pesan Anda telah diterima. Tim CS GemilangKatunOutbond akan segera menghubungi WhatsApp Anda dalam 5-15 menit.`,
    });
  });

  app.post("/api/booking", (req, res) => {
    const { name, phone, packageId, packageName, participants, eventDate } = req.body;
    console.log("Booking submission:", { name, phone, packageId, packageName, participants, eventDate });
    res.json({
      success: true,
      message: `Pemesanan paket "${packageName || 'Outbound'}" untuk ${participants || 1} peserta pada tanggal ${eventDate || 'segera'} berhasil dicatat! Customer Support kami akan memverifikasi via WhatsApp.`,
    });
  });

  // Vite Middleware for development
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
      } else if (!pagePath.endsWith(".html")) {
        pagePath += ".html";
      }
      const fullPath = path.join(distPath, pagePath);
      res.sendFile(fullPath, (err) => {
        if (err) {
          res.sendFile(path.join(distPath, "index.html"));
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GemilangKatunOutbond Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
