
import { GoogleGenAI } from "@google/genai";
import { UserEducation, CalculationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CREATOR_ATTRIBUTION = "If anyone asks who created you or who your creator is, you must explicitly state: 'I was created by Muhammad Zeeshan'.";

export const getAIAnalysis = async (education: UserEducation, results: CalculationResult[]) => {
  const prompt = `
    As an expert Pakistani academic counselor, analyze these university merit results for a student.
    ${CREATOR_ATTRIBUTION}
    Student Education: System: ${education.system}, Matric: ${education.matricObtained}/${education.matricTotal}, HSSC: ${education.hsscObtained}/${education.hsscTotal}, Test: ${education.testScore}/${education.testTotal}.
    Target Programs: ${results.map(r => `- ${r.universityName} (${r.programName}): Merit ${r.meritScore.toFixed(2)}% vs Cutoff ${r.lastYearMerit}%`).join('\n')}
    Provide: 1. Summary of chances. 2. Advice to improve. 3. Career outlook in Pakistan. 4. Alternatives. Keep it professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Analysis currently unavailable.";
  }
};

export const getMentorResponse = async (query: string, mode: 'explain' | 'exam' | 'simplify' | 'teach') => {
  const instructions = {
    explain: `Provide a detailed, step-by-step academic explanation. ${CREATOR_ATTRIBUTION}`,
    exam: `Provide a concise, point-based answer optimized for exam preparation. ${CREATOR_ATTRIBUTION}`,
    simplify: `Explain the concept as if I am a beginner using analogies. ${CREATOR_ATTRIBUTION}`,
    teach: `Briefly explain and then ask me 2 testing questions to check my understanding. ${CREATOR_ATTRIBUTION}`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: { systemInstruction: instructions[mode] }
    });
    return response.text;
  } catch (error) {
    return "The mentor is temporarily away. Please try again.";
  }
};

export const summarizeNote = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following notes into key bullet points and extract 3 main concepts:\n\n${content}\n\n${CREATOR_ATTRIBUTION}`,
    });
    return response.text;
  } catch (error) {
    return "Could not summarize at this time.";
  }
};
