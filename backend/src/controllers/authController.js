const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Clave secreta para confirmar el JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({ message: "El correo ya esta registrado" });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: encryptedPassword,
            address,
            phone
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch(error) {
        res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        // Crea el token JWT
        const token = jwt.sign({ id:user._id, role:user.role}, JWT_SECRET, {expiresIn: "1h"});
    } catch(error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
}