import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import { CLAUDE_API_KEY, logger } from './config';

const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
});

async function callClaudeAndLog(prompt: string) {
  try {
    const messages = [{ role: 'user', content: prompt }];
    const system = 'You are a helpful AI assistant.';
    const model = 'claude-3-haiku-20240307';

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model,
        messages,
        system,
        max_tokens: 4096,
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'content-type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
      },
    );

    await logger.claudeLog(messages, system, response.data, ['claude-example'], null);

    const completion = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      // @ts-ignore
      messages,
      system,
    });

    await logger.claudeLog(messages, system, completion, ['claude-example'], null);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

callClaudeAndLog('What is the capital of France?');
