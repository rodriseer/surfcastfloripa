const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

// Carrega variáveis de ambiente de .env.local, se existir
dotenv.config({ path: path.join(__dirname, ".env.local") });

// Reutiliza o handler da função /api/surf (o mesmo que será usado na Vercel)
const surfHandler = require("./api/surf");

const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos a partir de /public
app.use(express.static(path.join(__dirname, "public")));

// Rota raiz -> /public/index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Páginas individuais de pico -> /public/surf/index.html (SPA de picos)
app.get("/surf/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "surf", "index.html"));
});

// Rota de API /api/surf delegando para o handler já existente
app.get("/api/surf", async (req, res) => {
  try {
    await surfHandler(req, res);
  } catch (error) {
    console.error("Erro inesperado ao processar /api/surf localmente:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erro interno ao consultar previsão." });
    }
  }
});

app.listen(port, () => {
  console.log(`SurfSeer Floripa rodando em http://localhost:${port}`);
});

