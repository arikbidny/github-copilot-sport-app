import { NextRequest, NextResponse } from "next/server";
import { AzureOpenAI } from "openai";

const endpoint = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY;
const apiVersion = "2024-10-01-preview";
const deployment = "gpt-4o";

/**
 * POST /api/summarize
 * Summarizes a press conference transcription using Azure OpenAI GPT-4o
 * 
 * @param request - Contains transcription text in the request body
 * @returns JSON response with summarized content
 * 
 * Input Format:
 * {
 *   "transcription": "string - The press conference transcription text"
 * }
 * 
 * Output Format:
 * {
 *   "summary": "string - The AI-generated summary"
 * }
 * 
 * Error Handling:
 * - Returns 400 for missing transcription
 * - Returns 500 for API configuration or OpenAI errors
 * - Returns 503 for service unavailable
 */
export async function POST(request: NextRequest) {
  try {
    const { transcription } = await request.json();

    // Validate input
    if (!transcription) {
      return NextResponse.json(
        { error: "Transcription is required" },
        { status: 400 }
      );
    }

    // Check if Azure OpenAI is configured
    if (!endpoint || !apiKey) {
      return NextResponse.json(
        { error: "Azure OpenAI is not configured" },
        { status: 503 }
      );
    }

    // Initialize Azure OpenAI client
    const client = new AzureOpenAI({
      endpoint: endpoint,
      apiKey: apiKey,
      apiVersion: apiVersion,
    });

    // Create summarization prompt
    const systemPrompt = `You are a professional sports journalist. Summarize the following press conference transcription in a clear, concise manner. Focus on:
    - Key points and announcements
    - Player/coach quotes and insights
    - Team strategies and performance analysis
    - Important takeaways for fans
    
    Keep the summary engaging and informative, around 100-150 words.`;

    // Call OpenAI API
    const response = await client.chat.completions.create({
      model: deployment,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: transcription }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const summary = response.choices[0]?.message?.content;

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary });

  } catch (error) {
    console.error("Error in summarize API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
