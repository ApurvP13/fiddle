import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { text, toneId, selection } = await request.json();

    // Validate required fields
    if (!text || !toneId) {
      return NextResponse.json(
        { error: "Missing required fields: text and toneId" },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json(
        { error: "Mistral API key not configured" },
        { status: 500 }
      );
    }

    // Create a more sophisticated prompt
    const prompt = `Please rewrite the following text to match a ${toneId.replace(
      "-",
      " "
    )} tone. Keep the core meaning and information intact, but adjust the language style, formality level, and word choice to fit the requested tone.

Original text: "${text}"

Instructions:
- Maintain all factual information and key points
- Adjust vocabulary, sentence structure, and phrasing to match the ${toneId.replace(
      "-",
      " "
    )} tone
- Keep the same approximate length unless the tone naturally requires expansion or compression
- Return only the rewritten text without explanations or meta-commentary
- Don't add em dashes or quotation marks to the text.

Rewritten text:`;

    // Call Mistral API
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7, // Balanced creativity and consistency
        max_tokens: 1000, // Adjust based on your needs
      }),
    });

    // Check if the API call was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Mistral API error:", errorData);
      return NextResponse.json(
        { error: "Failed to process tone change request" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Validate the response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: "Invalid response from Mistral API" },
        { status: 500 }
      );
    }

    // Extract and clean the result
    let result = data.choices[0].message.content.trim();

    // Remove any potential prefix text that might have been added
    if (result.toLowerCase().startsWith("rewritten text:")) {
      result = result.substring(result.indexOf(":") + 1).trim();
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in tone changer API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
