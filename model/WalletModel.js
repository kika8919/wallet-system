"use strict";
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallet', walletSchema);
