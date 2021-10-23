const PORT = process.env.PORT || "8000";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Database

// Initial seed functions

// Routers

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

const eraseDatabaseOnSync = true;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Driver Assignment server");
});

app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});

