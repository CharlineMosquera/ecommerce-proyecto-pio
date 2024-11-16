const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rutas de autenticación
// Ruta de registro
router.post('/register', authController.registerUser);

// Ruta de inicio de sesión
router.post('/login', authController.loginUser);

module.exports = router;