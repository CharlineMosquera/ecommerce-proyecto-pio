const Cart = require("../models/cart");

exports.createCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    const newCart = new Cart({
      userId,
      products,
    });
    await newCart.save();
    res.status(201).json({ message: "Carrito creado", cart: newCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el carrito", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.product"
    );
    if (!cart) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el carrito", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId },
      { products },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.status(200).json({ message: "Carrito actualizado", cart: updatedCart });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el carrito",
      error: error.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartDeleted = await Cart.findOneAndUpdate(
      { userId: userId },
      { products: [] },
      { new: true }
    );
    if (!cartDeleted) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    res.status(200).json({ message: "Carrito vacio", cart: cartDeleted });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el carrito", error: error.message });
  }
};
