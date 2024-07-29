import type { Request, Response} from "express";

export const testSse = () => async (req: Request, res: Response) => {
  console.log("Nowe połączenie SSE");
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  const sendEvent = (data: any) => {
      try {
          res.write(`data: ${JSON.stringify(data)}\n\n`);
      } catch (err) {
          console.error('Error send data:', err);
          clearInterval(intervalId);
          res.end();
      }
  };

  let counter = 0;
  const exampleData = () => ({
      content: `Mock message ${counter++}`,
  });

  const intervalId = setInterval(() => {
      if (counter >= 10) {
          clearInterval(intervalId);
          console.log('Stop 10 message');
          res.end();
          return;
      }
      const data = exampleData();
      console.log('Send data:', data);
      sendEvent(data);
  }, 500);

//   req.on('close', () => {
//       clearInterval(intervalId);
//       console.log('Close connection');
//       res.end();
//   });

  req.on('error', (err) => {
      clearInterval(intervalId);
      console.error('Error connection:', err);
      res.end();
  });
};
