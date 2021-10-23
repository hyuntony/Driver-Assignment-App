import mongoose from 'mongoose';

import Driver from './driver.js';
import Order from './order.js';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { Driver, Order }

export { connectDb };

export default models;