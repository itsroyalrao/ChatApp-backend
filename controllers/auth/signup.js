import Auth from "../../models/auth/auth.js";
import bcrypt from "bcrypt";

const signupDetails = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Auth.findOne({ email: email });

    if (user)
      return res.json({
        success: false,
        message: "Email is already registered!",
      });
    else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        if (err) console.log(err);
        await Auth.create({ name, email, password: encrypted });
        res.json({ success: true });
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default signupDetails;
