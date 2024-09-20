const {Total} = require('../models');

async function createOrUpdateTotal(newAmount) {
  const existingTotal = await Total.findOne();

  if (existingTotal) {
    await existingTotal.update({ amount: existingTotal.amount + newAmount });
  } else {
    await Total.create({ amount: newAmount });
  }
}

module.exports = createOrUpdateTotal;