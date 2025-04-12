require('dotenv').config();
const express = require('express');
const catRoutes = require('./routes/catRoutes');
const statsRoutes = require('./routes/statsRoutes');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://192.168.1.75:5173',
  methods: (process.env.CORS_METHODS || 'GET,POST,PUT,DELETE').split(','),
  allowedHeaders: (process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization').split(','),
  credentials: process.env.CORS_CREDENTIALS === 'true',
  optionsSuccessStatus: parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS) || 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());

const basePath = process.env.API_BASE_PATH || '/api/v1';
app.use(basePath, catRoutes);
app.use(basePath, statsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origin: ${corsOptions.origin}`);
});