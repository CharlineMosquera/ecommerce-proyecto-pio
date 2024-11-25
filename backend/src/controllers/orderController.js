const Order = require("../models/order");
const Cart = require("../models/cart");

exports.createOrderFromCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    let total = 0;
    const productsOrder = cart.products.map((item) => {
      const price = item.product.price * item.quantity;
      total += price;
      return {
        product: item.product,
        quantity: item.quantity,
        price: price,
      };
    });
    const newOrder = new Order({
      userId: userId,
      cartId: cart._id,
      products: productsOrder,
      total: total,
    });
    await newOrder.save();
    await Cart.findOneAndUpdate({ userId: userId }, { products: [] });
    res
      .status(201)
      .json({ message: "Orden creada con exito", orden: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la orden", error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  const { userId, orderId } = req.params;
  try {
    const order = await Order.findOne({
      _id: orderId,
      userId: userId,
    }).populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las ordenes", error: error.message });
  }
};
