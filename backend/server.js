const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const conectarDB = require("./src/config/dataBase");

// Cargar variables de entorno
dotenv.config({ path: "./.env" });

// Inicializar Express
const app = express();

app.use(express.json());

// Configurar CORS
app.use(cors());

// Conectar a la base de datos
conectarDB();

// Rutas
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));

// Estados
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({mensaje: "Error en el servidor", error: error.message});
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
