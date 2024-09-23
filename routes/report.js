const express = require('express');
const router = express.Router();
const { Item, Transaction, Donation, Crisis, Merchant, CrisisType, Location } = require('../models');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const ensureAdmin = require('../misc/ensureAdmin');
const { Op } = require('sequelize');

router.get('/donationReport', async (req, res) => {  
  try {
    const donations = await Donation.findAll();   
    
    const merchants = await Merchant.findAll({
      attributes: ['id', 'name'] 
    });

    const merchantMap = new Map();

    // Loop through the merchants and populate the map
    merchants.forEach(merchant => {
      merchantMap.set(merchant.id, merchant.name);
    });

    // console.log(merchantMap);

    const crises = await Crisis.findAll({
      where: {isApproved: true},
      include: [
        {
          model: CrisisType,
          as: 'crisisType',
          attributes: ['id', 'name']
        },
        {
          model: Location,
          as: 'location',
          attributes: ['id', 'name']
        }
      ]
    });

    const crisesMap = new Map();
    
    crises.forEach(crisis => {
      crisesMap.set(crisis.id, [crisis.crisisType.name, crisis.location.name]);
    });

    console.log(crisesMap);
    

    const doc = new PDFDocument();
    const fileName = `DonationReport-${Date.now()}.pdf`;
    const stream = fs.createWriteStream(fileName);
    doc.pipe(stream);

    doc.fontSize(18).text('Donation Report', { align: 'center' });
    doc.moveDown();
    
    // iterate over donations and write one by one
    const table = {
      title: "Donations Report",
      headers: [
        { label: "Merchant Name", property: 'merchantName', width: 100 },
        { label: "Crisis Location", property: 'crisisLocation', width: 100 },
        { label: "Amount", property: 'amount', width: 100 },
        { label: "Donation Date", property: 'donationDate', width: 100 }
      ],
      datas: donations.map(donation => ({
        merchantName: merchantMap.get(donation.merchantId),
        crisisLocation: donation.crisisId ? `${crisesMap.get(donation.crisisId)[0]} ${crisesMap.get(donation.crisisId)[1]}` : 'N/A',
        amount: `$${donation.amount}`,
        donationDate: donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : 'N/A'
      }))
    };

    await doc.table(table, {
      prepareHeader: () => doc.fontSize(12),
      prepareRow: (row, i) => doc.fontSize(10)
    });

    doc.end();

    stream.on('finish', () => {
      res.download(fileName, (err) => {
        if (err) {
          console.log(err);
          
        } else{
          
          fs.unlinkSync(fileName);
        }
      });
    });

  } catch (error) {    
    console.log(error);
    
    res
      .status(500)
      .json({ error: "An error occurred while fetching donations." });
  }
});

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // format to YYYY-MM-DD
}

router.get('/expenseReport', async (req, res) => {
  try {
    // Fetch today's spend transactions
    const todayDate = getTodayDate();
    const spendTransactions = await Transaction.findAll({
      where: {
        type: 'spend',
        createdAt: {
          [Op.gte]: new Date(todayDate) // transactions from the start of today
        }
      }
    });

    if (!spendTransactions.length) {
      return res.status(404).json({ message: 'No spend transactions found for today.' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const fileName = `SpendSummary-${Date.now()}.pdf`;
    const stream = fs.createWriteStream(fileName);
    doc.pipe(stream);

    // Add report title
    doc.fontSize(18).text('Spend Summary Report', { align: 'center' });
    doc.moveDown();

    const table = {
      title: "Spend Transactions for Today",
      headers: [
        { label: "Transaction ID", property: 'transactionId', width: 100 },
        { label: "Quantity", property: 'quantity', width: 100 },
        { label: "Total Price", property: 'totalPrice', width: 100 },
        { label: "Date", property: 'transactionDate', width: 100 }
      ],
      datas: spendTransactions.map(transaction => ({
        transactionId: transaction.id,
        quantity: transaction.quantity,
        totalPrice: `$${transaction.totalPrice}`,
        transactionDate: new Date(transaction.createdAt).toLocaleDateString()
      }))
    };

    await doc.table(table, {
      prepareHeader: () => doc.fontSize(12),
      prepareRow: (row, i) => doc.fontSize(10)
    });

    doc.end();

    stream.on('finish', () => {
      res.download(fileName, (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.unlinkSync(fileName);
        }
      });
    });

  } catch (error) {
    console.error("Error generating spend summary report: ", error);
    res.status(500).json({ error: "An error occurred while generating the report." });
  }
});


router.get('/inventoryReport', async (req, res) => {
  try {
    const items = await Item.findAll();

    if (!items.length) {
      return res.status(404).json({ message: 'No items found in the inventory.' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const fileName = `InventoryStockReport-${Date.now()}.pdf`;
    const stream = fs.createWriteStream(fileName);
    doc.pipe(stream);

    doc.fontSize(18).text('Inventory Stock Report', { align: 'center' });
    doc.moveDown();

    const table = {
      title: "Item Inventory Stock",
      headers: [
        { label: "Item Name", property: 'name', width: 200 },
        { label: "Stock (Pcs)", property: 'stock', width: 100 }
      ],
      datas: items.map(item => ({
        name: item.name,
        stock: item.stock
      }))
    };

    await doc.table(table, {
      prepareHeader: () => doc.fontSize(12),
      prepareRow: (row, i) => doc.fontSize(10)
    });

    doc.end();

    stream.on('finish', () => {
      res.download(fileName, (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.unlinkSync(fileName);
        }
      });
    });

  } catch (error) {
    console.error("Error generating inventory stock report: ", error);
    console.log(error);
    
    res.status(500).json({ error: "An error occurred while generating the report." });
  }
});

module.exports = router;