import 'dotenv/config';
import { app } from './app';

const port = process.env.API_PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at ${new Date().toISOString()}`);
  console.log(`Server is running on ${port}`);
});