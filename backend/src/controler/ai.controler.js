import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAEGye6p3K9vvqVTkIGayH0kUCQYM3hioE");


const askaiforinterview = async (data) => {


  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = data;

  const result = await model.generateContent({contents: prompt});
  const response = result.response;
  const aitext = response.text();
  return aitext;
};


export default askaiforinterview;

