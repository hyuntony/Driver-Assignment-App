const PORT = process.env.PORT || "8000";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// Database
import { connectDb } from './models/index.js';

// Initial seed functions

// Routers

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  console.log('database connected!');
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Driver Assignment server");
});

app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});

