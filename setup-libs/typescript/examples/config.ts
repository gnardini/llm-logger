import dotenv from 'dotenv';
import { LLMLogger } from '../src/index';

dotenv.config();

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '';
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const LLM_LOGGER_API_KEY =
  process.env.LLM_LOGGER_API_KEY ||
  'f7b8f88b92234b4a5d5097ddc5aa0128c14b2ec149822c3c26af4ab4fd4eaa11';

export const logger = new LLMLogger({ apiKey: LLM_LOGGER_API_KEY });
