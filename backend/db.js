// const mongoose = require("mongoose");

// const mongoURI = "mongodb://localhost:27017/";

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("Connected to Mongo successfully!");
//   } catch (error) {
//     console.error("Mongo connection failed:", error);
//   }
// };

// module.exports = connectToMongo;

const mongoose = require("mongoose");

const connectToMongo = async () => {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to Mongo successfully!");
};

module.exports = connectToMongo;
