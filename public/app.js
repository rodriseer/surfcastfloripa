const spots = [
  {
    id: "joaquina",
    region: "Florianópolis",
    slug: "joaquina",
    name: "Joaquina",
    lat: -27.6286,
    lng: -48.4528,
    image: "/random-2.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "mole",
    region: "Florianópolis",
    slug: "praia-mole",
    name: "Praia Mole",
    lat: -27.6053,
    lng: -48.4322,
    image: "/random-3.jpeg",
    orientation: "Leste",
  },
  {
    id: "campeche",
    region: "Florianópolis",
    slug: "campeche",
    name: "Campeche",
    lat: -27.65,
    lng: -48.48,
    image: "/random-4.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "barra",
    region: "Florianópolis",
    slug: "barra-da-lagoa",
    name: "Barra da Lagoa",
    lat: -27.5764,
    lng: -48.4281,
    image: "/random-2.jpeg",
    orientation: "Leste",
  },
  {
    id: "mocambique",
    region: "Florianópolis",
    slug: "mocambique",
    name: "Moçambique",
    lat: -27.5614,
    lng: -48.4175,
    image: "/random-3.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "brava",
    region: "Florianópolis",
    slug: "praia-brava",
    name: "Praia Brava",
    lat: -27.35,
    lng: -48.4333,
    image: "/random-1.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "ingleses",
    region: "Florianópolis",
    slug: "ingleses",
    name: "Ingleses",
    lat: -27.435,
    lng: -48.3961,
    image: "/random-4.jpeg",
    orientation: "Leste / Nordeste",
  },
  {
    id: "garopaba",
    slug: "garopaba",
    name: "Garopaba",
    region: "Garopaba / Imbituba",
    lat: -28.024,
    lng: -48.61,
    image: "/random-2.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "silveira",
    slug: "silveira",
    name: "Silveira",
    region: "Garopaba / Imbituba",
    lat: -28.03,
    lng: -48.62,
    image: "/random-3.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "ferrugem",
    slug: "ferrugem",
    name: "Ferrugem",
    region: "Garopaba / Imbituba",
    lat: -28.048,
    lng: -48.63,
    image: "/random-4.jpeg",
    orientation: "Leste",
  },
  {
    id: "imbituba",
    slug: "imbituba",
    name: "Imbituba",
    region: "Garopaba / Imbituba",
    lat: -28.24,
    lng: -48.66,
    image: "/random-1.jpeg",
    orientation: "Leste / Sudeste",
  },
  {
    id: "praia-do-rosa",
    slug: "praia-do-rosa",
    name: "Praia do Rosa",
    region: "Garopaba / Imbituba",
    lat: -28.12,
    lng: -48.63,
    image: "/random-3.jpeg",
    orientation: "Leste / Sudeste",
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
    tip: "Joaquina funciona melhor com swell de sudeste/este-sudeste e vento terral de oeste.",
  },
  mole: {
    id: "mole",
    beachOrientation: 100,
    idealWave: { min: 0.6, max: 2.1, sweetMin: 0.8, sweetMax: 1.7 },
    idealSwellDir: { min: 90, max: 140 }, // E / SE
    idealOffshoreWindDir: { min: 260, max: 320 }, // W / WNW
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 11 },
    tip: "Praia Mole costuma alinhar bem com swell de leste e sudeste, com vento mais fraco ou terral.",
  },
  campeche: {
    id: "campeche",
    beachOrientation: 120,
    idealWave: { min: 0.8, max: 2.7, sweetMin: 1.0, sweetMax: 2.1 },
    idealSwellDir: { min: 120, max: 160 }, // SE
    idealOffshoreWindDir: { min: 260, max: 320 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
    tip: "Campeche prefere swell de sudeste com boa energia e vento de oeste/noroeste.",
  },
  barra: {
    id: "barra",
    beachOrientation: 85,
    idealWave: { min: 0.5, max: 1.9, sweetMin: 0.7, sweetMax: 1.3 },
    idealSwellDir: { min: 70, max: 130 },
    idealOffshoreWindDir: { min: 250, max: 310 },
    idealWindSpeed: { max: 9 },
    idealPeriod: { min: 8, sweet: 10 },
    tip: "Barra da Lagoa funciona bem com swell de leste e vento fraco, ideal para sessões mais tranquilas.",
  },
  mocambique: {
    id: "mocambique",
    beachOrientation: 70,
    idealWave: { min: 0.8, max: 2.8, sweetMin: 1.1, sweetMax: 2.2 },
    idealSwellDir: { min: 50, max: 110 }, // NE / E
    idealOffshoreWindDir: { min: 240, max: 300 },
    idealWindSpeed: { max: 11 },
    idealPeriod: { min: 9, sweet: 12 },
    tip: "Moçambique aceita bastante tamanho com swell de nordeste/leste e vento mais organizado.",
  },
  brava: {
    id: "brava",
    beachOrientation: 60,
    idealWave: { min: 0.8, max: 2.6, sweetMin: 1.0, sweetMax: 2.0 },
    idealSwellDir: { min: 40, max: 110 }, // NE / E
    idealOffshoreWindDir: { min: 230, max: 290 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
    tip: "Praia Brava costuma funcionar bem com swell de nordeste/leste e vento terral mais fraco.",
  },
  ingleses: {
    id: "ingleses",
    beachOrientation: 50,
    idealWave: { min: 0.6, max: 2.1, sweetMin: 0.8, sweetMax: 1.6 },
    idealSwellDir: { min: 40, max: 110 }, // NE / E
    idealOffshoreWindDir: { min: 230, max: 290 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 8, sweet: 11 },
    tip: "Ingleses responde melhor a swell de nordeste/leste, sendo opção boa quando o sul/sudeste passa reto.",
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

function computeTrend(timelineWithScores, currentRating) {
  if (!timelineWithScores.length) {
    return { icon: "→", label: "Estável", variant: "neutral" };
  }
  const first = timelineWithScores[0].rating;
  const last = timelineWithScores[timelineWithScores.length - 1].rating;
  const delta = last.score - first.score;
  if (delta > 0.6) return { icon: "↑", label: "Melhorando", variant: "up" };
  if (delta < -0.6) return { icon: "↓", label: "Piorando", variant: "down" };
  return { icon: "→", label: "Estável", variant: "neutral" };
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
  const arrow = `<span class="wind-arrow" style="transform: rotate(${direction}deg)">↑</span>`;
  return `${arrow} ${label} ${dirs[index]}`;
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

function formatSwell(entry) {
  if (entry.waveHeight == null && entry.swellPeriod == null && entry.swellDirection == null) {
    return "—";
  }
  const h = entry.waveHeight != null ? `${entry.waveHeight.toFixed(1)} m` : "";
  const p = entry.swellPeriod != null ? `${Math.round(entry.swellPeriod)} s` : "";
  let dirText = "";
  if (entry.swellDirection != null) {
    const dirs = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];
    const index = Math.round(entry.swellDirection / 45) % 8;
    dirText = dirs[index];
  }
  const parts = [h, p, dirText].filter(Boolean);
  return parts.join(" @ ").replace(" @ @", " @");
}

function renderBestSpot(results) {
  const container = document.getElementById("best-spot-card");
  const subtitle = document.getElementById("best-spot-subtitle");
  if (!container || !subtitle || !results.length) return;

  let best = null;

  results.forEach((entry) => {
    const ratingNow = computeSurfScore(entry.spot, entry);
    let maxScore = ratingNow.score;
    let bestTime = null;

    if (Array.isArray(entry.timeline) && entry.timeline.length) {
      entry.timeline.forEach((slot) => {
        const r = computeSurfScore(entry.spot, slot);
        if (r.score > maxScore) {
          maxScore = r.score;
          bestTime = slot.time;
        }
      });
    }

    if (!best || maxScore > best.maxScore) {
      best = { entry, maxScore, bestTime, rating: ratingNow };
    }
  });

  if (!best) return;

  const { entry, maxScore, bestTime } = best;
  const rating = computeSurfScore(entry.spot, entry);
  let timeLabel = "ao longo do dia";
  if (bestTime) {
    const d = new Date(bestTime);
    const h = d.getHours().toString().padStart(2, "0");
    timeLabel = `por volta de ${h}h`;
  }

  subtitle.textContent =
    "Resumo do pico com melhor combinação de ondas, vento e swell entre os monitorados hoje.";

  container.innerHTML = `
    <div class="glass-panel best-spot-panel">
      <div class="best-spot-header">
        <span class="best-spot-label">Melhor pico hoje</span>
        <div class="spot-score-pill score-${rating.tier}">
          <div class="spot-score-main">${maxScore.toFixed(1)} / 10</div>
          <div class="spot-score-label">${labelFromScore(maxScore)}</div>
        </div>
      </div>
      <div class="best-spot-body">
        <h3 class="best-spot-name">${entry.spot.name}</h3>
        <p class="best-spot-reason">
          ${entry.spot.orientation} recebendo swell compatível, vento dentro da janela aceitável
          e altura de onda dentro da faixa ideal, com melhores condições ${timeLabel}.
        </p>
      </div>
    </div>
  `;
}

function computeConfidenceLabel(entry, timelineWithScores) {
  const hasTimeline = Array.isArray(timelineWithScores) && timelineWithScores.length >= 3;
  const hasCoreData =
    entry.waveHeight != null &&
    entry.windSpeed != null &&
    entry.swellDirection != null &&
    entry.swellPeriod != null;

  if (!hasTimeline || !hasCoreData) return "média";

  const scores = timelineWithScores.map((s) => s.rating.score);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const range = max - min;

  if (range <= 1) return "alta";
  if (range <= 2) return "média";
  return "baixa";
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
      timeline: Array.isArray(data.timeline) ? data.timeline : [],
      tide: null,
    };
  } catch (err) {
    console.error("Falha ao buscar previsão para o pico", spot.name, err);

    // Fallback suave para manter a UI utilizável mesmo sem backend
    const now = new Date();
    const base = 0.8 + 0.6 * Math.sin(now.getHours() / 24);
    const timeline = [];
    for (let i = 0; i < 5; i += 1) {
      timeline.push({
        time: new Date(Date.now() + i * 3 * 60 * 60 * 1000).toISOString(),
        waveHeight: base + (Math.random() - 0.5) * 0.2,
        windSpeed: 6 + 4 * Math.random(),
        windDirection: 90,
        waterTemperature: 23 + Math.random() * 2,
        swellDirection: 100,
        swellPeriod: 10 + Math.random() * 2,
      });
    }

    return {
      spot,
      waveHeight: base,
      windSpeed: 6 + 4 * Math.random(),
      windDirection: 90,
      waterTemperature: 23 + Math.random() * 2,
      swellDirection: 100,
      swellPeriod: 10 + Math.random() * 2,
      timeline,
      tide: null,
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
    "Hoje o litoral de Santa Catarina apresenta ondas variando ao longo da costa. Em geral, as praias mais expostas ao leste tendem a receber mais swell. Use os cards de cada pico para entender melhor as condições.";

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
  const container = document.getElementById("spots-regions");
  if (!container) return;
  container.innerHTML = "";

  const byRegion = {};
  results.forEach((entry) => {
    const region = entry.spot.region || "Outros picos";
    if (!byRegion[region]) byRegion[region] = [];
    byRegion[region].push(entry);
  });

  Object.keys(byRegion).forEach((region) => {
    const regionBlock = document.createElement("section");
    regionBlock.className = "spots-region";
    regionBlock.innerHTML = `
      <h3 class="spots-region-title">${region}</h3>
      <div class="spots-region-grid"></div>
    `;
    const gridEl = regionBlock.querySelector(".spots-region-grid");

    byRegion[region].forEach((entry) => {
      const rating = computeSurfScore(entry.spot, entry);

      const timeline = Array.isArray(entry.timeline) ? entry.timeline : [];
      const timelineWithScores = timeline.map((slot) => {
        const slotRating = computeSurfScore(entry.spot, slot);
        return { ...slot, rating: slotRating };
      });

      let bestSlot = null;
      timelineWithScores.forEach((slot) => {
        if (!bestSlot || slot.rating.score > bestSlot.rating.score) {
          bestSlot = slot;
        }
      });

      const trend = computeTrend(timelineWithScores, rating);

      let bestTimeLabel = "Sem horário definido";
      if (bestSlot && bestSlot.time) {
        const d = new Date(bestSlot.time);
        const h = d.getHours().toString().padStart(2, "0");
        const endH = (d.getHours() + 3).toString().padStart(2, "0");
        bestTimeLabel = `${h}h – ${endH}h`;
      }
      const el = document.createElement("article");
      el.className = "spot-card";
      el.innerHTML = `
      <div class="spot-bg" style="background-image:url('${entry.spot.image}')"></div>
      <div class="spot-overlay"></div>
      <div class="spot-inner">
        <header class="spot-header">
          <div>
            <h3 class="spot-name">${entry.spot.name}</h3>
          </div>
          <div class="spot-score-pill score-${rating.tier}" title="Score calculado a partir de altura de onda, vento, swell, período e orientação do pico.">
            <div class="spot-score-main">
              ${rating.score.toFixed(1)} / 10
              <span class="spot-score-trend spot-score-trend-${trend.variant}" aria-label="${trend.label}">${trend.icon}</span>
            </div>
            <div class="spot-score-label">${rating.label}</div>
          </div>
        </header>
        <div class="spot-core">
          <div class="spot-core-item">
            <span class="spot-core-label">Ondas</span>
            <span class="spot-core-value">${formatWaveHeight(entry.waveHeight)}</span>
          </div>
          <div class="spot-core-item">
            <span class="spot-core-label">Vento</span>
            <span class="spot-core-value">${formatWind(
              entry.windSpeed,
              entry.windDirection
            )}</span>
          </div>
          <div class="spot-core-item">
            <span class="spot-core-label">Melhor horário</span>
            <span class="spot-core-value">${bestTimeLabel}</span>
          </div>
        </div>
      </div>
    `;
      gridEl.appendChild(el);
    });

    container.appendChild(regionBlock);
  });
}

async function loadForecast() {
  try {
    const promises = spots.map((spot) => fetchSpotConditions(spot));
    const results = await Promise.all(promises);

    renderBestSpot(results);
    renderTodayOverview(results);
    renderSpots(results);
  } catch (err) {
    console.error("Erro geral ao montar previsão", err);
    todaySummaryText.textContent =
      "Não foi possível atualizar as condições agora. Tente novamente em alguns minutos.";
  }
}

loadForecast();

