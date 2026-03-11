const spots = [
  {
    id: "joaquina",
    name: "Joaquina",
    lat: -27.6286,
    lng: -48.4528,
    image: "./public/random 2.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "mole",
    name: "Praia Mole",
    lat: -27.6053,
    lng: -48.4322,
    image: "./public/random 3.jpeg",
    orientation: "Leste",
  },
  {
    id: "campeche",
    name: "Campeche",
    lat: -27.65,
    lng: -48.48,
    image: "./public/random 4.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "barra",
    name: "Barra da Lagoa",
    lat: -27.5764,
    lng: -48.4281,
    image: "./public/random 2.jpeg",
    orientation: "Leste",
  },
  {
    id: "mocambique",
    name: "Moçambique",
    lat: -27.5614,
    lng: -48.4175,
    image: "./public/random 3.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "brava",
    name: "Praia Brava",
    lat: -27.35,
    lng: -48.4333,
    image: "./public/random 1.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "ingleses",
    name: "Ingleses",
    lat: -27.435,
    lng: -48.3961,
    image: "./public/random 4.jpeg",
    orientation: "Leste / Nordeste",
  },
];

const todayMetricsElement = document.getElementById("today-metrics");
const todaySummaryText = document.getElementById("today-summary-text");
const heroSummary = document.getElementById("hero-summary");
const spotsGrid = document.getElementById("spots-grid");

function scrollToSection(targetId) {
  const el = document.querySelector(targetId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll-target");
    if (target) scrollToSection(target);
  });
});

function scoreFromConditions({ waveHeight, windSpeed }) {
  if (waveHeight == null || windSpeed == null) return { label: "Lendo...", variant: "bad" };

  const height = waveHeight;
  const wind = windSpeed;

  if (height >= 0.8 && height <= 1.6 && wind <= 8) {
    return { label: "Bom para surf", variant: "good" };
  }
  if (height > 0.4 && height <= 2 && wind <= 12) {
    return { label: "Ok, com ressalvas", variant: "good" };
  }
  return { label: "Fraco ou bagunçado", variant: "bad" };
}

function formatWaveHeight(meters) {
  if (meters == null) return "—";
  return `${meters.toFixed(1)} m`;
}

function formatWind(speed, direction) {
  if (speed == null) return "—";
  const label = `${speed.toFixed(1)} nós`;
  if (direction == null) return label;
  const dirs = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(direction / 45) % 8;
  return `${label} ${dirs[index]}`;
}

function formatTemp(temp) {
  if (temp == null) return "—";
  return `${temp.toFixed(1)} °C`;
}

function bestTimeFromWind(speed) {
  if (speed == null) return "Manhã cedo";
  if (speed <= 6) return "Manhã e fim de tarde";
  if (speed <= 10) return "Manhã cedo";
  return "Janelas curtas, fique de olho";
}

function surfConditionText(score) {
  if (!score) return "Aguardando leitura das condições...";
  if (score.variant === "good") {
    return "Boas chances de ondas alinhadas e com parede em alguns momentos do dia.";
  }
  return "Condições mais irregulares, mar mexido ou muito pequeno.";
}

async function fetchSpotConditions(spot) {
  try {
    const res = await fetch(`/api/surf?lat=${encodeURIComponent(
      spot.lat
    )}&lng=${encodeURIComponent(spot.lng)}`);

    if (!res.ok) {
      console.warn("Erro ao consultar /api/surf", res.status);
      throw new Error("API surf error");
    }

    const data = await res.json();

    return {
      spot,
      waveHeight: data.waveHeight ?? null,
      windSpeed: data.windSpeed ?? null,
      windDirection: data.windDirection ?? null,
      waterTemperature: data.waterTemperature ?? null,
      tide: "Dados de maré em breve",
    };
  } catch (err) {
    console.error("Falha ao buscar previsão para o pico", spot.name, err);

    // Fallback suave para manter a UI utilizável mesmo sem backend
    const now = new Date();
    const base = 0.8 + 0.6 * Math.sin(now.getHours() / 24);
    return {
      spot,
      waveHeight: base,
      windSpeed: 6 + 4 * Math.random(),
      windDirection: 90,
      waterTemperature: 23 + Math.random() * 2,
      tide: "Meia maré enchendo",
    };
  }
}

