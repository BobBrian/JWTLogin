//Check whether the emails is valid or not

module.exports = (req, res, next) => {

    //destructures our email , name and password
    const { email, name, password } = req.body;
  
    // this function is used to check if the emails is valid and in the correct format
    // e.g useremail123@gmail.com

    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    //This is here to check if they are any empty values for registering : basic validiaitons
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    } 

    //This is here to check if they are any empty values for login : basic validiaitons
    else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
  
    next();
};