const Cart = require("../models/cart");

exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el carrito", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("products.product");
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el carrito", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el carrito",
        error: error.message,
      });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el carrito", error: error.message });
  }
};
