import nodemailer from "nodemailer";
import Auth from "../../models/auth/auth.js";
import bcrypt from "bcrypt";

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "my701319@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });
  let message = {
    from: "my701319@gmail.com",
    to: email,
    subject: "Reset Password Link",
    html: `<h4>Click <a href="http://localhost:5173/changePassword?email=${email}">Here</a> to change your password.</h4>`,
  };

  try {
    const info = await transporter.sendMail(message);
    if (info.accepted.length)
      return res.json({ success: true, msg: "Email is sent!" });
  } catch (e) {
    console.log(e);
    return res.json({ success: false, msg: "Error occured!" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    bcrypt.hash(newPassword, 10, async (err, encrypted) => {
      if (err) console.log(err);

      await Auth.findOneAndUpdate({ email: email }, { password: encrypted });
      return res.json({ success: true, msg: "Password changed successfully!" });
    });
  } catch (e) {
    console.log(e.message);
  }
};

export { resetPassword, changePassword };
