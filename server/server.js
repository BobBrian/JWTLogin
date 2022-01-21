const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Needs to be used in the Routes
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
const {check , validationResult} = require ("express-validator")
const jwt = require('jsonwebtoken') // used to generate JWT
const app = express();
//const auth = require("./authurization")

//middleware
app.use(cors())
app.use(express.json());
dotenv.config()

//--Routes--
//--Register User--


app.post("/JWT/register",[check("email", "Please Provide a Valid Email").isEmail(),check("password","Provide a Password with a Minimum of 6 Characters").isLength({ min: 6})] , async (req, res) =>{
    // this works
    try 
    {
        const {name, email, password } = req.body;
        
        //These are the express Validators to Ensure that the Data goes in Properly and that
        // Inproper Data doesnt get returned

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        //Validation Check to Ensure that A User Already Exists
        const presentuser = await pool.query("SELECT * FROM userjwttwo WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
            return res.status(401).json("User already exist!");
        }

        //used to encrypt passwords on the database
        let hashedpassword = await bcrypt.hash(password, 10)

        const user = await pool.query("INSERT INTO userjwttwo (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedpassword ]);
    
        const token = jwtGenerator(user.rows[0].id)

        console.log(hashedpassword, email)

        res.json({token})

        
    } catch (err) {
        
        console.error(err.message)
        
    }
})

//--Login User--
app.post("/JWT/login", async (req, res) =>{
    try {

        const {password, email} = req.body
    
        const user = await pool.query("SELECT * FROM userjwttwo WHERE email = $1", [email]);

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
        
        const token  = jwtGenerator(user.rows[0].id)

        res.json({token})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})

//--Verfiy User JWT Token--
// This is a GET
app.get("/JWT/verify",async (req , res ) =>{
    try {

        res.json(true)

    } catch (err) {

        console.error(err.message);
        res.status(500).send("Server error");
        
    }

})

//Display UserName on Dashboard
//--This is a Get Method--
//Make this a GET Specific Data Name Rather

app.get("/JWT/Dash/Name", async (req, res) => {
    try {
       
        const user = await pool.query("SELECT * FROM userjwttwo WHERE id = $1 ", [req.user])
        console.log(req.user)
        res.json(user.rows[0])
        
    } catch (err) {
        console.error(err.message)
        
    }

})

//Probbaly Change the Method of Genenration.
//

function jwtGenerator(id) {
    
    const payload = {
        user:id
    }

    return jwt.sign(payload, "CAT123")

}


app.listen(5000, () =>{

    console.log("server is up and listening to port 5000");
});