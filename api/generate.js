import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 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
 process .env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
            role: "system", 
            content: "You are a fortune cookie generator. Provide a cryptic, wise, or funny fortune cookie message. Keep it under 20 words. Do not use quotes." 
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const fortune = completion.choices[0].message.content;

    res.status(200).json({ message: fortune });
  } catch (error) {
    console.error(error);
    // If OpenAI fails, return a generic one so the site doesn't crash
    res.status(500).json({ message: "The future is cloudy. Try again." });
  }

}
