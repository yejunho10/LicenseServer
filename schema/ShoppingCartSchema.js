const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
    ownerUserId: { type: String, required: true, unique: true },
    items: [
        {
            productId: { type: String, required: true, unique: true },
            count: { type: Number, required: true, default: 1 },
            addedAt: { type: Date, required: true, default: Date.now }
        }
    ]
})

module.exports = shoppingCartSchema