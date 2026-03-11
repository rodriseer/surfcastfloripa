const spots = [
  {
    id: "joaquina",
    name: "Joaquina",
    lat: -27.6286,
    lng: -48.4528,
    image: "/public/random-2.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "mole",
    name: "Praia Mole",
    lat: -27.6053,
    lng: -48.4322,
    image: "/public/random-3.jpeg",
    orientation: "Leste",
  },
  {
    id: "campeche",
    name: "Campeche",
    lat: -27.65,
    lng: -48.48,
    image: "/public/random-4.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "barra",
    name: "Barra da Lagoa",
    lat: -27.5764,
    lng: -48.4281,
    image: "/public/random-2.jpeg",
    orientation: "Leste",
  },
  {
    id: "mocambique",
    name: "Moçambique",
    lat: -27.5614,
    lng: -48.4175,
    image: "/public/random-3.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "brava",
    name: "Praia Brava",
    lat: -27.35,
    lng: -48.4333,
    image: "/public/random-1.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "ingleses",
    name: "Ingleses",
    lat: -27.435,
    lng: -48.3961,
    image: "/public/random-4.jpeg",
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

const spotConfigs = {
  joaquina: {
    id: "joaquina",
    idealWave: { min: 0.6, max: 2.2, sweetMin: 0.9, sweetMax: 1.8 },
    idealSwellDir: { min: 80, max: 150 },
    idealWindSpeed: { max: 9 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  mole: {
    id: "mole",
    idealWave: { min: 0.6, max: 2.0, sweetMin: 0.8, sweetMax: 1.6 },
    idealSwellDir: { min: 80, max: 140 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 11 },
  },
  campeche: {
    id: "campeche",
    idealWave: { min: 0.8, max: 2.5, sweetMin: 1.0, sweetMax: 2.0 },
    idealSwellDir: { min: 90, max: 160 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  barra: {
    id: "barra",
    idealWave: { min: 0.5, max: 1.8, sweetMin: 0.7, sweetMax: 1.4 },
    idealSwellDir: { min: 70, max: 130 },
    idealWindSpeed: { max: 9 },
    idealPeriod: { min: 8, sweet: 10 },
  },
  mocambique: {
    id: "mocambique",
    idealWave: { min: 0.8, max: 2.5, sweetMin: 1.1, sweetMax: 2.1 },
    idealSwellDir: { min: 60, max: 130 },
    idealWindSpeed: { max: 11 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  brava: {
    id: "brava",
    idealWave: { min: 0.8, max: 2.4, sweetMin: 1.0, sweetMax: 1.9 },
    idealSwellDir: { min: 40, max: 120 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  ingleses: {
    id: "ingleses",
    idealWave: { min: 0.6, max: 2.0, sweetMin: 0.8, sweetMax: 1.6 },
    idealSwellDir: { min: 40, max: 110 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 8, sweet: 11 },
  },
};

function normalizeDegreeDifference(targetRange, actual) {
  if (actual == null) return null;
  const normalize = (deg) => {
    let d = deg % 360;
    if (d < 0) d += 360;
    return d;
  };
  const a = normalize(actual);
  const min = normalize(targetRange.min);
  const max = normalize(targetRange.max);
  if (min <= max) {
    if (a >= min && a <= max) return 0;
    const dist = Math.min(Math.abs(a - min), Math.abs(a - max));
    return dist;
  }
  // range cruza 360 (ex: 300–60)
  if (a >= min || a <= max) return 0;
  const dist = Math.min(Math.abs(a - min), Math.abs(a - max));
  return dist;
}

function labelFromScore(score) {
  if (score >= 9) return "Excelente";
  if (score >= 7) return "Muito bom";
  if (score >= 5) return "Surfável";
  if (score >= 3) return "Fraco";
  return "Ruim";
}

function tierFromScore(score) {
  if (score >= 9) return "excelente";
  if (score >= 7) return "muito-bom";
  if (score >= 5) return "surfavel";
  if (score >= 3) return "fraco";
  return "ruim";
}

function computeSurfScore(spot, conditions) {
  const cfg = spotConfigs[spot.id] || spotConfigs.joaquina;
  let score = 5; // ponto neutro

  const { waveHeight, windSpeed, swellDirection, swellPeriod } = conditions;

  // Altura de onda
  if (waveHeight != null) {
    const h = waveHeight;
    const { min, max, sweetMin, sweetMax } = cfg.idealWave;
    if (h < min || h > max) {
      score -= 2;
    } else if (h >= sweetMin && h <= sweetMax) {
      score += 2;
    } else {
      score += 1;
    }
  }

  // Direção de swell
  if (swellDirection != null) {
    const diff = normalizeDegreeDifference(cfg.idealSwellDir, swellDirection);
    if (diff === 0) {
      score += 2;
    } else if (diff <= 30) {
      score += 1;
    } else if (diff >= 60) {
      score -= 1.5;
    } else {
      score -= 0.5;
    }
  }

  // Período de swell (quanto maior, melhor, até certo ponto)
  if (swellPeriod != null) {
    const p = swellPeriod;
    const { min, sweet } = cfg.idealPeriod;
    if (p >= sweet) {
      score += 1.5;
    } else if (p >= min) {
      score += 0.5;
    } else {
      score -= 1;
    }
  }

  // Vento (apenas intensidade por enquanto)
  if (windSpeed != null) {
    const w = windSpeed;
    const maxIdeal = cfg.idealWindSpeed.max;
    if (w <= maxIdeal) {
      score += 1.5;
    } else if (w <= maxIdeal + 4) {
      score -= 0.5;
    } else {
      score -= 1.5;
    }
  }

  const clamped = Math.min(10, Math.max(1, score));
  const numeric = Number(clamped.toFixed(1));
  const label = labelFromScore(numeric);
  const tier = tierFromScore(numeric);
  return { score: numeric, label, tier };
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

function surfConditionText(rating) {
  if (!rating) return "Aguardando leitura das condições...";
  const s = rating.score;
  if (s >= 9) {
    return "Condições clássicas para a maioria dos níveis, com ondas bem formadas e alinhadas.";
  }
  if (s >= 7) {
    return "Muito boas chances de boas sessões, com períodos do dia bem aproveitáveis.";
  }
  if (s >= 5) {
    return "Surfável, com algumas séries aproveitáveis, mas com fatores limitando um pouco a qualidade.";
  }
  if (s >= 3) {
    return "Condições mais fracas, seja por mar pequeno, vento ou swell desajustado.";
  }
  return "Pouco convidativo, indicado apenas para treinos específicos ou para matar a vontade.";
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
      swellDirection: data.swellDirection ?? null,
      swellPeriod: data.swellPeriod ?? null,
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
      swellDirection: 100,
      swellPeriod: 10 + Math.random() * 2,
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
  const keyRating = computeSurfScore(keySpot.spot, keySpot);
  [
    {
      label: "Condição geral",
      value: `${keyRating.score.toFixed(1)} / 10 · ${keyRating.label}`,
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
    const rating = computeSurfScore(entry.spot, entry);
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
          <div class="spot-score-pill score-${rating.tier}">
            <div class="spot-score-main">${rating.score.toFixed(1)} / 10</div>
            <div class="spot-score-label">${rating.label}</div>
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
          ${surfConditionText(rating)}
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

