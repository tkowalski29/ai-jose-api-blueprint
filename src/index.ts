import dotenv from 'dotenv';
import { initialize } from './internal/server';
import { ping } from './internal/controller/ping';
import { eventLocation } from './internal/controller/event/location';
import { resourceAssistant } from './internal/controller/resource/assistant';
import { resourceLlm } from './internal/controller/resource/llm';
import { resourceSnippet } from './internal/controller/resource/snippet';
import { testSse } from './internal/controller/test/sse';
import { mobileJose } from './internal/controller/mobile/jose';
import { raycastJose } from './internal/controller/raycast/jose';
import { resourceSupabase } from './internal/controller/resource/supabase';

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
app.get('/api/resource/supabase', resourceSupabase());

app.post('/test/sse', testSse("mock"));

app.post('/api/mobile/jose', mobileJose());

app.get('/api/ping', ping());

app.post('/api/raycast/jose', raycastJose());

app.listen(port, () => {
  console.log(`Server on port :${port}`);
});