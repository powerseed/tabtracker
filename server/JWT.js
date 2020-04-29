const jwt = require("jsonwebtoken")

export default function (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET || 'secret', {expiresIn: ONE_WEEK});
}
