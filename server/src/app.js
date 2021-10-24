const PORT = process.env.PORT || "8000";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// Database
import models, { connectDb } from './models/index.js';

// Initial seed function
import { createDrivers } from './seeds/create-drivers.js';

// Routers
import indexRouter from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', indexRouter);

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Driver.deleteMany({}),
      models.Order.deleteMany({})
    ]);

    createDrivers();
  }
  console.log('database connected!');
});

app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});

