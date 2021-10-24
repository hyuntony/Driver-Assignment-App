import express from 'express';
import models from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json("Welcome to Driver Assignment api");
})

// initial loadup of drivers/orders
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

// Edit revenue and cost of order
router.post('/orders/update', async (req, res) => {
  console.log('change request received');

  const { orderId, revenue, cost } = req.body;

  const order = await models.Order.findOne().where({ _id: orderId });
  order.revenue = Number(revenue);
  order.cost = Number(cost);

  order.save(() => {
    return res.json(order);
  });
})

//Delete Order
router.post('/orders/delete', async (req, res) => {
  console.log('delete request received');

  const {orderId} = req.body;

  const order = await models.Order.findOneAndDelete().where({ _id: orderId });

  return res.json(order);
})

//Assign Order
router.post('/orders/assign', async(req, res) => {
  console.log('assign request received');

  const { orderId, driverId } = req.body;

  const order = await models.Order.findOne().where({ _id: orderId });
  order.driver = driverId;

  order.save(() => {
    return res.json(order);
  });
})

export default router;