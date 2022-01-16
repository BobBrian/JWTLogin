const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Needs to be used in the Routes
//const bcrypt = require("bcrypt");
const dotenv = require('dotenv')
const validinfo = require("./validation")
const jwt = require('jsonwebtoken') // used to generate JWT
const app = express();

//middleware
app.use(cors())
app.use(express.json());
dotenv.config()

//--Routes--

//--Register User--
// Validation if giving a false so clear that one up
// As Long as this does not iterfear with the code as a whole then there is no
// Problem.

app.post("/JWT/register", validinfo,  async (req, res) =>{
    // this works
    try {

        const {name, email, password } = req.body;

        // This is used to check if a User Already exists, Mini Validation
        const user = await pool.query("SELECT * FROM usersjwt WHERE email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).json("User already exist!");

        }

        //This is used to encrypt a users password on the database -- Note Not really need for the YelpClone Version
        //const salt = await bcrypt.genSalt(10);
        //const bcryptPassword = await bcrypt.hash(password, salt);

        // this is the query to actually register Users
        const newUser = await pool.query("INSERT INTO usersjwt (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password]);
        

        //IMPORTANT THIS IS WHERE JWT TOKEN ARE CREATED
        // The Method in the Video does not Work
        const jwtToken = jwtGenerator(newUser.rows[0].id);

        return res.json({ jwtToken });

        
    } catch (err) {
        
        console.error(err.message)
        
    }
})

//--Login User--
app.post("/JWT/login",validinfo, async (req, res) =>{

    // Required Remake but works now
    try {
        const {email, password} = req.body

        const user = await pool.query("SELECT * FROM usersjwt WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
        }
      
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );
      
        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }
        else{
            return res.status(401).json("User exist!");

        }

        //Next is the JWT Token
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})

//--Verfiy User JWT Token--

//Display UserName on Dashboard
//--This is a Get Method--
app.get("/JWT/dashboard/name", async (req, res) => {
    try {

        const user = await pool.query("SELECT name FROM usersjwt WHERE id = $1",[req.user] ); 
        res.json(user.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }

})

function jwtGenerator(id) {
    const payload = {
      newuser: {
        id: id
      }
    };

    return jwt.sign(payload, process.env.Access_Token_Secret);
}



app.listen(5000, () =>{

    console.log("server is up and listening to port 5000");
});