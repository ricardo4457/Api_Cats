require('dotenv').config();
const express = require('express');
const catRoutes = require('./routes/catRoutes');
const statsRoutes = require('./routes/statsRoutes');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: process.env.CORS_METHODS.split(','),
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS.split(','),
  credentials: process.env.CORS_CREDENTIALS === 'true',
  optionsSuccessStatus: parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS) || 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use(process.env.API_BASE_PATH || '/api/v1', catRoutes);
app.use(process.env.API_BASE_PATH || '/api/v1', statsRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});