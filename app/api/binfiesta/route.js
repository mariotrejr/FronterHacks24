import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Simple GET handler so you can visit /api/binfiesta in the browser
export async function GET() {
  return NextResponse.json({ status: "ok", route: "binfiesta" });
}

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined on the server");
      return NextResponse.json(
        { error: "Server is misconfigured (missing API key)." },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    const prompt = `You are an interactive chatbot that answers questions about Bin Fiesta, a photo-based recycling app. You should provide accurate information about the app's features, recycling practices, and disposal tips. You should be able to help users locate nearby recycling centers by directing them to the app's Centers feature, which lets users find recycling centers near them. If you don't know the answer, apologize and inform the user to send an email to binfiesta.support@gmail.com for further support.

User: ${message}
Bot:`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      {
        error:
          "Sorry, I couldn't process that request. Please contact support, binfiesta.support@gmail.com.",
      },
      { status: 500 }
    );
  }
}
