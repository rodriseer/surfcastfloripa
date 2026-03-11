const spots = [
  {
    id: "joaquina",
    name: "Joaquina",
    lat: -27.6286,
    lng: -48.4528,
    image: "/random-2.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "mole",
    name: "Praia Mole",
    lat: -27.6053,
    lng: -48.4322,
    image: "/random-3.jpeg",
    orientation: "Leste",
  },
  {
    id: "campeche",
    name: "Campeche",
    lat: -27.65,
    lng: -48.48,
    image: "/random-4.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "barra",
    name: "Barra da Lagoa",
    lat: -27.5764,
    lng: -48.4281,
    image: "/random-2.jpeg",
    orientation: "Leste",
  },
  {
    id: "mocambique",
    name: "Moçambique",
    lat: -27.5614,
    lng: -48.4175,
    image: "/random-3.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "brava",
    name: "Praia Brava",
    lat: -27.35,
    lng: -48.4333,
    image: "/random-1.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "ingleses",
    name: "Ingleses",
    lat: -27.435,
    lng: -48.3961,
    image: "/random-4.jpeg",
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
    // Praia de face leste / sudeste
    beachOrientation: 110,
    idealWave: { min: 0.6, max: 2.4, sweetMin: 0.9, sweetMax: 1.8 },
    idealSwellDir: { min: 110, max: 150 }, // SE / ESE
    idealOffshoreWindDir: { min: 250, max: 310 }, // W / WNW
    idealWindSpeed: { max: 9 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  mole: {
    id: "mole",
    beachOrientation: 100,
    idealWave: { min: 0.6, max: 2.1, sweetMin: 0.8, sweetMax: 1.7 },
    idealSwellDir: { min: 90, max: 140 }, // E / SE
    idealOffshoreWindDir: { min: 260, max: 320 }, // W / WNW
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 11 },
  },
  campeche: {
    id: "campeche",
    beachOrientation: 120,
    idealWave: { min: 0.8, max: 2.7, sweetMin: 1.0, sweetMax: 2.1 },
    idealSwellDir: { min: 120, max: 160 }, // SE
    idealOffshoreWindDir: { min: 260, max: 320 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  barra: {
    id: "barra",
    beachOrientation: 85,
    idealWave: { min: 0.5, max: 1.9, sweetMin: 0.7, sweetMax: 1.3 },
    idealSwellDir: { min: 70, max: 130 },
    idealOffshoreWindDir: { min: 250, max: 310 },
    idealWindSpeed: { max: 9 },
    idealPeriod: { min: 8, sweet: 10 },
  },
  mocambique: {
    id: "mocambique",
    beachOrientation: 70,
    idealWave: { min: 0.8, max: 2.8, sweetMin: 1.1, sweetMax: 2.2 },
    idealSwellDir: { min: 50, max: 110 }, // NE / E
    idealOffshoreWindDir: { min: 240, max: 300 },
    idealWindSpeed: { max: 11 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  brava: {
    id: "brava",
    beachOrientation: 60,
    idealWave: { min: 0.8, max: 2.6, sweetMin: 1.0, sweetMax: 2.0 },
    idealSwellDir: { min: 40, max: 110 }, // NE / E
    idealOffshoreWindDir: { min: 230, max: 290 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  ingleses: {
    id: "ingleses",
    beachOrientation: 50,
    idealWave: { min: 0.6, max: 2.1, sweetMin: 0.8, sweetMax: 1.6 },
    idealSwellDir: { min: 40, max: 110 }, // NE / E
    idealOffshoreWindDir: { min: 230, max: 290 },
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

function angleDiff(a, b) {
  if (a == null || b == null) return null;
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

function computeSurfScore(spot, conditions) {
  const cfg = spotConfigs[spot.id] || spotConfigs.joaquina;
  const {
    waveHeight,
    windSpeed,
    windDirection,
    swellDirection,
    swellPeriod,
  } = conditions;

  // Sub-scores normalizados [0,1]
  let waveScore = 0.4; // ponto de partida neutro
  let windScore = 0.5;
  let swellDirScore = 0.5;
  let periodScore = 0.5;
  let tideScore = 0.5; // fallback simples por enquanto

  // 1) Qualidade da onda (altura) – 35%
  if (waveHeight != null) {
    const h = waveHeight;
    const { min, max, sweetMin, sweetMax } = cfg.idealWave;

    if (h < 0.4 || h > 3.0) {
      // muito pequeno ou muito grande: quase zerado
      waveScore = 0.1;
    } else if (h < min || h > max) {
      waveScore = 0.3;
    } else if (h >= sweetMin && h <= sweetMax) {
      waveScore = 0.95;
    } else {
      waveScore = 0.7;
    }
  }

  // 2) Vento – intensidade + direção (25%)
  if (windSpeed != null || windDirection != null) {
    let intenScore = 0.5;
    if (windSpeed != null) {
      const w = windSpeed;
      const maxIdeal = cfg.idealWindSpeed.max;
      if (w <= maxIdeal) intenScore = 0.9;
      else if (w <= maxIdeal + 4) intenScore = 0.6;
      else intenScore = 0.2;
    }

    let dirScore = 0.5;
    if (windDirection != null && cfg.beachOrientation != null) {
      const offshoreDir = (cfg.beachOrientation + 180) % 360;
      const onshoreDir = cfg.beachOrientation;
      const diffOff = angleDiff(windDirection, offshoreDir);
      const diffOn = angleDiff(windDirection, onshoreDir);

      // melhor quanto mais próximo do offshore, pior quanto mais onshore
      if (diffOff != null && diffOn != null) {
        if (diffOff <= 20) dirScore = 0.95; // terral perfeito
        else if (diffOff <= 45) dirScore = 0.8; // quase terral / side-off
        else if (diffOn <= 30) dirScore = 0.15; // bem onshore
        else dirScore = 0.55; // side-shore / neutro
      }

      // se houver faixa de vento offshore explícita, reforça o score
      if (cfg.idealOffshoreWindDir) {
        const diffIdealOff = normalizeDegreeDifference(
          cfg.idealOffshoreWindDir,
          windDirection
        );
        if (diffIdealOff === 0) dirScore = 0.98;
        else if (diffIdealOff <= 20) dirScore = Math.max(dirScore, 0.9);
      }
    }

    windScore = 0.6 * intenScore + 0.4 * dirScore;
  }

  // 3) Direção do swell – alinhamento com o pico (20%)
  if (swellDirection != null && cfg.idealSwellDir) {
    const diff = normalizeDegreeDifference(cfg.idealSwellDir, swellDirection);
    if (diff === 0) {
      swellDirScore = 0.95;
    } else if (diff <= 20) {
      swellDirScore = 0.85;
    } else if (diff <= 45) {
      swellDirScore = 0.6;
    } else if (diff <= 70) {
      swellDirScore = 0.35;
    } else {
      swellDirScore = 0.15;
    }
  }

  // 4) Período do swell – energia (10%)
  if (swellPeriod != null) {
    const p = swellPeriod;
    const { min, sweet } = cfg.idealPeriod;
    if (p >= sweet + 2) {
      periodScore = 0.95;
    } else if (p >= sweet) {
      periodScore = 0.85;
    } else if (p >= min) {
      periodScore = 0.6;
    } else if (p >= min - 2) {
      periodScore = 0.35;
    } else {
      periodScore = 0.15;
    }
  }

  // 5) Maré / fallback – 10%
  // Sem dados de maré reais ainda: usamos uma leitura simples de "funciona melhor"
  if (waveHeight != null) {
    const h = waveHeight;
    if (h >= 0.7 && h <= 1.8) tideScore = 0.7;
    else if (h >= 0.5 && h <= 2.2) tideScore = 0.55;
    else tideScore = 0.4;
  }

  // Combinação ponderada:
  // onda 35%, vento 25%, direção swell 20%, período 10%, maré/fallback 10%
  const combined =
    0.35 * waveScore +
    0.25 * windScore +
    0.2 * swellDirScore +
    0.1 * periodScore +
    0.1 * tideScore;

  // Converter para escala 1–10, penalizando extremos para evitar muitos 10/10
  let base = combined; // [0,1]

  // Suaviza distribuição para que 10 seja realmente raro
  base = Math.pow(base, 1.1);

  let finalScore = 1 + 9 * base; // [1,10]

  // Só permitir 10 quando realmente tudo está perfeito
  if (finalScore > 9.6 && !(waveScore > 0.9 && windScore > 0.9 && swellDirScore > 0.9)) {
    finalScore = 9.6;
  }

  const numeric = Number(Math.min(10, Math.max(1, finalScore)).toFixed(1));
  const label = labelFromScore(numeric);
  const tier = tierFromScore(numeric);
  const colorVariant =
    tier === "excelente"
      ? "green"
      : tier === "muito-bom"
      ? "blue"
      : tier === "surfavel"
      ? "gray"
      : tier === "fraco"
      ? "amber"
      : "red";

  return { score: numeric, label, tier, colorVariant };
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

