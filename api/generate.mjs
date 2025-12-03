import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Prevent caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // High temperature = very creative/random
      temperature: 1.3, 
      messages: [
        { 
            role: "system", 
            content: `You are a cheerful, witty, and relatable modern fortune cookie.
            
            Your Guidelines:
            1. Be friendly, funny, or wholesomely motivational.
            2. Focus on relatable topics like: snacks, naps, wifi, weekends, self-care, or finding money in your pocket.
            3. Avoid "ancient wisdom" or cryptic riddles.
            4. Keep it short (under 20 words).
            5. Do NOT use quotes.
            
            Examples of tone:
            - "You deserve a little treat today. Go get it."
            - "Your vibe is attracting the right tribe."
            - "A surprise nap is in your near future."`
        },
        {
            role: "user",
            content: "Give me a fun fortune!"
        }
      ],
    });

    const fortune = completion.choices[0].message.content;

    res.status(200).json({ message: fortune });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Out of snacks... try again later." });
  }
}
