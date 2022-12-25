import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// app.get('/college-essay', (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.json({body: 'Will serve the college essay here. ', req: req.body})
// })


app.post('/college-essay', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({body: 'Will serve the college essay here: ', req: req.body})
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})