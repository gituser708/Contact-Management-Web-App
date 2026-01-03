require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const contactRoute = require('./routes/contactRoute');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api', contactRoute);

const PORT = process.env.PORT || 5000;

Promise.all([db()]).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});
