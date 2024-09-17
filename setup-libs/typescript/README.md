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

const completion = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Hello, how are you?' }],
});

await logger.logOpenAI(completion);
```

### Claude (Anthropic)

To log Claude API calls:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: 'your-anthropic-api-key',
});

const completion = await anthropic.completions.create({
  model: 'claude-2',
  prompt: 'Human: Hello, how are you?\nAssistant:',
  max_tokens_to_sample: 300,
});

await logger.logClaude(completion);
```

### Gemini (Google)

To log Gemini API calls:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('your-google-api-key');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const result = await model.generateContent('Hello, how are you?');
const response = await result.response;

await logger.logGemini(response);
```

### Custom LLM

For other LLMs or custom implementations, you can use the general `log` method:

```typescript
await logger.log({
  model: 'custom-model-name',
  prompt: 'Your prompt here',
  completion: 'The model\'s response here',
  // Add any other relevant information
});
```

## Benefits

Using LLM Logger allows you to:

1. Keep track of all your AI API calls in one place.
2. Analyze usage patterns and optimize your API usage.
3. Debug and improve your AI-powered applications more effectively.
4. Maintain a comprehensive log for auditing and compliance purposes.

For more information and advanced usage, visit [LLM Logger](https://llmlogger.com/).