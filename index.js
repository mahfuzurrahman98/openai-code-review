// import { config } from 'dotenv';
const express = require('express');
const reviewCode = require('./openai');

// config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/review-code', async (req, res) => {
  // Get the source code from the request body
  const sourceCode = req.body.source_code;
  // res.send({ sourceCode });

  // Call the reviewCode function with your source code
  try {
    const response = await reviewCode(sourceCode);
    res.send({
      message: 'Code review completed successfully',
      data: response,
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong',
      error: error,
    });
  }
});

const server = app.listen(process.env.PORT || 3000);
server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
