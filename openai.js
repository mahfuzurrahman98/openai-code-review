// import { config } from 'dotenv';
// import OpenAI from 'openai';
const OpenAI = require('openai').default;

// config();
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey,
  model: 'gpt-3.5-turbo',
});

async function reviewCode(sourceCode) {
  console.log(sourceCode);
  try {
    // Create a list to store all the messages for context
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
    ];

    // Add the sourceCode to the list
    messages.push({ role: 'user', content: sourceCode });

    // Add the prompt to modify the code
    messages.push({
      role: 'system',
      content:
        'Do an in-depth proper code review, make the code documented, and put better comments where needed. Just give the code as output, No additional messages like "here is your code, Sure, blah blah".',
    });

    // Request gpt-3.5-turbo for chat completion
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    // Print the response and add it to the messages list
    let chatMessage = response.choices[0].message.content;
    messages.push({ role: 'assistant', content: chatMessage });

    // just keep the portion between ``` and ```, and also remove the first line
    chatMessage = chatMessage.split('```')[1].split('\n').slice(1).join('\n');
    return chatMessage;
  } catch (error) {
    throw error;
  }
}

module.exports = reviewCode;
