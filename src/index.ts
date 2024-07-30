import dotenv from 'dotenv';
import { initialize } from './internal/server';
import { ping } from './internal/controller/ping';
import { raycast } from './internal/controller/raycast';
import { mobile } from './internal/controller/mobile';
import { eventLocation } from './internal/controller/event/location';
import { resourceAssistant } from './internal/controller/resource/assistant';
import { resourceLlm } from './internal/controller/resource/llm';
import { resourceSnippet } from './internal/controller/resource/snippet';
import { testSse } from './internal/controller/test/sse';

dotenv.config();
const port = process.env.PORT || 8080
const app = initialize();

app.get('/', (req, res) => {
  res.send('Start page')
})

app.post('/api/event/location', eventLocation());

app.get('/api/resource/assistant', resourceAssistant());
app.get('/api/resource/llm', resourceLlm());
app.get('/api/resource/snippet', resourceSnippet());

app.post('/test/sse', testSse("mock"));

app.post('/api/mobile', mobile());

app.get('/api/ping', ping());

app.post('/api/raycast', raycast());

app.listen(port, () => {
  console.log(`Server on port :${port}`);
});
