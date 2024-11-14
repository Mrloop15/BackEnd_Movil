const jwt = require("jsonwebtoken");

function autentifica(req, res, next) {
  const jwtoken = req.header("Authorization");

  if (!jwtoken) {
    return res.status(401).send("Acceso denagado. Necesitas un Token");
  }

  try {
    const payload = jwt.verify(jwtoken, "c0ntr4s3n1a");
    req.user = payload;
    next();
  } catch (e) {
    res.status(400).sed("Acceso denegado. Token no valido");
  }
}

module.exports = autentifica;
