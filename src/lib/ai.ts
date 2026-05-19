// =============================================================================
// CareerForge — AI Client Configuration
// Supports OpenAI (default) with Anthropic as alternative
// =============================================================================

import OpenAI from "openai";

// Initialize OpenAI client — used for resume parsing, email generation,
// job matching, and LinkedIn optimization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

/**
 * Generate a completion using OpenAI's chat API
 * @param systemPrompt - The system-level instruction
 * @param userPrompt - The user's message/content
 * @param options - Optional overrides (model, temperature, max_tokens)
 */
export async function generateAICompletion(
  systemPrompt: string,
  userPrompt: string,
  options?: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    response_format?: { type: "json_object" | "text" };
  }
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: options?.model || process.env.AI_MODEL || "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.max_tokens ?? 4096,
    response_format: options?.response_format,
  });

  return response.choices[0]?.message?.content || "";
}

/**
 * Generate structured JSON output from AI
 */
export async function generateAIJson<T>(
  systemPrompt: string,
  userPrompt: string,
  options?: {
    model?: string;
    temperature?: number;
  }
): Promise<T> {
  const result = await generateAICompletion(systemPrompt, userPrompt, {
    ...options,
    response_format: { type: "json_object" },
  });

  return JSON.parse(result) as T;
}

export { openai };
