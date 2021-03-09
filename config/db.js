// We can either use .then().catch() or use try-catch within async
// Let us use async in this project

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/shopDB'; // Just to keep it in hand-URL defined inside config.env

const connectDB = async () => {
    try {
        const connect1 = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

        console.log(`-----Successfully connected to MongoDB database------`);
        console.log(`-----Established connection: ${connect1.connection.host} -----`);

    } catch (err) {
        console.log(`----Detected ERROR: ` + err + `----`);
        process.exit(1);
    }
}
module.exports = connectDB;