import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import rateLimiter from "./utils";
import dotenv from "dotenv";
import { request } from "http";
import path from "path";

dotenv.config({ path: ".env" });


// let host = "http://localhost:3000";
let host = "https://tutanaai.com";

let apiOrNot = true;
// Set up express
const app = express();
const PORT = 8080;
app.use(bodyParser.json());
const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options("*", cors());

//
// Set up stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([[1, { priceInCents: 499, name: "Essay" }]]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item: any) => {
        const storeItem = { priceInCents: 499, name: "Essay" };
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: host + "/949ff4f6-8fb1-11ed-a1eb-0242ac120002",
      cancel_url: host + "/prompts",
    });
    res.json({ url: session.url });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Get the env variables/API Keys and set up OpenAI API
let APIKEY = process.env.KEY;
let ORGANIZATION = process.env.ORG;
const configuration = new Configuration({
  organization: ORGANIZATION,
  apiKey: APIKEY,
});
dotenv.config({ path: "../.env" });
const openai = new OpenAIApi(configuration);

//
// Function to make the request to OpenAI
// @param prompt the prompt for the model
async function consultOpenAI(prompt: string): Promise<string> {
  let text;

  console.log(apiOrNot);

  if (apiOrNot) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    text =
      response.data.choices[0].text !== undefined
        ? response.data.choices[0].text
        : "Error!";
  } else {
    text = `I have always been a curious and open-minded person. I am never afraid to challenge and question the beliefs and ideas that I come across in life. One particular time that I questioned and challenged a belief or idea was when I decided to explore my own gender identity.

    Growing up, I was assigned the female gender at birth. I was raised in a traditional family and was taught that gender was something that was predetermined and fixed. I followed this belief for most of my life without questioning it. However, as I got older, I started to become more interested in exploring what gender really meant to me.
    
    I began to research gender identity in greater detail. I read books, articles, and watched documentaries about gender fluidity and different gender identities. I started to realize that gender was not as simple or straightforward as society made it out to be. Instead, I learned that gender was a spectrum and that self-identification was the most important factor in determining one's gender identity.
    
    The more I learned, the more I started to question my own gender identity. I began to examine my feelings and beliefs around gender and eventually realized that I did not completely identify with either the male or female gender binary. I identified as gender non-binary and I felt empowered to finally be able to label my gender identity.
    
    This realization was both liberating and empowering. I was able to accept and embrace my gender identity without fear or judgement. I was also able to share my gender identity with my family and friends and receive their support. This experience has helped me to gain more confidence in myself and my beliefs.
    
    By challenging the traditional belief about gender, I was able to come to a better understanding of myself and my identity. I am grateful for the opportunity to explore and discover my own gender identity and to be able to express it openly and proudly.
    
    This experience has helped me to become more open-minded and accepting of different beliefs and ideas. I am now eager to explore more aspects of gender identity and to continue to challenge traditional beliefs. As a student at Temple University, I hope to use my open-mindedness and curiosity to gain further knowledge and understanding of gender identity and its implications. I also plan to use my education to help bridge the gender pay gap and create more equitable working conditions for all genders.
    
    With my ambition, open-mindedness, and drive, I believe that I am an ideal candidate for Temple University. I am confident that the knowledge and experience I gain at Temple will help me to continue to challenge traditional beliefs and explore my own gender identity. With my passion and determination, I will be able to make my parents proud and achieve my goals of creating more equitable working conditions for all genders.
`;
  }

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

  // let text = "As a world champion kickboxer, I am used to pushing myself to the limit, always striving to reach my goals and make the most of my opportunities. This same tenacity and drive has enabled me to become a successful competitive fighter and, now, I am ready to challenge myself academically. I am confident that I can bring this same level of commitment and passion to Hustlers University. The martial arts have taught me many valuable lessons, including how to stay focused on the task at hand, how to manage my time and energy, and most importantly, how to remain humble and resilient in the face of adversity. These are all qualities that will serve me well as a student at Hustlers University. I am eager to learn from the faculty and students, to contribute my own unique perspective, and to be part of a vibrant and diverse community. My achievements in the world of kickboxing have also shown me the importance of hard work and dedication. I understand that success is a result of preparation and perseverance. I am prepared to take on the challenges of academia and have no doubt that I will be successful in achieving my goals. I am incredibly excited to take my next step in life and apply to Hustlers University. I am confident thatAs a world champion kickboxer, I am used to pushing myself to the limit, always striving to reach my goals and make the most of my opportunities. This same tenacity and drive has enabled me to become a successful competitive fighter and, now, I am ready to challenge myself academically. I am confident that I can bring this same level of commitment and passion to Hustlers University. The martial arts have taught me many valuable lessons, including how to stay focused on the task at hand, how to manage my time and energy, and most importantly, how to remain humble and resilient in the face of adversity. These are all qualities that will serve me well as a student at Hustlers University. I am eager to learn from the faculty and students, to contribute my own unique perspective, and to be part of a vibrant and diverse community. My achievements in the world of kickboxing have also shown me the importance of hard work and dedication. I understand that success is a result of preparation and perseverance. I am prepared to take on the challenges of academia and have no doubt that I will be successful in achieving my goals. I am incredibly excited to take my next step in life and apply to Hustlers University. I am confident thatAs a world champion kickboxer, I am used to pushing myself to the limit, always striving to reach my goals and make the most of my opportunities. This same tenacity and drive has enabled me to become a successful competitive fighter and, now, I am ready to challenge myself academically. I am confident that I can bring this same level of commitment and passion to Hustlers University. The martial arts have taught me many valuable lessons, including how to stay focused on the task at hand, how to manage my time and energy, and most importantly, how to remain humble and resilient in the face of adversity. These are all qualities that will serve me well as a student at Hustlers University. I am eager to learn from the faculty and students, to contribute my own unique perspective, and to be part of a vibrant and diverse community. My achievements in the world of kickboxing have also shown me the importance of hard work and dedication. I understand that success is a result of preparation and perseverance. I am prepared to take on the challenges of academia and have no doubt that I will be successful in achieving my goals. I am incredibly excited to take my next step in life and apply to Hustlers University. I am confident that"

  return text;
}

