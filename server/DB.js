const mongoose = require('mongoose');


async function ConnectMongo() {
    
    try {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            throw new Error("🚀 MongoDB URI is missing! Check your .env file.");
        }

        console.log("MongoDB URI:", uri); // Debugging के लिए URI print करें
         
        await mongoose.connect(uri);

         
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



module.exports = ConnectMongo;




