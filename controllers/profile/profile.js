import Auth from "../../models/auth/auth.js";

const getUserDetails = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.query.email });
    return res.json({ name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
  }
};

export default getUserDetails;
