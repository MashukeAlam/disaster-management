const express = require("express");
const { Donation, User, Crisis, Merchant, Total, Location, CrisisType } = require("../models");
const createOrUpdateTotal = require("../misc/updateTotal");

const router = express.Router();

router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.findAll();

    res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    
    res
      .status(500)
      .json({ error: "An error occurred while fetching donations." });
  }
});

router.get("/totalDonation", async (req, res) => {
  try {
    const existingTotal = await Total.findOne();

    if (existingTotal) {
      res.status(200).json(existingTotal);
    } else {
      res.status(200).json({ amount: 0 });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching donations." });
  }
});

router.get("/merchants", async (req, res) => {
  try {
    const merchants = await Merchant.findAll({});
    res.status(200).json(merchants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching donations." });
  }
});

router.post("/donation", async (req, res) => {
  const { amount, userId, crisisId, merchantId } = req.body;
  console.log(req.body);

  try {
    if (!amount || !merchantId) {
      return res
        .status(400)
        .json({ error: "Amount and Merchant ID are required." });
    }

    const newDonation = await Donation.create({
      amount,
      userId,
      crisisId,
      merchantId,
    });

    await createOrUpdateTotal(amount);

    res.status(201).json(newDonation);
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: "An error occurred while creating the donation." });
  }
});

module.exports = router;
