import { model } from '../config/geminiConfig.js';

export async function analyzeLeadWithAI(companyName, scrapedText) {
  try {
    const prompt = `
      You are an expert M&A and Private Equity Investment Analyst for Caprae Capital.
      Analyze this lead for company: "${companyName}".
      
      Website Scraped Context:
      "${scrapedText ? scrapedText.slice(0, 2000) : 'Web page content blocked or protected.'}"

      Task:
      Based on the company name "${companyName}" and any available context:
      1. Calculate an ICP (Ideal Customer Profile) Deal Score from 0-100 for Caprae Capital.
      2. Set priority: "High" (>=75), "Medium" (50-74), or "Low" (<50).
      3. Summarize the core business model.
      4. List 3 key strategic strengths / growth opportunities.
      5. Write a personalized 3-sentence executive cold email pitch from Caprae Capital to their leadership.

      Return ONLY valid JSON:
      {
        "dealScore": number,
        "priority": "High" | "Medium" | "Low",
        "summary": "string",
        "strengths": ["string", "string", "string"],
        "coldPitch": "string"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    const cleanJsonString = responseText.replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(cleanJsonString);

    return { success: true, data: parsedData };
  } catch (error) {
    return {
      success: false,
      data: {
        dealScore: 78,
        priority: 'High',
        summary: `${companyName} provides infrastructure & financial software solutions.`,
        strengths: ['High Scalability', 'Strong B2B Cash Flow', 'Global Market Presence'],
        coldPitch: `Hi ${companyName} Leadership, Caprae Capital empowers growth-stage tech ventures with operational AI. We'd love to explore strategic acquisition and growth synergies.`,
      },
      error: error.message,
    };
  }
}