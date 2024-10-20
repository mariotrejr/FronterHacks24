import OpenAI from 'openai';

export async function POST(request) {
  try {
    const { base64Image } = await request.json(); // Parse the incoming request JSON

    if (!base64Image) {
      return new Response(JSON.stringify({ error: 'No image provided.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize OpenAI API with your API key
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Ensure this key is correct
    });

    // Call the OpenAI API to analyze the image using GPT-4 with Vision
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Use GPT-4 for vision-based tasks
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Based on this image what are items in here that can be recycled make them a list of the items that can be returned in JSON format example: {result: [ Plastic bottle, Paper, Metal can, Glass, Cardboard]} if there are multiple items that are the same it is okay to be repeated words ONLY GIVE PURE JSON' },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`, // The base64 image should go into the content field
              },
            },
          ],
        },
      ],
    });

    return new Response(JSON.stringify({ result: response.choices[0].message.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}



