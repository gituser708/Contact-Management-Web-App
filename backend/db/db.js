const mongoose = require('mongoose');

const db = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then((res) => {
        console.log(`MongoDB Connected To: ${res.connection.name}`);
    }).catch((err) => {
        console.error(err);
    });
};

module.exports = db;