const router = require("express").Router()
const authorize = require("../middleware/auth");
const pool = require("../db");

router.get("/", authorize, async (req,res) =>{
    try {

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user] ); 
        res.json(user.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
        
    }
})

module.exports = router;