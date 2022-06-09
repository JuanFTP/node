const fs = require("fs");

const path = "./db/";
const file = "data.json";
const source = `${path}${file}`;

const saveData = (data) => {
  fs.writeFileSync(source, data);
};

const readData = () => {
  if (!fs.existsSync(source)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(source, { encoding: "utf-8" }));
};

module.exports = {
  saveData,
  readData,
};
