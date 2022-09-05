"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require("sequelize");
const db = new Sequelize("node", "root", "", {
    host: "localhost",
    dialect: "mariadb",
});
exports.default = db;
//# sourceMappingURL=connection.js.map