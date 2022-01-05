const express = require("express");
const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");

//registering a user
router.post("/register", async(req,res) =>{
    try {
        //1. destructure the req.body (name, email, password)
        const {name, email, password} = req.body

        //2. check if the user exists , if not throw error
        const user = await pool.query("SELECT * FROM jwtuser WHERE useremail = $1",[email])

        if(user.rows.length !== 0){
            return res.status(401).send("User exists")
        }

        //3. Bcrypt password
        // This is here to Generate a Password
        // And Encrypt it.

        const saltround  = 10
        const salt = await bcrypt.genSalt(saltround);
        const bycryptpassword = await bcrypt.hash(password,salt)

        //4. Enter the new uesr into the database
        const newuser = await pool.query("INSERT INTO jwtuser(username, useremail, userpassword) VALUES ($1,$2,$3) RETURNING *",
        [name, email,bycryptpassword])

        res.json(newuser.rows[0])



        //5/ Generate JWT Token
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})

module.exports = router;