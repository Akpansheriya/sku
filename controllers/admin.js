
const { Sequelize } = require("sequelize");
const Database = require("../config/connection");
const admin = Database.admin;
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
    const email = req.body.email;
    const Admin = await admin.findOne({ where: { email: email } });
  
    if (Admin) {
      return res.status(409).json({
        message: "Mail exists",
      });
    } else {
      const adminData = {
       
        email: req.body.email,
        password: req.body.password,
       emailToken:null
      };
    
          admin.create(adminData).then((result) => {
            console.log(result);
            res.status(201).send({
              message: "user created",
              result: result,
            });
          });
     
    }
  };

  const login = async (req, res) => {
    try {
      const Admin = await admin.findOne({ where: { email: req.body.email } });
      
      if (!Admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      const passwordMatch = Admin.password === req.body.password;
  
      if (!passwordMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }
  
      const currentDate = new Date();
      console.log("currentDate",currentDate)
      const activityDate = new Date(Admin.activity);
      console.log("activityDate",activityDate)
      const diffInSeconds = Math.floor((currentDate - activityDate) / 1000);
  console.log("diffInSeconds",diffInSeconds)
      let lastActivity = '';
  
      if (diffInSeconds >= 60) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        lastActivity = `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      } else {
        lastActivity = `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
      }
  
      const token = jwt.sign(
        {
        
          email: Admin.email,
          userId: Admin.id,
        },
        "hello$%#@!ADMIN___++",
        {
          expiresIn: "24h",
        }
      );
  
      await admin.update({ emailToken: token }, { where: { email: req.body.email } });
  
      return res.status(200).json({
        message: 'Login successful',
        token: token,
        user: {
          id: Admin.id,
          email: Admin.email,
          
          lastActivity: lastActivity
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = login;
  
  

  

const logout = async (req, res) => {
  if (req.body.email === "" || req.body.email === undefined) {
    return res.status(400).send({ message: "Email not provided" });
  }

  try {
    const adminRecord = await admin.findOne({ where: { email: req.body.email } });
    if (!adminRecord) {
      return res.status(404).send({ message: "Admin not found" });
    }
    await admin.update({ activity: Sequelize.literal('CURRENT_TIMESTAMP') }, { where: { email: req.body.email } });
    await admin.update({ emailToken: null }, { where: { email: req.body.email } });
    return res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};



module.exports = {
    login,
    register,
    logout
}