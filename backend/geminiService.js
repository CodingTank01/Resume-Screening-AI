// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // Initialize Gemini with API key
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // Use fast + reliable model
// // const model = genAI.getGenerativeModel({
// //   model: "gemini-1.5-flash",
// // });

// // /**
// //  * Extract skills and relevance score using Gemini
// //  */
// // export async function extractSkills(jobText, resumeText) {
// //   const prompt = `
// // You are an AI resume screening assistant.

// // Task:
// // 1. Extract key skills from the JOB DESCRIPTION.
// // 2. Extract key skills from the RESUME.
// // 3. Compare them.
// // 4. Return the result in the following JSON format ONLY:

// // {
// //   "jobSkills": ["skill1", "skill2"],
// //   "resumeSkills": ["skill1", "skill2"],
// //   "matchScore": number (0-100)
// // }

// // JOB DESCRIPTION:
// // ${jobText}

// // RESUME:
// // ${resumeText}
// // `;

// //   const result = await model.generateContent(prompt);
// //   const responseText = result.response.text();

// //   // Gemini sometimes returns text around JSON → extract safely
// //   const jsonStart = responseText.indexOf("{");
// //   const jsonEnd = responseText.lastIndexOf("}");

// //   if (jsonStart === -1 || jsonEnd === -1) {
// //     throw new Error("Invalid AI response");
// //   }

// //   const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
// //   return JSON.parse(jsonString);
// // }

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function extractSkills(jobText, resumeText) {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-",
//   });

//   const prompt = `
// You are an AI system that extracts skills.

// JOB DESCRIPTION:
// ${jobText}

// RESUME:
// ${resumeText}

// TASK:
// 1. Extract a list of skills from the job description.
// 2. Extract a list of skills from the resume.
// 3. Return ONLY valid JSON in this exact format:
// {
//   "jobSkills": ["skill1", "skill2"],
//   "resumeSkills": ["skill1", "skill2"]
// }
// `;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();

//   // Clean JSON safely
//   const jsonStart = text.indexOf("{");
//   const jsonEnd = text.lastIndexOf("}");
//   const jsonString = text.substring(jsonStart, jsonEnd + 1);

//   const parsed = JSON.parse(jsonString);

//   // Simple match score
//   const matched = parsed.resumeSkills.filter(skill =>
//     parsed.jobSkills.includes(skill)
//   );

//   return {
//     jobSkills: parsed.jobSkills,
//     resumeSkills: parsed.resumeSkills,
//     matchScore: Math.round(
//       (matched.length / parsed.jobSkills.length) * 100
//     ),
//   };
// }


// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini with API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Use the correct model name - try these in order:
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash-latest", // Try this first
//   // model: "gemini-pro", // Or try this if above fails
// });

// /**
//  * Extract skills and relevance score using Gemini
//  */
// export async function extractSkills(jobText, resumeText) {
//   const prompt = `
// You are an AI resume screening assistant.

// Task:
// 1. Extract key skills from the JOB DESCRIPTION.
// 2. Extract key skills from the RESUME.
// 3. Compare them.
// 4. Return the result in the following JSON format ONLY:

// {
//   "jobSkills": ["skill1", "skill2"],
//   "resumeSkills": ["skill1", "skill2"],
//   "matchScore": number (0-100)
// }

// JOB DESCRIPTION:
// ${jobText}

// RESUME:
// ${resumeText}
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();

//     // Gemini sometimes returns text around JSON → extract safely
//     const jsonStart = responseText.indexOf("{");
//     const jsonEnd = responseText.lastIndexOf("}");

//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("Invalid AI response");
//     }

//     const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
//     return JSON.parse(jsonString);
//   } catch (error) {
//     console.error("Gemini API Error:", error.message);
//     throw error;
//   }
// }

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini with API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Extract skills and relevance score using Gemini
//  */
// export async function extractSkills(jobText, resumeText) {
//   // Try different models in order of preference
//   const modelNames = [
//     "gemini-1.5-flash",
//     "gemini-pro",
//     "gemini-1.5-flash-latest"
//   ];

//   const prompt = `
// You are an AI resume screening assistant.

// Task:
// 1. Extract key skills from the JOB DESCRIPTION.
// 2. Extract key skills from the RESUME.
// 3. Compare them.
// 4. Return the result in the following JSON format ONLY:

// {
//   "jobSkills": ["skill1", "skill2"],
//   "resumeSkills": ["skill1", "skill2"],
//   "matchScore": number (0-100)
// }

// JOB DESCRIPTION:
// ${jobText}

// RESUME:
// ${resumeText}
// `;

//   // Try each model until one works
//   for (const modelName of modelNames) {
//     try {
//       console.log(`Trying model: ${modelName}`);
      
//       const model = genAI.getGenerativeModel({
//         model: modelName,
//       });

//       const result = await model.generateContent(prompt);
//       const responseText = result.response.text();

//       // Extract JSON safely
//       const jsonStart = responseText.indexOf("{");
//       const jsonEnd = responseText.lastIndexOf("}");

//       if (jsonStart === -1 || jsonEnd === -1) {
//         throw new Error("Invalid AI response - no JSON found");
//       }

//       const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
//       const parsed = JSON.parse(jsonString);
      
//       console.log(`✅ Success with model: ${modelName}`);
//       return parsed;
      
//     } catch (error) {
//       console.error(`❌ Failed with model ${modelName}:`, error.message);
      
//       // If this was the last model, throw the error
//       if (modelName === modelNames[modelNames.length - 1]) {
//         throw new Error(`All models failed. Last error: ${error.message}`);
//       }
//       // Otherwise, try the next model
//     }
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractSkills(jobText, resumeText) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-flash",
  });

  const prompt = `
Extract skills from the following text.

JOB DESCRIPTION:
${jobText}

RESUME:
${resumeText}

Return ONLY valid JSON:
{
  "jobSkills": [],
  "resumeSkills": []
}
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = result.response.text();

  const json = JSON.parse(
    text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
  );

  const matched = json.resumeSkills.filter(skill =>
    json.jobSkills.includes(skill)
  );

  return {
    jobSkills: json.jobSkills,
    resumeSkills: json.resumeSkills,
    matchScore: Math.round(
      (matched.length / json.jobSkills.length) * 100
    ),
  };
}
