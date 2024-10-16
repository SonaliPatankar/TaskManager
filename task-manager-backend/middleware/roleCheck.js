// middleware/roleCheck.js
const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming user role is set in req.user after authentication
  
      if (allowedRoles.includes(userRole)) {
        next(); // Role is allowed, proceed to next middleware/controller
      } else {
        return res.status(403).json({ message: "Access denied." });
      }
    };
  };
  
  module.exports = roleCheck;
  