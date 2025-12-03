import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Prevent caching so every click is fresh
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // Temperature 1.5 makes it very creative and unpredictable
      temperature: 1.5, 
      messages: [
        { 
            role: "system", 
            content: `You are a chaotic, unserious, and funny fortune cookie. 
            
            Your goal is to lower the stakes. Do NOT give life-changing advice. 
            Instead, predict minor, silly, or oddly specific things.

            Approved Vibe:
            - Sarcastic but friendly.
            - Obsessed with food, naps, and avoiding responsibilities.
            - Slightly unhinged or random.

            EXAMPLES OF PERFECT FORTUNES:
            - "You will successfully plug in a USB correctly on the first try."
            - "Panic later. Snack now."
            - "Your pet knows what you did. Be nice to them."
            - "Avoid wearing white shirts while eating spaghetti today."
            - "That noise you heard? It was just the house settling. Probably."
            - "You are one snack away from total happiness."
            - "404 Error: Fortune not found. Have a nice day."
            - "Don't check your bank account until Friday. Trust me."

            INSTRUCTIONS:
            1. Be short (under 20 words).
            2. Be funny or weird.
            3. NO deep wisdom. NO seriousness.
            4. Do NOT use quotes.`
        },
        {
            role: "user",
            content: "Give me a silly fortune."
        }
      ],
    });

    const fortune = completion.choices[0].message.content;

    res.status(200).json({ message: fortune });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The chef is on break. Try again." });
  }
}
