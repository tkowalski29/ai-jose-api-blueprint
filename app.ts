import { ping } from './internal/controller/ping.ts';
import { chat } from './internal/controller/chat.ts';
import { initialize } from './internal/server.ts';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT
const app = initialize();

app.get('/api/ping', ping());
app.post('/api/chat', chat());

app.listen(port, () => {
  console.log(`Server on port :${port}`);
});
