import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMENI_API_KEY } from "../config/config";

const genAI = new GoogleGenerativeAI(GEMENI_API_KEY, {
  httpOptions: { apiVersion: "v1" }
});
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // <-- Recommended stable model alias
  // apiVersion: "v1" // You can often omit this if using the new SDK defaults
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
});
