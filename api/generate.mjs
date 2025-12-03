import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // 1. Prevent the browser from caching the response so every click is new
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // 2. "Temperature" controls randomness (0 = robotic, 1 = creative)
      temperature: 1.2, 
      messages: [
        { 
            role: "system", 
            // 3. This prompt tells ChatGPT exactly how to behave
            content: `You are a mystical fortune cookie. 
            Your goal is to provide a single, cryptic, and wise fortune.
            - Keep it short (under 15 words).
            - Do not use quotes.
            - Do not say "Here is your fortune".
            - Be slightly mysterious but positive.` 
        },
        {
            role: "user",
            content: "Reveal my destiny."
        }
      ],
    });

    const fortune = completion.choices[0].message.content;

    res.status(200).json({ message: fortune });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The stars are cloudy... try again." });
  }
}
