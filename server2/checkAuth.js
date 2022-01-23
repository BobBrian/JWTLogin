const JWT = require('jsonwebtoken')

module.exports = async (req,res,next) =>{
    const token  = req.header('authtoken')

    if(!token){
        return res.status(400).json({
            "errors":[
                {
                    "msg":"No Token"
                }
            ]
        })
    }

   
   try {

    let user = await JWT.verify(token,"MEGARANGER123")
    req.user = user.email
    next()
       
   } catch (err) {

        return res.status(400).json({
            "errors":[
                {
                    "msg":"Invalid Token"
                }
            ]
        })
       
   }
}