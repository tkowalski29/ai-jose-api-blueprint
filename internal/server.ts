import express from 'express';

export const initialize = (): express.Application => {
    const app = express();
    
    return app;
};