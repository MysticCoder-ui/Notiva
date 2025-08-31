const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/Users");
// require("dotenv").config();

const JWT_SECRET = "MySuperUltraLongSecretKeyThatIsAtLeast32Chars!!";

// ============ SIGNUP ===============
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success: false, errors: result.array() });
    }

    try {
      // Check if user exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, errors: ["User already exists"] });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      // Generate email verification token
      const verificationToken = jwt.sign({ email: req.body.email }, JWT_SECRET, { expiresIn: "1d" });


      const verificationUrl = `http://localhost:3000/verify/${verificationToken}`;

      console.log(verificationUrl);



      // Create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        verified: false,
        verificationToken,
      });

      // Auth token (for login after verify)
      const data = { user: { id: user._id } };
      const authToken = jwt.sign(data, JWT_SECRET);


      const EMAIL_USER = "aaradhanas969@gmail.com";
      const EMAIL_PASS = "zwwjqlzvlqfyilwl";
      const FRONTEND_URL = "http://localhost:3000";


      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      // Send Verification Email
      await transporter.sendMail({
        from: `"Notiva 💖" <${EMAIL_USER}>`,
        to: user.email,
        subject: "Verify Your Email",
        html: `
          <h2>Hello, ${user.name}</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${FRONTEND_URL}/verify/${verificationToken}" 
             style="margin:10px; padding:20px 30px; background:#4f46e5; color:white; text-decoration:none; border-radius:6px;">
             Verify Email
          </a>
        `,
      });



      res.status(200).json({
        success: true,
        message: "User registered successfully! Please check your email to verify your account.",
        authToken,
      });
    } catch (error) {
      console.error("🔥 Signup Error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

// ============ LOGIN ===============
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password cannot be blank"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid login credentials" });
      }

      // check password
      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid login credentials" });
      }

      // check if email is verified
      if (!user.verified) {
        return res.status(401).json({ error: "Please verify your email before logging in." });
      }

      const data = { user: { id: user._id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, authToken });

    } catch (error) {
      console.error("🔥 Login Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


// ============ VERIFY EMAIL ===============
router.get("/verify/:token", async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, JWT_SECRET);

    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ msg: "Email verified successfully! 🎉" });
  } catch (err) {
    console.error("🔥 Verify Error:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});


router.post(
  "/logOut",
  async (req, res) => {
   try{
     res.status(200).json({success:true,message:"User finally logged Out"})
   }catch(error){
     res.status(500).json({error:"Internal server error"});
   }
  }
);


module.exports = router;
