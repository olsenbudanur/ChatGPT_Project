import express from 'express';

const app = express();

const port = 8080;

app.get('/college-essay', (req, res) => {
    res.send('Will serve the college essay here.')
})



app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})