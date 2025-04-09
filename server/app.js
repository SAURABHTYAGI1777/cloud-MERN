
// const express = require("express");
// const ConnectMongo = require('./DB');
// const router = require("./routes/router");
// const cors = require("cors");
// require('dotenv').config();
// const app = express();
// const port =8009;

// ConnectMongo()


// app.get("/", (req,res) => {
//     res.status(201).json("server created")
// });
// app.use(express.json());
// app.use(cors());
// app.use(router);


// app.listen(process.env.PORT,() => {
//     console.log(`server start at port no : ${process.env.PORT}`);
// })




const express = require("express");
const dotenv = require("dotenv");
const ConnectMongo = require("./DB");
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ✅ Load environment variables
dotenv.config();

const app = express();

// ✅ Connect to MongoDB
ConnectMongo();

// ✅ Allow CORS for frontend requests
app.use(cors({
    origin: "http://localhost:3000", // ✅ React app ka URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ Middleware
app.use(express.json()); // JSON parsing
app.use(cookieParser()); // Cookies support
app.use(router); // Routes

// ✅ Define Port
const PORT = process.env.PORT || 8007;

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
});


