// import { config } from 'dotenv';
import Express from 'express';
import reviewCode from './openai.js';

// config();
const app = new Express();

app.use(Express.json());

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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
