import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

//
// Set up express
const app = express();
const PORT = 8080;
app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//
// Get the env variables/API Keys and set up OpenAI API
// dotenv.config({ path: ".env" });
// let APIKEY = process.env.KEY;
// let ORGANIZATION = process.env.ORG;
// const configuration = new Configuration({
// 	organization: ORGANIZATION,
// 	apiKey: APIKEY,
// });
// dotenv.config({ path: "../.env" });
// const openai = new OpenAIApi(configuration);

//
// Function to make the request to OpenAI
// @param prompt the prompt for the model
async function consultOpenAI(prompt: string): Promise<string> {
  // const response = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: prompt,
  //     temperature: 0.7,
  //     max_tokens: 3000,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  // });
  // const text: string = response.data.choices[0].text !== undefined ? response.data.choices[0].text : "Error!";

  //
  // This is a dummy response. Making a real API call is expensive...
  let text =
    "As a first-generation American, I am deeply passionate about using my experiences to create meaningful change in the world. Growing up, I was exposed to a variety of cultures and languages, which has shaped my curiosity about the world and its people. This curiosity has driven me to explore a wide range of topics, from foreign languages and cultures to international politics and global economics. My academic journey has been a challenge. Although I started out with a limited understanding of English, I worked hard to make it my second language, and today I am fluent in both English and Spanish. I have used this bilingualism to become a bridge between my Hispanic heritage and the American culture. This bridge has allowed me to take advantage of opportunities to engage with different cultures on a deeper level. My education has allowed me to explore the world and gain a greater understanding of its people. In my high school, I was an active member of several clubs that focused on global issues, such as the International Relations Club and the Model United Nations team. These activities gave me the chance to hone my public speaking skills and taught me the importance of collaboration and negotiation. My involvement in these clubs has also opened the door to numerous volunteer experiences. For example, I have volunteered with the United Nations Refugee Agency and the International Rescue Committee, both of which have provided me with invaluable insight into the struggles of people around the world. At Harvard College, I hope to continue my journey of exploration and learning. I plan to use the resources available to me to gain a better understanding of the world, its people, and its cultures. I am confident that the education I will receive at Harvard College will provide me with the tools I need to make an impact in the world. With my passion, drive, and dedication, I am determined to make a difference.";
  return text;
}

//
// The post request for writing a college essay.
app.post("/college-essay", async (req: Request, res: Response) => {
  try {
    const prompt: string = req.body["prompt"];
    const payload: string = await consultOpenAI(prompt);
    res.status(200).send({
      body: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

//
// Start listening
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
