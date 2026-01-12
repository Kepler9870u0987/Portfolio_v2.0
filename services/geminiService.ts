import { GoogleGenAI, Chat } from "@google/genai";
import { MANUEL_CONTEXT } from '../constants';

let chatSession: Chat | null = null;
let aiInstance: GoogleGenAI | null = null;

const validateApiKey = (): boolean => {
  const key = process.env.API_KEY;
  if (!key || key.trim() === '') {
    console.warn("Gemini API Key missing or invalid in process.env.API_KEY");
    return false;
  }
  return true;
};

// Initialize the model safely
const getAiInstance = () => {
  if (!aiInstance && validateApiKey()) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }
  return aiInstance;
};

export const getChatSession = (): Chat | null => {
  const ai = getAiInstance();
  if (!ai) return null;

  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: MANUEL_CONTEXT,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!validateApiKey()) {
      return "⚠️ Configurazione Mancante: API Key non rilevata. Per testare l'AI, configura process.env.API_KEY.";
    }
    
    const chat = getChatSession();
    if (!chat) {
       return "Errore di inizializzazione del servizio AI.";
    }

    const result = await chat.sendMessage({ message });
    
    return result.text || "Scusa, non ho potuto elaborare una risposta in questo momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Si è verificato un errore di connessione con il servizio AI. Riprova più tardi.";
  }
};