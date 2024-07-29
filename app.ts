import dotenv from 'dotenv';
import { initialize } from './internal/server.ts';
import { ping } from './internal/controller/ping.ts';
import { raycast } from './internal/controller/raycast.ts';
import { mobile } from './internal/controller/mobile.ts';
import { eventLocation } from './internal/controller/event/location.ts';
import { resourceAssistant } from './internal/controller/resource/assistant.ts';
import { resourceLlm } from './internal/controller/resource/llm.ts';
import { resourceSnippet } from './internal/controller/resource/snippet.ts';

dotenv.config();
const port = process.env.PORT
const app = initialize();

app.post('/api/event/location', eventLocation());

app.get('/api/resource/assistant', resourceAssistant());
app.get('/api/resource/llm', resourceLlm());
app.get('/api/resource/snippet', resourceSnippet());

app.post('/api/mobile', mobile());

app.get('/api/ping', ping());

app.post('/api/raycast', raycast());

app.listen(port, () => {
  console.log(`Server on port :${port}`);
});
