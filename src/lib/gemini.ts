import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: apiKey || "" });

export const quoteSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING },
    summary: { type: Type.STRING },
    team: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          seniority: { type: Type.STRING },
          count: { type: Type.NUMBER },
          hourlyRate: { type: Type.NUMBER },
          monthlyCost: { type: Type.NUMBER },
          description: { type: Type.STRING }
        },
        required: ["role", "seniority", "count", "hourlyRate", "monthlyCost"]
      }
    },
    timeline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING },
          duration: { type: Type.STRING },
          milestones: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["phase", "duration", "milestones"]
      }
    },
    deliverables: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING },
          items: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["phase", "items"]
      }
    },
    techStack: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["category", "technologies"]
      }
    },
    riskAssessment: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          risk: { type: Type.STRING },
          impact: { type: Type.STRING },
          mitigation: { type: Type.STRING }
        },
        required: ["risk", "impact", "mitigation"]
      }
    },
    totalEstimatedCost: { type: Type.NUMBER }
  },
  required: ["projectName", "summary", "team", "timeline", "deliverables", "techStack", "riskAssessment", "totalEstimatedCost"]
};

export async function generateQuote(projectDescription: string, selectedEmployees?: any[]) {
  const teamContext = selectedEmployees && selectedEmployees.length > 0 
    ? `The user has already selected the following team members: ${JSON.stringify(selectedEmployees)}. Use these specific roles and rates in the quotation. Do not suggest a different team.`
    : `Suggest a realistic team structure and cost breakdown (assume standard agency rates if not specified).`;

  const model = genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following project description and generate a detailed project estimation and quotation. 
    Project Description: ${projectDescription}
    
    ${teamContext}
    
    Provide a realistic timeline, deliverables per phase, tech stack recommendations, and a risk assessment.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: quoteSchema,
      systemInstruction: "You are an expert project estimator for a software development agency. Your goal is to provide accurate, professional, and comprehensive project quotations based on user requirements."
    }
  });

  const response = await model;
  return JSON.parse(response.text || "{}");
}
