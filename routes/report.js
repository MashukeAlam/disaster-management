const express = require('express');
const router = express.Router();
const { Item, Transaction, Donation, Crisis, Merchant, CrisisType, Location } = require('../models');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const ensureAdmin = require('../misc/ensureAdmin');

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

module.exports = router;