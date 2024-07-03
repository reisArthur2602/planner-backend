import 'dotenv/config';
import 'express-async-errors';
import express from 'express';

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Server running on PORT ${process.env.PORT}`)
);
