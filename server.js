const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();
app.use(cors());

app.post('/coordinates', async (req, res) => {
  try {
    const response = await fetch(`https://global.skyhookwireless.com/wps2/json/location?key=${process.env.LOCATION_KEY}&user=${process.env.LOCATION_USER}`);
  } catch (error) {
    console.error(error);
  }
});
