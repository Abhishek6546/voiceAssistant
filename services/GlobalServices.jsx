import OpenAI from "openai";
import { CoachingOptions } from "./Options";
import axios from "axios";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1", // Point to OpenRouter's API
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API,
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Voice Assistant'
    }
});

export const AIModel = async (topic, CoachingOption, msg) => {
    try {
        const option = CoachingOptions.find((item) => item.name === CoachingOption);
        if (!option) {
            console.error("[2] Coaching option not found:", CoachingOption);
            return "I couldn't find the appropriate coaching context.";
        }

        const PROMPT = (option.prompt || "").replace('{user_topic}', topic || '');
        console.log("[3] Generated PROMPT:", PROMPT);

        console.log("[4] Creating completion request...");

        // Add timeout handling
        // const controller = new AbortController();
        // const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // Fallback model
                messages: [
                    { role: "system", content: PROMPT },
                    ...msg
                ],
            });

            // clearTimeout(timeoutId);

            console.log("[5] Full API Response:", completion);

            const content = completion.choices[0]?.message?.content;
            if (!content) {
                throw new Error("Empty response from API");
            }

            console.log("[6] Extracted content:", content);
            return content;

        } catch (err) {
            // clearTimeout(timeoutId);
            console.error("[7] API Call Error:", {
                name: err.name,
                message: err.message,
                stack: err.stack
            });
            throw err; // Re-throw to be caught by outer try-catch
        }

    } catch (error) {
        console.error("[8] Final Error:", {
            error: error.toString(),
            fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
        });
        return "I encountered an error. Please try again later.";
    }
}

export const AIModelToGenerateNotes = async (CoachingOption, conversation) => {
    try {
        const option = CoachingOptions.find((item) => item.name === CoachingOption);
        if (!option) {
            console.error("[2] Coaching option not found:", CoachingOption);
            return "I couldn't find the appropriate coaching context.";
        }
        console.log("Found Coaching Option:", option);

        const PROMPT = option.summeryPrompt;
        console.log("Using Prompt:", PROMPT);

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4", // Change model if needed
                messages: [
                    { role: "system", content: PROMPT },
                    ...conversation
                ],
                temperature: 0.7,
                max_tokens: 100
            });

            console.log("API Response:", completion);

            const content = completion.choices[0]?.message?.content;
            if (!content) {
                throw new Error("Empty response from API");
            }
            return { content };
        } catch (err) {
            console.error("[7] API Call Error:", err);
            throw err;
        }

    } catch (error) {
        console.error("[8] Final Error:", error);
        return "I encountered an error. Please try again later.";
    }
};

// IBM Watson TTS function remains the same


export const playAssistantSpeech = async (text) => {
    try {
        const response = await axios({
            method: "POST",
            url: `${SERVICE_URL}/v1/synthesize?voice=en-US_AllisonV3Voice`,
            auth: { username: "apikey", password: API_KEY },
            headers: {
                "Content-Type": "application/json",
                "Accept": "audio/mp3"
            },
            data: { text, accept: "audio/mp3" },
            responseType: "arraybuffer",
        });
        console.log("play", response)
        return new Blob([response.data], { type: "audio/mp3" });
    } catch (error) {
        console.error("IBM TTS Error:", error);
        return null;
    }
};
