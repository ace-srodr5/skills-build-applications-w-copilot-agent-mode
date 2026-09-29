import express from 'express';
import './config/database.js';
import { createApiRouter } from './routes/api.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((_request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use('/api', createApiRouter(apiBaseUrl));
app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`OctoFit API base URL: ${apiBaseUrl}`);
});
