import express from 'express';
import models from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json("Welcome to Driver Assignment api");
})

// Endpoint for initial loadup of drivers/orders
router.get('/orders', async (req, res) => {
  const drivers = await models.Driver.find({});
  const driverlist = JSON.parse(JSON.stringify(drivers));
  
  const requests = driverlist.map( async (driver, driverI) => {
    const orders = await models.Order.find().where({ driver: driver._id })
    driverlist[driverI].orders = orders;
  })

  Promise.all(requests).then(() => {
    res.json(driverlist);
  })
})

export default router;