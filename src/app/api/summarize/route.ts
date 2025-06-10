import { NextRequest, NextResponse } from "next/server";
import { AzureOpenAI } from "openai";

const endpoint = process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY;
const apiVersion = "2024-10-01-preview";
const deployment = "gpt-4o";

export async function POST(request: NextRequest) {
  const { transcription } = await request.json();

  return NextResponse.json({});
}
