const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();
app.use(cors());
