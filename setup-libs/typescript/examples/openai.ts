import axios from 'axios';
import OpenAI from 'openai';
import { logger, OPENAI_API_KEY } from './config';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function callOpenAIAndLog(prompt: string) {
  try {
    const messages = [{ role: 'user', content: prompt }];
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.3,
        max_tokens: 4096,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'content-type': 'application/json',
        },
      },
    );

    await logger.openaiLog(messages, response.data, ['openai-example'], null);

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      // @ts-ignore
      messages,
    });
    await logger.openaiLog(messages, chatCompletion, ['openai-example'], null);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}

callOpenAIAndLog('test');
