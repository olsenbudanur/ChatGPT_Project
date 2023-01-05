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

// Get the env variables/API Keys and set up OpenAI API
// dotenv.config({ path: ".env" });
// let APIKEY = process.env.KEY;
// let ORGANIZATION = process.env.ORG;
// const configuration = new Configuration({
//   organization: ORGANIZATION,
//   apiKey: APIKEY,
// });
// dotenv.config({ path: "../.env" });
// const openai = new OpenAIApi(configuration);

//
// Function to make the request to OpenAI
// @param prompt the prompt for the model
async function consultOpenAI(prompt: string): Promise<string> {
  //   const response = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt: prompt,
  //     temperature: 0.7,
  //     max_tokens: 3000,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //   });
  //   const text: string =
  //     response.data.choices[0].text !== undefined
  //       ? response.data.choices[0].text
  //       : "Error!";

  //
  // This is a dummy response. Making a real API call is expensive...
  // let text2 = "As someone who is fascinated by the intersection of gender and astrology, I am incredibly excited to apply to George Mason University as a gender studies major and astrology minor. Since I was a child, I have been captivated by the way that gender roles have shaped our culture, and I have been passionate about learning more about the power of astrology as well. I believe that my studies in gender studies and astrology can provide me with the tools to analyze and understand the complex relationships between gender and astrology in our society. At George Mason University, I would have the opportunity to explore both gender studies and astrology in depth. With a gender studies major, I would gain a better understanding of the underlying issues that shape gender roles in our society. At the same time, my astrology minor would allow me to look at the same issues from a different perspective, as astrology can provide insight into the way that gender roles are expressed in different cultures and contexts. I am confident that my studies in gender studies and astrology at George Mason University will equip me with the skills to better understand the ways in which gender roles are shaped and expressed in our society. I am excited to explore this intersection and use what I learn to make a positive impact on my community."

  // let text3 = "As I sit in my room surrounded by my textbooks, I can't help but reflect on my experiences and the path that has led me to apply to the computer science program at Virginia Tech. I have always been passionate about computer science and its potential to create solutions that have a real-world impact. Growing up, I had access to a computer and the internet and I quickly learned how to code and build my own applications. This sparked my interest in learning more about the field and I began to explore the different possibilities of computer science. I have had the opportunity to explore computer science further through various classes and activities. In my freshman year of high school, I took the AP Computer Science course and I was hooked. I loved the problem-solving and the challenge of creating projects that had real-world applications. I continued my passion for computer science in high school by taking courses in programming languages and computer architecture. Through these courses, I was able to gain a deeper understanding of the fundamentals of computer science and the implications of different technologies. The knowledge I gained in high school and my enthusiasm for the field prompted me to pursue a summer internship at a software development company. This experience further solidified my interest in computer science. I was able to gain"

  let text = "As a world champion kickboxer, I am used to pushing myself to the limit, always striving to reach my goals and make the most of my opportunities. This same tenacity and drive has enabled me to become a successful competitive fighter and, now, I am ready to challenge myself academically. I am confident that I can bring this same level of commitment and passion to Hustlers University. The martial arts have taught me many valuable lessons, including how to stay focused on the task at hand, how to manage my time and energy, and most importantly, how to remain humble and resilient in the face of adversity. These are all qualities that will serve me well as a student at Hustlers University. I am eager to learn from the faculty and students, to contribute my own unique perspective, and to be part of a vibrant and diverse community. My achievements in the world of kickboxing have also shown me the importance of hard work and dedication. I understand that success is a result of preparation and perseverance. I am prepared to take on the challenges of academia and have no doubt that I will be successful in achieving my goals. I am incredibly excited to take my next step in life and apply to Hustlers University. I am confident thatAs a world champion kickboxer, I am used to pushing myself to the limit, always striving to reach my goals and make the most of my opportunities. This same tenacity and drive has enabled me to become a successful competitive fighter and, now, I am ready to challenge myself academically. I am confident that I can bring this same level of commitment and passion to Hustlers University. The martial arts have taught me many valuable lessons, including how to stay focused on the task at hand, how to manage my time and energy, and most importantly, how to remain humble and resilient in the face of adversity. These are all qualities that will serve me well as a student at Hustlers University. I am eager to learn from the faculty and students, to contribute my own unique perspective, and to be part of a vibrant and diverse community. My achievements in the world of kickboxing have also shown me the importance of hard work and dedication. I understand that success is a result of preparation and perseverance. I am prepared to take on the challenges of academia and have no doubt that I will be successful in achieving my goals. I am incredibly excited to take my next step in life and apply to Hustlers University. I am confident thatAs a world champion kickboxer, I am used to pushing myself to the limit, always striving to reach my goals and make the most of my opportunities. This same tenacity and drive has enabled me to become a successful competitive fighter and, now, I am ready to challenge myself academically. I am confident that I can bring this same level of commitment and passion to Hustlers University. The martial arts have taught me many valuable lessons, including how to stay focused on the task at hand, how to manage my time and energy, and most importantly, how to remain humble and resilient in the face of adversity. These are all qualities that will serve me well as a student at Hustlers University. I am eager to learn from the faculty and students, to contribute my own unique perspective, and to be part of a vibrant and diverse community. My achievements in the world of kickboxing have also shown me the importance of hard work and dedication. I understand that success is a result of preparation and perseverance. I am prepared to take on the challenges of academia and have no doubt that I will be successful in achieving my goals. I am incredibly excited to take my next step in life and apply to Hustlers University. I am confident that"


  let text = `When I was twelve years old, I experienced a tragedy that changed my life forever. My beloved cat, Daisy, passed away suddenly, and I was left feeling helpless and heartbroken. I was determined to make something positive out of this loss, and so I decided to use my entrepreneurial skills to start a business that would make it easier for people to travel with their pets.
  
  My business, which helps Airbnb hosts become more pet-friendly, has allowed me to use my knowledge in business and technology to make a difference in the world. I have developed a website that provides hosts with valuable information about pet-friendly rules and regulations in different cities, and I have also connected with local animal shelters to provide hosts with resources and advice on how to safely accommodate pets in their homes.
  
  More than anything, my business has been a reminder to me that I can still make a positive impact in the world, even in the face of tragedy. My entrepreneurial spirit has driven me to excel in my studies, and I have been able to use my business acumen to help others. I have also been able to use my business as a platform to raise awareness about pet adoption, and I have been able to connect with pets through it.
`;


  return text;
}

//
// The post request for writing a college essay.
app.post("/college-essay", async (req: Request, res: Response) => {
  try {
    const promptMain = req.body;

    const collegeName = promptMain.collegeName;
    const prompt = promptMain.prompt;
    const promptTopic = promptMain.promptTopic;
    const mood = promptMain.mood;
    const pageCount = promptMain.pageCount;
    const writtenEssay = promptMain.writtenEssay;
    const hobby = promptMain.hobby;
    const hobbyTime = promptMain.hobbyTime;
    const hobbyFav = promptMain.hobbyFav;
    const hobbyLearned = promptMain.hobbyLearned;
    const hobbyLeadership = promptMain.hobbyLeadership;
    const event = promptMain.event;
    const childhood = promptMain.childhood;
    const anything = promptMain.anything;

    const constructedPrompt = `Write a college essay to ${collegeName} using the prompt ${prompt}.. Yada yada yada`;

    const payload: string = await consultOpenAI(constructedPrompt);
    
    
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
