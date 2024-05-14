import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (!process.env.JWT) throw new Error('invalid credentials')

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return res.status(400).json({ success: false, message: "Token is invalid!" })
      req.user = user;

      if (req.user) {
        return next();
      } else {
        return res.status(401).json({ success: false, message: "You are not allowed!" })
      }
    });
  } else {
    return res.status(401).json({ success: false, message: "You are not logged in!" })
  }
};
