const spotDefs = [
  {
    id: "joaquina",
    slug: "joaquina",
    name: "Joaquina",
    lat: -27.6286,
    lng: -48.4528,
    image: "/random-2.jpeg",
    orientation: "Leste / Sudeste",
    tip: "Joaquina funciona melhor com swell de sudeste/este-sudeste e vento terral de oeste.",
  },
  {
    id: "mole",
    slug: "praia-mole",
    name: "Praia Mole",
    lat: -27.6053,
    lng: -48.4322,
    image: "/random-3.jpeg",
    orientation: "Leste",
    tip: "Praia Mole costuma alinhar bem com swell de leste e sudeste, com vento mais fraco ou terral.",
  },
  {
    id: "campeche",
    slug: "campeche",
    name: "Campeche",
    lat: -27.65,
    lng: -48.48,
    image: "/random-4.jpeg",
    orientation: "Leste / Sudeste",
    tip: "Campeche prefere swell de sudeste com boa energia e vento de oeste/noroeste.",
  },
  {
    id: "barra",
    slug: "barra-da-lagoa",
    name: "Barra da Lagoa",
    lat: -27.5764,
    lng: -48.4281,
    image: "/random-2.jpeg",
    orientation: "Leste",
    tip: "Barra da Lagoa funciona bem com swell de leste e vento fraco, ideal para sessões mais tranquilas.",
  },
  {
    id: "mocambique",
    slug: "mocambique",
    name: "Moçambique",
    lat: -27.5614,
    lng: -48.4175,
    image: "/random-3.jpeg",
    orientation: "Leste / Nordeste",
    tip: "Moçambique aceita bastante tamanho com swell de nordeste/leste e vento mais organizado.",
  },
  {
    id: "brava",
    slug: "praia-brava",
    name: "Praia Brava",
    lat: -27.35,
    lng: -48.4333,
    image: "/random-1.jpeg",
    orientation: "Leste / Nordeste",
    tip: "Praia Brava costuma funcionar bem com swell de nordeste/leste e vento terral mais fraco.",
  },
  {
    id: "ingleses",
    slug: "ingleses",
    name: "Ingleses",
    lat: -27.435,
    lng: -48.3961,
    image: "/random-4.jpeg",
    orientation: "Leste / Nordeste",
    tip: "Ingleses responde melhor a swell de nordeste/leste, sendo opção boa quando o sul/sudeste passa reto.",
  },
];

