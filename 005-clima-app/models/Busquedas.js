const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José", "Veracruz"];

  constructor() {
    // TODO leer BD si existe
  }

  async ciudad(lugar = "") {
    try {
      const resp = await axios.get("https://reqres.in/api/users?page=1");
      console.log(resp.data);
      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Busquedas;
