const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();
app.use(cors());

app.post('/coordinates', cacheMiddleware, async (req, res) => {
  try {
    const response = await fetch(`https://global.skyhookwireless.com/wps2/json/location?key=${process.env.LOCATION_KEY}&user=${process.env.LOCATION_USER}`);
    const location = await response.json();

    client.setex('location', 3600, JSON.stringify(location));
  } catch (error) {
    console.error(error);
  }
});

function cacheMiddleware(req, res, next) {
  client.get('location', (error, location) => {
    if(error) {
      throw error;
    };

    if(location !== null) {
      res.send(location);
    } else {
      next();
    }
  });
};

app.listen(3001, () => {
  console.log(`App listening on port ${PORT}`);
});
