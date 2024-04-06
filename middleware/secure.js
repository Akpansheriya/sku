const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "hello$%#@!ADMIN___++");
      console.log("decoded", decoded);
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
  };
};
