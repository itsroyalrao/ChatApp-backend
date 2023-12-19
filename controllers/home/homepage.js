import Auth from "../../models/auth/auth.js";
import jwt from "jsonwebtoken";

const isAuthorized = async (req, res) => {
  const { accessToken } = req.body;

  jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) {
      return res.json({ success: false });
    } else {
      req.email = decoded.email;
      return res.json({ success: true, email: decoded.email });
    }
  });
};

const getFriends = async (req, res) => {
  try {
    const userList = await Auth.find({});
    const users = [];
    userList.forEach((user) => {
      if (user.email !== req.query.email)
        users.push({ name: user.name, email: user.email });
    });

    if (users.length) res.json({ success: true, users: users });
    else res.json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

const getFriend = async (req, res) => {
  try {
    const user = await Auth.findOne({ _id: req.body.id });
    res.json({ name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
  }
};

export { isAuthorized, getFriends, getFriend };
