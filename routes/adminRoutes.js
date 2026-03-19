const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const adminEmail = "admin@logistics.com";
  const adminPassword = "2000&26";

  if (email === adminEmail && password === adminPassword) {
    res.json({
      success: true,
      token: "admin-token"
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }
});

module.exports = router;