function renderTodayOverview(results) {
  if (!results.length) return;

  const heights = results
    .map((r) => r.waveHeight)
    .filter((v) => typeof v === "number");
  const winds = results
    .map((r) => r.windSpeed)
    .filter((v) => typeof v === "number");
  const temps = results
    .map((r) => r.waterTemperature)
    .filter((v) => typeof v === "number");

  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);

  const avgHeight = avg(heights);
  const avgWind = avg(winds);
  const avgTemp = avg(temps);

  todayMetricsElement.innerHTML = "";
  const metrics = [
    {
      label: "Altura média",
      value: formatWaveHeight(avgHeight),
      pill: avgHeight ? (avgHeight >= 0.8 && avgHeight <= 1.6 ? "Excelente" : "Variando") : "",
    },
    {
      label: "Vento médio",
      value: avgWind != null ? `${avgWind.toFixed(1)} nós` : "—",
      pill: avgWind != null ? (avgWind <= 8 ? "Fraco" : "Moderado / forte") : "",
    },
    {
      label: "Temperatura da água",
      value: formatTemp(avgTemp),
      pill: avgTemp ? (avgTemp >= 22 ? "Confortável sem long" : "Long John ideal") : "",
    },
  ];

  metrics.forEach((m) => {
    const dt = document.createElement("div");
    dt.className = "today-metric";
    dt.innerHTML = `
      <span class="today-metric-label">${m.label}</span>
      <span class="today-metric-value">${m.value}</span>
      ${
        m.pill
          ? `<span class="today-metric-pill">
        ${m.pill}
      </span>`
          : ""
      }
    `;
    todayMetricsElement.appendChild(dt);
  });

  todaySummaryText.textContent =
    "Hoje Floripa apresenta ondas variando ao longo da costa. Em geral, as praias mais expostas ao leste tendem a receber mais swell. Use os cards por pico para afinar a leitura.";

  heroSummary.innerHTML = "";
  const keySpot = results[0];
  const keyScore = scoreFromConditions(keySpot);
  [
    {
      label: "Condição geral",
      value: keyScore.label,
    },
    {
      label: "Altura média",
      value: formatWaveHeight(avgHeight),
    },
    {
      label: "Temperatura da água",
      value: formatTemp(avgTemp),
    },
  ].forEach((row) => {
    const div = document.createElement("div");
    div.className = "panel-row";
    div.innerHTML = `
      <span class="panel-row-label">${row.label}</span>
      <span class="panel-row-value">${row.value}</span>
    `;
    heroSummary.appendChild(div);
  });
}

function renderSpots(results) {
  spotsGrid.innerHTML = "";

  results.forEach((entry) => {
    const score = scoreFromConditions(entry);
    const el = document.createElement("article");
    el.className = "spot-card";
    el.innerHTML = `
      <div class="spot-bg" style="background-image:url('${entry.spot.image}')"></div>
      <div class="spot-overlay"></div>
      <div class="spot-inner">
        <header class="spot-header">
          <div>
            <h3 class="spot-name">${entry.spot.name}</h3>
            <span class="spot-badge">${entry.spot.orientation}</span>
          </div>
          <div class="spot-score-pill ${score.variant === "bad" ? "bad" : ""}">
            <span class="spot-score-dot"></span>
            <span>${score.label}</span>
          </div>
        </header>
        <div class="spot-grid">
          <div>
            <span class="spot-metric-label">Altura das ondas</span>
            <span class="spot-metric-value">${formatWaveHeight(entry.waveHeight)}</span>
          </div>
          <div>
            <span class="spot-metric-label">Vento</span>
            <span class="spot-metric-value">${formatWind(
              entry.windSpeed,
              entry.windDirection
            )}</span>
          </div>
          <div>
            <span class="spot-metric-label">Maré</span>
            <span class="spot-metric-value">${entry.tide ?? "Em breve"}</span>
          </div>
          <div>
            <span class="spot-metric-label">Melhor horário</span>
            <span class="spot-metric-value">${bestTimeFromWind(entry.windSpeed)}</span>
          </div>
        </div>
        <p class="spot-footer">
          ${surfConditionText(score)}
        </p>
      </div>
    `;
    spotsGrid.appendChild(el);
  });
}

async function loadForecast() {
  try {
    const promises = spots.map((spot) => fetchSpotConditions(spot));
    const results = await Promise.all(promises);

    renderTodayOverview(results);
    renderSpots(results);
  } catch (err) {
    console.error("Erro geral ao montar previsão", err);
    todaySummaryText.textContent =
      "Não foi possível atualizar as condições agora. Tente novamente em alguns minutos.";
  }
}

loadForecast();

