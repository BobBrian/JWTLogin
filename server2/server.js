const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Needs to be used in the Routes
const bcrypt = require("bcrypt");
const {check , validationResult} = require ("express-validator")
const jwt = require('jsonwebtoken') // used to generate JWT
const jwtAuth = require("./checkAuth")
const app = express();


//middleware
app.use(cors())
app.use(express.json());

//Register
//JWT Token Works
//Email and Password Validation Work
//Checking User Credentials Work

app.post("/jwt/register",[check("email", "Please Provide a Valid Email").isEmail()
,check("password","Provide a Password with a Minimum of 6 Characters").isLength({ min: 6})] ,async (req,res)=>{

    try {
        const {name ,email, password } = req.body;

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        //Validation Check to Ensure that A User Already Exists
        const presentuser = await pool.query("SELECT * FROM usersjwt WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
            return res.status(401).json("User already exist!");
        }

        let hashedpassword = await bcrypt.hash(password, 10)

        const users = await pool.query("INSERT INTO usersjwt (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedpassword ]);
        
        console.log(email, password)
        // JWT Token Production 
        const token  = jwt.sign({email},"MEGARANGER123")

       // res.json(users.rows[0]);
       res.json({token})

        
    } catch (err) {
        console.error(err.message)
    }
})

//Login

app.post("/jwt/login", async (req,res)=>{

    try {
        const {password, email} = req.body
    
        const user = await pool.query("SELECT * FROM usersjwt WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(422).json({
                errors: [
                    {
                        msg: "Invalid Email",
                    }
                ]
            })
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );
    
        if (!validPassword) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Invalid Password" 
                    }
                ]
            })
        }

        console.log(email, password)
        // JWT Token Production 
        const token  = jwt.sign({email},"MEGARANGER123")

       // res.json(users.rows[0]);
       res.json({token})
        
    } catch (err) {

        console.error(err.message)
        
    }

})

//Get All

app.get("/jwt/all", async (req,res)=>{

    try {
        const alltableA = await pool.query("SELECT * FROM usersjwt ");
        res.json(alltableA.rows);
        
    } catch (err) {
        console.error(err.message)
    }

})

//Get Public Posts All

app.get("/jwt/public/all", async (req,res)=>{

    try {
        const public = await pool.query("SELECT * FROM publicpost");
        res.json(public.rows);
        
    } catch (err) {
        console.error(err.message)
    }

})

//Get Private Posts All
// It Works as Intended but I need to Change Certain Aspects

app.get("/jwt/dashboard", jwtAuth, async (req,res)=>{

    try {

     //const public = await pool.query("SELECT * FROM usersjwt");
      const public = await pool.query("SELECT name FROM  usersjwt WHERE email = $1",[req.user]);
     // The Code here with the req.user WORKS BABY IT WORKS.
      //res.json(public.rows);
      res.json(public.rows[0]);
      //res.send("This is Working")
        
    } catch (err) {
        console.error(err.message)
    }

})

//Verify Token
//Works as Intended

app.get("/jwt/verify", jwtAuth, async (req,res)=>{

    try {

        res.json(true)
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send("Server error");
        
    }

})

//get Table Information
app.get("/jwt/tableA", async (req,res)=>{

    try {

        //code to generate data
        const alltableA = await pool.query("SELECT * FROM tableA ");
        res.json(alltableA.rows);
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send("Server error");
        
    }

})


app.listen(5000, () =>{

    console.log("server is up and listening to port 5000");
});