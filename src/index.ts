import express from 'express';
import dotenv from 'dotenv';
import { ping } from './controller/ping';
import { eventLocation } from './controller/event/location';
import { resourceAssistant } from './controller/resource/assistant';
import { resourceLlm } from './controller/resource/llm';
import { resourceSnippet } from './controller/resource/snippet';
import { testSse } from './controller/test/sse';
import { mobileJose } from './controller/mobile/jose';
import { raycastJose } from './controller/raycast/jose';
import { resourceSupabase } from './controller/resource/supabase';
import { botGhostJose } from './controller/botGhost/jose';

dotenv.config();
const initialize = (): express.Application => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
  });
  
  return app;
};


const port = process.env.JOSE_API_PORT || 8080
const app = initialize();

app.get('/', (req, res) => {
  res.send('Start page')
})

app.post('/api/bot-ghost/jose', botGhostJose());

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
