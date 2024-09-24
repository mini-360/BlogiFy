import bcrypt from "bcrypt";

import { User } from "../models/user.models.js";
import { generateUsername } from "../utils/creatingUsername.js";
import { formatDatatoSend } from "../utils/formatDataToSend.js";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
const registerUser = async (req, res) => {
  let { fullname, email, password } = req.body;

  // Validating the data from frontend
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "fullname must be atleat 3 letters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
    });
  }
  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let username = await generateUsername(email);

    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username },
    });
    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDatatoSend(u));
      })
      .catch((err) => {
        if (err.code == 11000) {
          return res.status(500).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
};



const loginUser = async (req, res) => {
  let { email, password } = req.body;

  await User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not found" });
      }

       bcrypt.compare(
        password,
        user.personal_info.password,
        (err, result) => {
          if (err) {
            return res
              .status(403)
              .json({ error: "Error occured while login please try again" });
          }
          if (!result) {
            return res
              .status(403)
              .json({ error: "incorrect email or password" });
          } else {
            return res.status(200).json(formatDatatoSend(user));
          }
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    });
};

export { registerUser, loginUser };
