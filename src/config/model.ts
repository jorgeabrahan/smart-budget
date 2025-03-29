import contextModel from './context/contextModel.txt?raw';
import contextResponse from './context/contextResponse.txt?raw';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 1.3,
    maxOutputTokens: 250
  },
  systemInstruction: `
    ${contextModel}
    ${contextResponse}
  `
});
