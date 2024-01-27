const express = require("express");
const { User, Account } = require("../db");
const { authMiddleWare } = require("./middleware");
const router = express.Router();
const app = express();
router.get("/balance", authMiddleWare, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.get("/transfer", async (req, res) => {
  const to = req.body.to;
  const amount = req.body.amount;

  const fromAccount = Account.findOne({
    userId: req.userId,
  });
  if (fromAccount.balance < amount) {
    res.status(400).json({
      msg: "Insufficient balance",
    });
  }
  const toAccount = Account.findOne({
    userId: to,
  });
  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
  );

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
