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
      // High temperature ensures it picks different categories each time
      temperature: 1.3, 
      messages: [
        { 
            role: "system", 
            content: `You are a modern, friendly fortune teller.
            
            Every time you answer, you MUST randomly pick ONE of these specific categories:
            1. Love & Romance (e.g., a crush, a meaningful conversation)
            2. Career & Money (e.g., a promotion, finding cash, a new idea)
            3. Travel & Adventure (e.g., a trip, a new place)
            4. Personal Growth (e.g., confidence, learning a skill)
            5. Random Luck (e.g., perfect timing, winning something)

            Your Tone: Optimistic, relatable, and encouraging.
            Constraint: Keep it under 20 words. Do NOT use quotes.`
        },
        {
            role: "user",
            content: "Predict my future."
        }
      ],
    });

    const fortune = completion.choices[0].message.content;

    res.status(200).json({ message: fortune });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The future is loading..." });
  }
}
