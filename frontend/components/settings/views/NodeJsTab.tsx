import React, { useState } from 'react';

export const NodeJsTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>('OpenAI');

  const subTabs = ['OpenAI', 'Claude', 'Gemini', 'Custom'];

  const getExampleCode = (tab: string) => {
    switch (tab) {
      case 'OpenAI':
        return `
import OpenAI from 'openai';
import { LLMLogger } from 'llm-logger';

const logger = new LLMLogger({ apiKey: 'your-api-key-here' });
const openai = new OpenAI({ apiKey: 'your-openai-api-key' });

const messages = [{ role: 'user', content: 'Hello, how are you?' }]
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
});

await logger.openaiLog(messages, chatCompletion, ['openai-example'], null);
        `;
      case 'Claude':
        return `
import Anthropic from '@anthropic-ai/sdk';
import { LLMLogger } from 'llm-logger';

const logger = new LLMLogger({ apiKey: 'your-api-key-here' });
const anthropic = new Anthropic({ apiKey: 'your-anthropic-api-key' });

const system = 'You are a helpful assistant';
const messages = [{ role: 'user', content: 'Hello, how are you?' }];
const completion = await anthropic.messages.create({
  model: 'claude-3-haiku-20240307',
  system,
  messages,
  max_tokens: 4096,
});

await logger.claudeLog(messages, system, completion, ['claude-example'], null);
        `;
      case 'Gemini':
        return `
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMLogger } from 'llm-logger';

const logger = new LLMLogger({ apiKey: 'your-api-key-here' });
const model = 'gemini-1.5-flash-latest';
const genAI = new GoogleGenerativeAI('your-google-api-key');
const geminiModel = genAI.getGenerativeModel({ model });

const messages = [{ role: 'user', content: 'Hello, how are you?' }];
const result = await geminiModel.generateContent(messages[0].content);
const response = result.response;

await logger.geminiLog(messages, model, geminiResponse, ['gemini-example'], null);
        `;
      case 'Custom':
        return `
import { LLMLogger } from 'llm-logger';

const logger = new LLMLogger({ apiKey: 'your-api-key-here' });

const logData = {
  model: 'your-model-name',
  input_tokens: 10,
  output_tokens: 20,
  stop_reason: 'completion',
  input: 'Your input here',
  output: 'Your output here',
  tags: ['custom-example'],
  user: 'user-id',
};

await logger.log(logData);
        `;
      default:
        return '';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Node.js Setup</h3>
      <p className="mb-4">First, install the llm-logger package:</p>
      <pre className="bg-gray-800 p-4 rounded-md mb-4">
        <code>npm install llm-logger</code>
      </pre>
      <div className="mb-4">
        <div className="flex space-x-2 mb-2">
          {subTabs.map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded-md ${
                activeSubTab === tab ? 'bg-blue-600' : 'bg-gray-700'
              }`}
              onClick={() => setActiveSubTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          <code>{getExampleCode(activeSubTab)}</code>
        </pre>
      </div>
    </div>
  );
};