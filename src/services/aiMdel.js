import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMENI_API_KEY } from "../config/config";

const genAI = new GoogleGenerativeAI(GEMENI_API_KEY, {
  httpOptions: { apiVersion: "v1" }
});

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // Add any additional model parameters here
  apiVersion: "v1"
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
