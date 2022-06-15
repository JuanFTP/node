const fs = require("fs");
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
      limit: 5,
    };
  }

  get paramsOpenWeatherMap() {
    return {
      appid: process.env.OPENWEATHERMAP_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const places = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const respPlaces = await places.get();

      return respPlaces.data.features.map((feature) => ({
        id: feature.id,
        nombre: feature.place_name,
        longitud: feature.center[0],
        latitud: feature.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaPorGeolocacion(lon, lat) {
    try {
      const wTI = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeatherMap, lat, lon },
      });

      const { data } = await wTI.get();
      const { main, weather } = data;

      return {
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        status: weather[0].description,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarAlHistorial(lugar = "") {
    if (!this.historial.includes(lugar)) {
      this.historial.push(lugar);
      this.guardarDB();
    }
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) {
      return;
    }

    const data = JSON.parse(
      fs.readFileSync(this.dbPath, { encoding: "utf-8" })
    );
    
    this.historial = data.historial;
  }
}

module.exports = Busquedas;
