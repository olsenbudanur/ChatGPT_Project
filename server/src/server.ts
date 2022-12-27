import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import generator from "generate-password";

var passwords = generator.generate({
	length: 15,
	uppercase: true,
    symbols: true
});

console.log(passwords);

//
// Set up express
const app = express();
const PORT = 8080;
app.use(bodyParser.json());
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))



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
    let text = "As someone who is fascinated by the intersection of gender and astrology, I am incredibly excited to apply to George Mason University as a gender studies major and astrology minor. Since I was a child, I have been captivated by the way that gender roles have shaped our culture, and I have been passionate about learning more about the power of astrology as well. I believe that my studies in gender studies and astrology can provide me with the tools to analyze and understand the complex relationships between gender and astrology in our society. At George Mason University, I would have the opportunity to explore both gender studies and astrology in depth. With a gender studies major, I would gain a better understanding of the underlying issues that shape gender roles in our society. At the same time, my astrology minor would allow me to look at the same issues from a different perspective, as astrology can provide insight into the way that gender roles are expressed in different cultures and contexts. I am confident that my studies in gender studies and astrology at George Mason University will equip me with the skills to better understand the ways in which gender roles are shaped and expressed in our society. I am excited to explore this intersection and use what I learn to make a positive impact on my community."
    return text;
}


//
// The post request for writing a college essay.
app.post('/college-essay', async (req: Request, res: Response) => {
    try {
        const prompt : string = req.body['prompt'];
        const payload : string = await consultOpenAI(prompt);
        res.status(200).send({
            body: payload
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
});



//
// Start listening
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});