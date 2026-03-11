const STORMGLASS_ENDPOINT = "https://api.stormglass.io/v2/weather/point";

/**
 * Vercel Serverless Function
 * GET /api/surf?lat=...&lng=...
 */
module.exports = async (req, res) => {
  const { lat, lng } = req.query || {};

  if (!lat || !lng) {
    res
      .status(400)
      .json({ error: "Parâmetros 'lat' e 'lng' são obrigatórios em /api/surf." });
    return;
  }

  const apiKey = process.env.STORMGLASS_API_KEY;
  if (!apiKey) {
    res
      .status(500)
      .json({ error: "Variável de ambiente STORMGLASS_API_KEY não configurada." });
    return;
  }

  const params = [
    "waveHeight",
    "windSpeed",
    "windDirection",
    "waterTemperature",
    "swellDirection",
    "swellPeriod",
  ].join(",");

  const url = new URL(STORMGLASS_ENDPOINT);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lng", String(lng));
  url.searchParams.set("params", params);
  url.searchParams.set("source", "noaa");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Stormglass error:", response.status, text);
      res
        .status(response.status)
        .json({ error: "Erro ao consultar Stormglass.", status: response.status });
      return;
    }

    const data = await response.json();
    const hours = data.hours || [];
    const first = hours[0] || {};

    const timelineIndices = [0, 3, 6, 9, 12].filter((i) => i < hours.length);
    const timeline = timelineIndices.map((i) => {
      const h = hours[i] || {};
      return {
        time: h.time,
        waveHeight: h.waveHeight?.noaa ?? null,
        windSpeed: h.windSpeed?.noaa ?? null,
        windDirection: h.windDirection?.noaa ?? null,
        waterTemperature: h.waterTemperature?.noaa ?? null,
        swellDirection: h.swellDirection?.noaa ?? null,
        swellPeriod: h.swellPeriod?.noaa ?? null,
      };
    });

    const payload = {
      waveHeight: first.waveHeight?.noaa ?? null,
      windSpeed: first.windSpeed?.noaa ?? null,
      windDirection: first.windDirection?.noaa ?? null,
      waterTemperature: first.waterTemperature?.noaa ?? null,
      swellDirection: first.swellDirection?.noaa ?? null,
      swellPeriod: first.swellPeriod?.noaa ?? null,
      timeline,
    };

    res.status(200).json(payload);
  } catch (error) {
    console.error("Erro inesperado em /api/surf:", error);
    res.status(500).json({ error: "Erro interno ao consultar previsão." });
  }
};

