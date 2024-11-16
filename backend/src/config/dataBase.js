const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit();
    }
};

module.exports = conectarDB;