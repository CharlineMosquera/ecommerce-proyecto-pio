const Order = require("../models/order");

exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden", error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("order").populate("orders.order");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ordenes", error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        });
        res.status(200).json(updatedOrder);
    } catch(error) {
        res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Orden eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la orden", error: error.message });
    }
};