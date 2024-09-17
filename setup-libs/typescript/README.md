# LLM Logger

LLM Logger is a TypeScript/JavaScript library that allows you to easily log your AI API calls to [LLM Logger](https://llmlogger.com/). This package provides direct support for OpenAI, Claude, and Gemini, but you can use it with any LLM by structuring the output yourself.

## Installation

To install the llm-logger package, run the following command:

```bash
npm install llm-logger
```

or if you're using yarn:

```bash
yarn add llm-logger
```

## Setup

First, import the LLMLogger class from the package:

```typescript
import { LLMLogger } from 'llm-logger';
```

Then, create an instance of LLMLogger with your API key:

```typescript
const logger = new LLMLogger('your-api-key-here');
```

## Usage

### OpenAI

To log OpenAI API calls, send the completion object directly as it's returned by the openai library to LLM Logger:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-openai-api-key',
});

const messages = [{ role: 'user', content: 'Hello, how are you?' }]
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
});

await logger.openaiLog(messages, chatCompletion, ['openai-example'], null);
```

### Claude (Anthropic)

To log Claude API calls:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: 'your-anthropic-api-key',
});

const system = 'You are a helpful assistant';
const messages = [{ role: 'user', content: 'Hello, how are you?' }];
const completion = await anthropic.messages.create({
  model: 'claude-3-haiku-20240307',
  system,
  messages,
  max_tokens: 4096,
});

await logger.claudeLog(messages, system, completion, ['claude-example'], null);
```

### Gemini (Google)

To log Gemini API calls:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const model = 'gemini-1.5-flash-latest';
const genAI = new GoogleGenerativeAI('your-google-api-key');
const geminiModel = genAI.getGenerativeModel({ model });

const messages = [{ role: 'user', content: 'Hello, how are you?' }];
const result = await geminiModel.generateContent(messages[0].content);
const response = result.response;

await logger.geminiLog(messages, model, geminiResponse, ['gemini-example'], null);
```

## Benefits

Using LLM Logger allows you to:

1. Keep track of all your AI API calls in one place.
2. Analyze usage patterns and optimize your API usage.
3. Debug and improve your AI-powered applications more effectively.

For more information and advanced usage, visit [LLM Logger](https://llmlogger.com/).
