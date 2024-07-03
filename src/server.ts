import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { hasError } from './middlewares/hasError';
import { UserRoutes } from './routes/user.routes';
import { TaskRoutes } from './routes/task.routes';

const app = express();

app.use(express.json());
app.use('/user', UserRoutes);
app.use('/task', TaskRoutes);
app.use(hasError);

app.listen(process.env.PORT, () =>
  console.log(`Server running on PORT ${process.env.PORT}`)
);
