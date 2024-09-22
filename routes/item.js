const express = require('express');
const router = express.Router();
const { Item } = require('../models');

router.get('/items', async (req, res) => {
    try {
      const items = await Item.findAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching items', error });
    }
  });
  
router.post('/purchase', async (req, res) => {
    const { itemId, quantity, price } = req.body;
    // console.log(req.body);
    
    try {
        const item = await Item.findByPk(itemId);
        if (!item) {
            return res.status(404).send({ message: 'Item not found' });
        }

        // Update stock
        item.stock += quantity;
        await item.save();

        // Create transaction
        await Transaction.create({
            itemId,
            type: 'purchase',
            quantity,
            totalPrice: price * quantity,
        });

        res.status(200).send({ message: 'Purchase recorded successfully', item });
    } catch (error) {
        res.status(500).send({ message: 'Error processing purchase', error });
    }
});

router.post('/spend', async (req, res) => {
    const { itemId, quantity } = req.body;
    try {
        const item = await Item.findByPk(itemId);
        if (!item || item.stock < quantity) {
            return res.status(400).send({ message: 'Insufficient stock' });
        }

        // Update stock
        item.stock -= quantity;
        await item.save();

        // Create transaction
        await Transaction.create({
            itemId,
            type: 'spend',
            quantity,
            totalPrice: item.price * quantity,
        });

        res.status(200).send({ message: 'Spend recorded successfully', item });
    } catch (error) {
        res.status(500).send({ message: 'Error processing spend', error });
    }
});

module.exports = router;

