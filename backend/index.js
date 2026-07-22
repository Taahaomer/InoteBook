const dotenvResult = require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
// console.log('DOTENV DEBUG:', dotenvResult);
// console.log('MONGO_URI value:', process.env.MONGO_URI);

const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')
connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors())
app.use(cors({
    origin: [
        "https://inote-book-k6l3tbrsh-taaha-omer.vercel.app",
        "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "auth-token"]
}));
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;