
// const express = require ("express");
// const router = new express.Router();



// for user regisstration

// router.post("/register",async(req,res) =>{
//     console.log(req.body);
// });

// module.exports = router;



// const express = require("express");
// const router = new express.Router();
// const userdb = require("../models/userSchema"); // ✅ Import userSchema

// User Registration Route
// router.post("/register", async (req, res) => {
//     console.log(req.body); // Debugging ke liye

//     const { fname, email, password, cpassword } = req.body;

//     ✅ Basic Validation
//     if (!fname || !email || !password || !cpassword) {
//         return res.status(400).json({ error: "Please fill all fields" });
//     }

//     if (password !== cpassword) {
//         return res.status(400).json({ error: "Passwords do not match" });
//     }

//     try {
//         ✅ Check if user already exists
//         const userExists = await userdb.findOne({ email: email });
//         if (userExists) {
//             return res.status(409).json({ error: "This Email is already exists" });
//         }

//         const newUser = new userdb({ fname, email, password, cpassword });
//         // ✅ Save user to database
//         const newUser = new userdb({ fname, email, password, cpassword });
//         await newUser.save();

//         res.status(201).json({ message: " ✅ User registered successfully!" });
//             //here password hasing
//             const storeData = await finalUser.save();
//             console.log(storeData);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;




const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");

// User Registration Route
router.post("/register", async (req, res) => {
    console.log(req.body);

    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        return res.status(400).json({ error: "Please fill all fields" });
    }

    if (password !== cpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const userExists = await userdb.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({ error: "This Email already exists" });
        }

        const newUser = new userdb({ fname, email, password, cpassword });

        const storeData = await newUser.save();
        console.log(storeData);

        res.status(201).json({ status: 201, storeData });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all fields" });
    }

    try {
        const userValid = await userdb.findOne({ email: email });
        if (!userValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, userValid.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid details" });
        }

        // Generate token
        const token = await userValid.generateAuthtoken();
        console.log("Generated Token:", token);

        // Set cookie
        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        const result = {
            userValid,
            token
        };

        res.status(201).json({ status: 201, result });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

