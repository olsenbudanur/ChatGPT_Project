import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
//
// Get the env variables
dotenv.config({ path: "../.env" });

let APIKEY = process.env.KEY;
let ORGANIZATION = process.env.ORG;

const configuration = new Configuration({
    organization: ORGANIZATION,
    apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);

const prompt =
    "Write me a college essay to get into Harvard as a Computer Science major.";

const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});

console.log(response.data.choices[0].text);
