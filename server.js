import express from 'express';

const app = express();

app.length('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is runnin on http://127.0.0.1:${PORT}`);
});