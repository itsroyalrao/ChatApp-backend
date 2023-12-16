import Auth from "../../models/auth/auth.js";

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

export { getFriends, getFriend };
