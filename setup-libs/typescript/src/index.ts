import axios from 'axios';

interface Message {
  role: string;
  content: string | null;
  refusal?: string | null;
}

export interface LogData {
  model: string;
  input_tokens: number;
  output_tokens: number;
  stop_reason?: string;
  input: string;
  output: string;
  error?: string;
  tags: string[];
  user: string | null;
}

export class LLMLogger {
  private apiUrl: string;
  private apiKey: string;

  constructor({ apiUrl, apiKey }: { apiUrl?: string; apiKey: string }) {
    this.apiUrl = apiUrl || 'https://llmlogger.com/api/logs/create';
    this.apiKey = apiKey;
  }

  public openaiLog(
    messages: Message[],
    chatCompletion: {
      model: string;
      usage?: {
        prompt_tokens: number;
        completion_tokens: number;
      };
      choices: {
        finish_reason: string;
        message: Message;
      }[];
    },
    tags: string[],
    user: string | null,
  ) {
    const choice = chatCompletion.choices[0];
    const logData: LogData = {
      model: chatCompletion.model,
      input: JSON.stringify(messages),
      output: JSON.stringify(choice?.message ? [choice.message] : []),
      tags,
      user,
      input_tokens: chatCompletion.usage?.prompt_tokens ?? 0,
      output_tokens: chatCompletion.usage?.completion_tokens ?? 0,
      stop_reason: chatCompletion.choices[0].finish_reason,
    };
    this.log(logData);
  }

  public log(data: LogData) {
    console.log('LLM Log:', data);

    return this.sendToApi(data);
  }

  private async sendToApi(data: LogData) {
    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error: any) {
      //   console.error('Error logging data:', error);
      console.log(error.response.data.error);
    }
  }
}
