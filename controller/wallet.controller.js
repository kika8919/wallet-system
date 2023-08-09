"use strict";

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Wallet = mongoose.model("Wallet");
const Transaction = mongoose.model("Transaction");

const setupWallet = async (req, res) => {
  try {
    const { balance, name } = req.body;
    // creating wallet
    const wallet = new Wallet({
      balance: parseFloat(balance.toFixed(4)),
      name,
    });
    const createdWallet = await Wallet.create(wallet);

    // creating and saving new transaction
    const newTransaction = new Transaction();
    newTransaction.amount = parseFloat(balance.toFixed(4));
    newTransaction.balance = parseFloat(balance.toFixed(4));
    newTransaction.walletId = wallet._id;
    newTransaction.date = createdWallet.date;
    newTransaction.type = "CREDIT";
    newTransaction.description = "Wallet Setup";
    const firstTransaction = await Transaction.create(newTransaction);

    // updating the wallet with created transactionId
    createdWallet.transactionId = firstTransaction._id;
    await createdWallet.save();

    return res.json(createdWallet.toJSONWalletWithTransactionId());
  } catch (err) {
    console.log("Error in setupWallet", err);
    res.status(500).json(err);
  }
};

const creditDebitAmount = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;
    // updating wallet balance
    const updatedWallet = await Wallet.findOneAndUpdate(
      { _id: new ObjectId(walletId) },
      { $inc: { balance: parseFloat(amount.toFixed(4)) } },
      { new: true }
    );
    if (updatedWallet) {
      // creating and saving new transaction
      const newTransaction = new Transaction();
      newTransaction.amount = amount;
      newTransaction.balance = parseFloat(updatedWallet.balance.toFixed(4));
      newTransaction.date = updatedWallet.date;
      newTransaction.walletId = walletId;
      newTransaction.type = amount >= 0 ? "CREDIT" : "DEBIT";
      newTransaction.description = description;
      const createdTransaction = await Transaction.create(newTransaction);

      return res.json({
        transactionId: createdTransaction._id,
        balance: updatedWallet.balance,
      });
    } else {
      return res.json({ message: "wallet does not exist" });
    }
  } catch (err) {
    console.log("Error in creditDebitAmount", err);
    res.status(500).json(err);
  }
};

const fetchTransactions = async (req, res) => {
  try {
    const { walletId, skip, limit } = req.query;
    // fetchin all transactions by walletId
    const transactions = await Transaction.find({
      walletId: new ObjectId(walletId),
    })
      .skip(skip || 0)
      .limit(limit || 0);
    const allTransactions = [];
    transactions.forEach((transaction) => {
      allTransactions.push(transaction.toTransactionJSON());
    });
    return res.json(allTransactions);
  } catch (err) {
    console.log("Error in fetchTransactions", err);
    res.status(500).json(err);
  }
};

const getWalletDetails = async (req, res) => {
  try {
    const { id } = req.params;
    // fetchin wallet by walletId
    const wallet = await Wallet.findOne({ _id: new ObjectId(id) });
    return res.json(
      wallet ? wallet.toJSONWallet() : { message: "wallet not found" }
    );
  } catch (err) {
    console.log("Error in getWalletDetails", err);
    res.status(500).json(err);
  }
};

module.exports = {
  setupWallet,
  creditDebitAmount,
  fetchTransactions,
  getWalletDetails,
};