//
// The post request for writing a college essay.
app.post("/college-essay", async (req: Request, res: Response) => {
  res.set("Access-Control-Expose-Headers", "location");
  res.set("Access-Control-Allow-Credentials", "true");
  try {
    const email = req.body.email;

    rateLimiter(email);

    const promptMain = req.body;

    const collegeName = promptMain.collegeName;
    const prompt = promptMain.prompt;
    let promptTopic = promptMain.promptTopic;
    const mood = promptMain.mood;
    const pageCount: string = promptMain.pageCount;
    const reasonCollege = promptMain.writtenEssay;
    const major = promptMain.hobby;
    const hobby = promptMain.hobbyTime;
    const obstacles = promptMain.hobbyFav;
    const whoInspire = promptMain.hobbyLearned;
    const collegePurpose = promptMain.hobbyLeadership;
    const problemsSolved = promptMain.event;
    const captivation = promptMain.childhood;
    const threewords = promptMain.anything;

    if (promptTopic === "") {
      promptTopic = "This essay is a personal statement";
    } else {
      promptTopic =
        "The prompt that my essay should answer: '" + promptTopic + "'";
    }

    //
    // The first essay section written.
    const constructedPrompt = `I am writing a college essay application to ${collegeName}. I want this essay to a ${mood} mood. ${promptTopic}. I am ${threewords} as a student. I am interested in majoring in ${major}. The reason I want to go to ${collegeName} is ${reasonCollege}. What I want to achieve in ${collegeName} is ${collegePurpose} My hobbies include: ${hobby}. My biggest obstacles were: ${obstacles}. I admire ${whoInspire}. I am captivated by: ${captivation}. The problems I solved were : ${problemsSolved}. Write the initial section of this essay in ${
      Number(pageCount) * 150
    } words. This section should not have a conclusion or a summary since it's the first half.`;

    const payload: string = await consultOpenAI(constructedPrompt);

    //
    // Complete the essay.
    let constructedPrompt3 = `Write the conclusion to this essay in ${
      Number(pageCount) * 150
    } wirds. Make sure not to be repetetive: "${payload}"`;
    const payload3: string = await consultOpenAI(constructedPrompt3);

    const finalPayload = payload + payload3;

    res.status(200).send({
      body: finalPayload,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send("Rate Limiting");
  }
});

app.get("/hayat", async (req: Request, res: Response) => {
  const hayat = req.query.hayat;

  if (hayat === "hayat") {
    apiOrNot = !apiOrNot;
    const text = "hayat" + (apiOrNot ? "on" : "off");
    res.status(200).send(text);
  } else {
    res.status(400).send(`it is ${apiOrNot}`);
  }
});


app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../", "../", "client", "build", "index.html")
  );
});

//
// Start listening
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});


module.exports = app;