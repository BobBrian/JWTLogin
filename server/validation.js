module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
  
    function validEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
  
    // Check if the Information When a User Registers is Valid
    // Also Make sure the Routes are the Correct One
    if (req.path === "/JWT/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } 

    else if (req.path === "/JWT/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
  next();
};