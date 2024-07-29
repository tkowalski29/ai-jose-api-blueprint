import express from 'express';
import bodyParser from 'body-parser';


export const initialize = (): express.Application => {
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