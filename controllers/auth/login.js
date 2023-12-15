import Auth from "../../models/auth/auth.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) console.log(err);
        else if (same) return res.json({ success: true });
        else
          return res.json({
            success: false,
            message: "Password is incorrect!",
          });
      });
    } else
      return res.json({
        success: false,
        message: "User doesn't exist!",
      });
  } catch (e) {
    console.log(e.message);
  }
};

export default login;
