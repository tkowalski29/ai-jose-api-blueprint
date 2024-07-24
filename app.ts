import dotenv from 'dotenv';
import { initialize } from './internal/server.ts';
import { ping } from './internal/controller/ping.ts';
import { raycast } from './internal/controller/raycast.ts';
import { mobileEvent } from './internal/controller/mobile/event.ts';
import { mobile } from './internal/controller/mobile/index.ts';

dotenv.config();
const port = process.env.PORT
const app = initialize();

app.post('/api/mobile/event', mobileEvent());
app.post('/api/mobile', mobile());

app.get('/api/ping', ping());

app.post('/api/raycast', raycast());

app.listen(port, () => {
  console.log(`Server on port :${port}`);
});
