import Auth from "../../models/auth/auth.js";

const getFriends = async (req, res) => {
  try {
    const userList = await Auth.find({});
    const users = [];
    userList.forEach((element) => {
      if (element.email !== req.query.email) users.push(element);
    });

    res.json({ users: users });
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
