import express, { Express } from 'express';

export const initialize = (): Express => {
    const app = express();
    app.use(express.json());
    
    return app;
};
