const path = require("path");
const express = require("express");
const dotenv = require("dotenv");

// Carrega variáveis de ambiente de .env.local, se existir
dotenv.config({ path: path.join(__dirname, ".env.local") });

// Reutiliza o handler da função /api/surf (o mesmo que será usado na Vercel)
const surfHandler = require("./api/surf");

const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos (index.html, app.js, styles.css, etc.)
app.use(express.static(__dirname));

// Servir assets públicos de /public na raiz, ex: /random-1.jpeg
app.use(express.static(path.join(__dirname, "public")));

// Rota raiz -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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

