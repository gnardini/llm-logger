import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { GEMINI_API_KEY, logger } from './config';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function callGeminiAndLog(prompt: string) {
  try {
    const messages = [{ role: 'user', content: prompt }];
    const model = 'gemini-1.5-flash-latest';

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
      },
    );
    await logger.geminiLog(messages, model, response.data, ['gemini-example'], null);

    // Using the Google Generative AI library
    const geminiModel = genAI.getGenerativeModel({ model });
    const result = await geminiModel.generateContent(prompt);
    const geminiResponse = result.response;

    await logger.geminiLog(messages, model, geminiResponse, ['gemini-example'], null);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

callGeminiAndLog('What is the capital of France?');
