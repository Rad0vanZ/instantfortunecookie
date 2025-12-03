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
      // High temperature = maximum variety
      temperature: 1.4, 
      messages: [
        { 
            role: "system", 
            content: `You are a legendary Fortune Cookie Writer. 
            
            Your goal is to write a fortune that feels like a hidden gem from Reddit.
            It should be friendly, relatable, funny, or surprisingly wholesome.

            Here is your "Hall of Fame" (examples of perfect fortunes):
            - "About time I got out of that cookie." (Funny/Meta)
            - "The love of your life is right in front of you." (Heartwarming)
            - "A surprise nap is in your near future." (Relatable)
            - "Your vibe is attracting the right tribe." (Modern)
            - "You will read a book and be lost in an adventure." (Cozy)
            - "Delete that alarm clock for tomorrow. You earned it." (Rebellious)
            - "Someone is about to send you a funny meme." (Specific)
            - "You have a secret admirer. It might be a cat, but it counts." (Witty)

            INSTRUCTIONS:
            1. Pick a random tone (Funny, Wholesome, or Relatable).
            2. Write a NEW fortune in that style.
            3. Keep it short (under 20 words).
            4. Do NOT use quotes.
            5. Do NOT be vague (avoid "Good things will come"). Be specific!`
        },
        {
            role: "user",
            content: "Crack me open!"
        }
      ],
    });

    const fortune = completion.choices[0].message.content;

    res.status(200).json({ message: fortune });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The cookie is empty... try again." });
  }
}
