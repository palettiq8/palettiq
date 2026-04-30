import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const ALLOWED_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, model } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    if (prompt.length > 2000) {
      return NextResponse.json({ error: "Prompt too long" }, { status: 400 });
    }

    const selectedModel = ALLOWED_MODELS.includes(model)
      ? model
      : "gemini-2.0-flash";

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 },
    );
  }
}
