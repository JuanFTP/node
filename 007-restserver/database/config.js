const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos conectada exitosamente");
  } catch (error) {
    console.log("Error al conectarse a la base de datos", error);
  }
};

module.exports = {
  dbConnection,
};
