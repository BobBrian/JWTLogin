const express = require("express");
const router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../Generator/jwtGenerator");

//registering a user
router.post("/register", async(req,res) =>{
   
    const {name, email, password} = req.body
    try {
        //1. destructure the req.body (name, email, password)
       

        //2. check if the user exists , if not throw error
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        //3. Bcrypt password
        //This is here to encypt our passwords on the server

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. Enter the new uesr into the database
        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);
      
        //5/ Generate JWT Token

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
      
        return res.json({ jwtToken });

        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})

//login user
router.post("/login", async(req,res) =>{
    try {
        // destructure req.body
        const {email, password} = req.body

        // check if user dosent exists and throw error
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[email])

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
        }

        //check if the incoming password is the same as database password
        const validpassword = await  bcrypt.compare(password, user.rows[0].user_password)

        console.log(validpassword)
        

        // give a JWT token
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });
        
    } catch (err) {

        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})


module.exports = router;