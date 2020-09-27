require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
const axios = require('axios');

app.use(bodyParser.json({ 'limit': '100mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors());
app.options("*", cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/get-books', async (req, res) => {
    try {
        let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.query}&key=${process.env.APIKEY}`);
        res.status(200).send({ message: "Books fetched", data: books.data })
    } catch (error) {
        console.log({ error });
        res.status(400).send({ message: "Something went wrong", error });
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`))