const spotConfigs = {
  joaquina: {
    id: "joaquina",
    beachOrientation: 110,
    idealWave: { min: 0.6, max: 2.4, sweetMin: 0.9, sweetMax: 1.8 },
    idealSwellDir: { min: 110, max: 150 },
    idealOffshoreWindDir: { min: 250, max: 310 },
    idealWindSpeed: { max: 9 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  mole: {
    id: "mole",
    beachOrientation: 100,
    idealWave: { min: 0.6, max: 2.1, sweetMin: 0.8, sweetMax: 1.7 },
    idealSwellDir: { min: 90, max: 140 },
    idealOffshoreWindDir: { min: 260, max: 320 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 11 },
  },
  campeche: {
    id: "campeche",
    beachOrientation: 120,
    idealWave: { min: 0.8, max: 2.7, sweetMin: 1.0, sweetMax: 2.1 },
    idealSwellDir: { min: 120, max: 160 },
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
    idealSwellDir: { min: 50, max: 110 },
    idealOffshoreWindDir: { min: 240, max: 300 },
    idealWindSpeed: { max: 11 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  brava: {
    id: "brava",
    beachOrientation: 60,
    idealWave: { min: 0.8, max: 2.6, sweetMin: 1.0, sweetMax: 2.0 },
    idealSwellDir: { min: 40, max: 110 },
    idealOffshoreWindDir: { min: 230, max: 290 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 9, sweet: 12 },
  },
  ingleses: {
    id: "ingleses",
    beachOrientation: 50,
    idealWave: { min: 0.6, max: 2.1, sweetMin: 0.8, sweetMax: 1.6 },
    idealSwellDir: { min: 40, max: 110 },
    idealOffshoreWindDir: { min: 230, max: 290 },
    idealWindSpeed: { max: 10 },
    idealPeriod: { min: 8, sweet: 11 },
  },
};

function normalizeDegreeDifference(targetRange, actual) {
  if (!targetRange || actual == null) return null;
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
  if (a >= min || a <= max) return 0;
  const dist = Math.min(Math.abs(a - min), Math.abs(a - max));
  return dist;
}

function angleDiff(a, b) {
  if (a == null || b == null) return null;
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
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
  const { waveHeight, windSpeed, windDirection, swellDirection, swellPeriod } = conditions;

  let waveScore = 0.4;
  let windScore = 0.5;
  let swellDirScore = 0.5;
  let periodScore = 0.5;
  let tideScore = 0.5;

  if (waveHeight != null) {
    const h = waveHeight;
    const { min, max, sweetMin, sweetMax } = cfg.idealWave;
    if (h < 0.4 || h > 3.0) {
      waveScore = 0.1;
    } else if (h < min || h > max) {
      waveScore = 0.3;
    } else if (h >= sweetMin && h <= sweetMax) {
      waveScore = 0.95;
    } else {
      waveScore = 0.7;
    }
  }

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

      if (diffOff != null && diffOn != null) {
        if (diffOff <= 20) dirScore = 0.95;
        else if (diffOff <= 45) dirScore = 0.8;
        else if (diffOn <= 30) dirScore = 0.15;
        else dirScore = 0.55;
      }

      if (cfg.idealOffshoreWindDir) {
        const diffIdealOff = normalizeDegreeDifference(cfg.idealOffshoreWindDir, windDirection);
        if (diffIdealOff === 0) dirScore = 0.98;
        else if (diffIdealOff <= 20) dirScore = Math.max(dirScore, 0.9);
      }
    }

    windScore = 0.6 * intenScore + 0.4 * dirScore;
  }

  if (swellDirection != null && cfg.idealSwellDir) {
    const diff = normalizeDegreeDifference(cfg.idealSwellDir, swellDirection);
    if (diff === 0) swellDirScore = 0.95;
    else if (diff <= 20) swellDirScore = 0.85;
    else if (diff <= 45) swellDirScore = 0.6;
    else if (diff <= 70) swellDirScore = 0.35;
    else swellDirScore = 0.15;
  }

  if (swellPeriod != null) {
    const p = swellPeriod;
    const { min, sweet } = cfg.idealPeriod;
    if (p >= sweet + 2) periodScore = 0.95;
    else if (p >= sweet) periodScore = 0.85;
    else if (p >= min) periodScore = 0.6;
    else if (p >= min - 2) periodScore = 0.35;
    else periodScore = 0.15;
  }

  if (waveHeight != null) {
    const h = waveHeight;
    if (h >= 0.7 && h <= 1.8) tideScore = 0.7;
    else if (h >= 0.5 && h <= 2.2) tideScore = 0.55;
    else tideScore = 0.4;
  }

  const combined =
    0.35 * waveScore + 0.25 * windScore + 0.2 * swellDirScore + 0.1 * periodScore + 0.1 * tideScore;

  let base = combined;
  base = Math.pow(base, 1.1);

  let finalScore = 1 + 9 * base;
  if (
    finalScore > 9.6 &&
    !(waveScore > 0.9 && windScore > 0.9 && swellDirScore > 0.9)
  ) {
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

function computeTrend(timelineWithScores) {
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

function getSlugFromPath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const slug = parts[1] || "joaquina"; // /surf/<slug>
  return slug;
}

function findSpotBySlug(slug) {
  return spotDefs.find((s) => s.slug === slug) || spotDefs[0];
}

async function fetchSpotForecast(spot) {
  const res = await fetch(
    `/api/surf?lat=${encodeURIComponent(spot.lat)}&lng=${encodeURIComponent(spot.lng)}`
  );
  if (!res.ok) throw new Error("Erro ao buscar previsão para pico.");
  const data = await res.json();
  return data;
}

function groupHoursByDay(hours) {
  const byDay = {};
  hours.forEach((h) => {
    const d = new Date(h.time);
    const key = d.toISOString().slice(0, 10);
    if (!byDay[key]) byDay[key] = [];
    byDay[key].push(h);
  });
  return byDay;
}

function buildDailySummaries(spot, hours, limitDays = 3) {
  const byDay = groupHoursByDay(hours);
  const keys = Object.keys(byDay).sort();
  const days = keys.slice(0, limitDays);

  return days.map((dateKey, idx) => {
    const slots = byDay[dateKey];
    const scored = slots.map((slot) => ({
      slot,
      rating: computeSurfScore(spot, slot),
    }));
    const scores = scored.map((s) => s.rating.score);
    const avgScore =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    let bestSlot = null;
    scored.forEach((s) => {
      if (!bestSlot || s.rating.score > bestSlot.rating.score) bestSlot = s;
    });
    let windowLabel = "—";
    if (bestSlot) {
      const d = new Date(bestSlot.slot.time);
      const h = d.getHours();
      const startH = h.toString().padStart(2, "0");
      const endH = (h + 3).toString().padStart(2, "0");
      windowLabel = `${startH}h – ${endH}h`;
    }
    return {
      dateKey,
      index: idx,
      avgScore,
      bestWindow: windowLabel,
      bestSlot,
      slots: scored,
    };
  });
}

function renderHero(spot, currentEntry, timelineWithScores) {
  const nameEl = document.getElementById("spot-name");
  const descEl = document.getElementById("spot-description");
  const heroBg = document.getElementById("spot-hero-bg");
  const metasEl = document.getElementById("spot-hero-metas");
  const panelEl = document.getElementById("spot-hero-panel");

  const rating = computeSurfScore(spot, currentEntry);
  const trend = computeTrend(timelineWithScores);

  if (nameEl) nameEl.textContent = spot.name;
  if (descEl)
    descEl.textContent =
      spot.tip ||
      "Use a combinação de score, swell e vento para decidir se vale a remada hoje.";
  if (heroBg) heroBg.style.backgroundImage = `url('${spot.image}')`;

  if (metasEl) {
    metasEl.innerHTML = `
      <div class="hero-meta">
        <span class="hero-meta-label">Score agora</span>
        <span class="hero-meta-value">${rating.score.toFixed(1)} / 10</span>
      </div>
      <div class="hero-meta">
        <span class="hero-meta-label">Tendência</span>
        <span class="hero-meta-value">${trend.icon} ${trend.label}</span>
      </div>
      <div class="hero-meta">
        <span class="hero-meta-label">Confiança</span>
        <span class="hero-meta-value">${computeConfidenceLabel(
          currentEntry,
          timelineWithScores
        )}</span>
      </div>
    `;
  }

  if (panelEl) {
    panelEl.innerHTML = `
      <p class="panel-title">Resumo rápido de hoje</p>
      <p class="panel-location">${spot.name}, Florianópolis</p>
      <div class="panel-rows">
        <div class="panel-row">
          <span class="panel-row-label">Condição geral</span>
          <span class="panel-row-value">${rating.label}</span>
        </div>
        <div class="panel-row">
          <span class="panel-row-label">Altura das ondas</span>
          <span class="panel-row-value">${formatWaveHeight(
            currentEntry.waveHeight
          )}</span>
        </div>
        <div class="panel-row">
          <span class="panel-row-label">Swell</span>
          <span class="panel-row-value">${formatSwell(currentEntry)}</span>
        </div>
      </div>
      <p class="panel-footnote">
        Score calculado a partir de altura de onda, vento, swell, período e orientação do pico.
      </p>
    `;
  }
}

function renderNow(spot, currentEntry, timelineWithScores) {
  const metricsEl = document.getElementById("spot-now-metrics");
  const summaryEl = document.getElementById("spot-now-summary");
  const bestWindowEl = document.getElementById("spot-best-window-text");

  if (metricsEl) {
    metricsEl.innerHTML = "";
    const items = [
      { label: "Altura das ondas", value: formatWaveHeight(currentEntry.waveHeight) },
      { label: "Vento", value: formatWind(currentEntry.windSpeed, currentEntry.windDirection) },
      { label: "Swell", value: formatSwell(currentEntry) },
      { label: "Temperatura da água", value: formatTemp(currentEntry.waterTemperature) },
    ];
    items.forEach((m) => {
      const div = document.createElement("div");
      div.className = "today-metric";
      div.innerHTML = `
        <span class="today-metric-label">${m.label}</span>
        <span class="today-metric-value">${m.value}</span>
      `;
      metricsEl.appendChild(div);
    });
  }

  if (summaryEl) {
    summaryEl.textContent =
      "Leitura atual considerando altura de onda, vento, swell e período para este pico específico.";
  }

  if (bestWindowEl && timelineWithScores.length) {
    let best = null;
    timelineWithScores.forEach((slot) => {
      if (!best || slot.rating.score > best.rating.score) best = slot;
    });
    if (best) {
      const d = new Date(best.time);
      const h = d.getHours();
      const startH = h.toString().padStart(2, "0");
      const endH = (h + 3).toString().padStart(2, "0");
      bestWindowEl.textContent = `Melhor horário hoje: ${startH}h – ${endH}h, considerando score e vento mais organizado.`;
    }
  }
}

function renderTimelineToday(spot, hoursToday) {
  const row = document.getElementById("spot-timeline-detailed");
  if (!row) return;
  row.innerHTML = "";
  if (!hoursToday.length) {
    row.innerHTML = `<div class="spot-timeline-empty">Linha do tempo em atualização...</div>`;
    return;
  }

  const scored = hoursToday.map((slot) => ({
    slot,
    rating: computeSurfScore(spot, slot),
  }));

  let best = null;
  scored.forEach((s) => {
    if (!best || s.rating.score > best.rating.score) best = s;
  });

  scored.forEach((item) => {
    const { slot, rating } = item;
    const d = new Date(slot.time);
    const h = d.getHours().toString().padStart(2, "0");
    const tier = tierFromScore(rating.score);
    const height = 20 + (rating.score / 10) * 70; // 20–90px
    const isBest = best && rating.score === best.rating.score;
    const el = document.createElement("div");
    el.className = `spot-timeline-bar score-${tier} ${
      isBest ? "spot-timeline-bar-best" : ""
    }`;
    el.title = `Altura: ${formatWaveHeight(slot.waveHeight)}\nVento: ${formatWind(
      slot.windSpeed,
      slot.windDirection
    )}`;
    el.innerHTML = `
      <span class="spot-timeline-score">${rating.score.toFixed(1)}</span>
      <div class="spot-timeline-bar-fill" style="height:${height}px"></div>
      <span class="spot-timeline-time">${h}h</span>
    `;
    row.appendChild(el);
  });
}

function renderMultiDay(spot, dailySummaries) {
  const grid = document.getElementById("spot-multi-day");
  if (!grid) return;
  grid.innerHTML = "";
  if (!dailySummaries.length) {
    grid.innerHTML = "<p class='spot-timeline-empty'>Dados de previsão insuficientes.</p>";
    return;
  }

  const labels = ["Hoje", "Amanhã", "Depois de amanhã"];

  dailySummaries.forEach((day, idx) => {
    const label = labels[idx] || day.dateKey;
    const ratingLabel = day.avgScore != null ? labelFromScore(day.avgScore) : "—";
    const el = document.createElement("article");
    el.className = "spot-card";
    el.innerHTML = `
      <div class="spot-inner">
        <header class="spot-header">
          <div>
            <h3 class="spot-name">${label}</h3>
          </div>
          <div class="spot-score-pill ${
            day.avgScore != null ? "score-" + tierFromScore(day.avgScore) : ""
          }">
            <div class="spot-score-main">
              ${day.avgScore != null ? day.avgScore.toFixed(1) + " / 10" : "—"}
            </div>
            <div class="spot-score-label">${ratingLabel}</div>
          </div>
        </header>
        <p class="spot-footer">
          ${
            day.bestWindow !== "—"
              ? `Melhor janela prevista: ${day.bestWindow}.`
              : "Sem janela clara definida com os dados atuais."
          }
        </p>
      </div>
    `;
    grid.appendChild(el);
  });
}

async function loadSpotPage() {
  const slug = getSlugFromPath();
  const spot = findSpotBySlug(slug);

  try {
    const data = await fetchSpotForecast(spot);
    const hours = Array.isArray(data.hours) ? data.hours : data.timeline || [];

    if (!hours.length) {
      renderHero(spot, {}, []);
      return;
    }

    const todayKey = new Date().toISOString().slice(0, 10);
    const byDay = groupHoursByDay(hours);
    const hoursToday = (byDay[todayKey] || hours).slice(0, 8);

    const timelineWithScores = hoursToday.map((slot) => ({
      ...slot,
      rating: computeSurfScore(spot, slot),
    }));

    const currentEntry = {
      waveHeight: data.waveHeight ?? hoursToday[0]?.waveHeight ?? null,
      windSpeed: data.windSpeed ?? hoursToday[0]?.windSpeed ?? null,
      windDirection: data.windDirection ?? hoursToday[0]?.windDirection ?? null,
      waterTemperature:
        data.waterTemperature ?? hoursToday[0]?.waterTemperature ?? null,
      swellDirection: data.swellDirection ?? hoursToday[0]?.swellDirection ?? null,
      swellPeriod: data.swellPeriod ?? hoursToday[0]?.swellPeriod ?? null,
    };

    renderHero(spot, currentEntry, timelineWithScores);
    renderNow(spot, currentEntry, timelineWithScores);
    renderTimelineToday(spot, hoursToday);

    const dailySummaries = buildDailySummaries(spot, hours, 3);
    renderMultiDay(spot, dailySummaries);
  } catch (err) {
    console.error("Erro ao carregar página de pico", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSpotPage();

  document.querySelectorAll("[data-scroll-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll-target");
      if (!target) return;
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

