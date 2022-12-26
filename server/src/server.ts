import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// app.get('/college-essay', (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.json({body: 'Will serve the college essay here. ', req: req.body})
// })


app.post('/college-essay', (req: Request, res: Response) => {
    console.log(req.body);
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({body: req.body['ChatGPTMessage'], req: req.body})
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})