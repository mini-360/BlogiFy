import bcrypt from "bcrypt";
// import admin from "firebase-admin";
// import { getAuth } from "firebase-admin/auth";

import { User } from "../models/user.models.js";
import { generateUsername } from "../utils/creatingUsername.js";
import { formatDatatoSend } from "../utils/formatDataToSend.js";
// import serviceAccountKey from "../secretFile.json" assert { type: "json" };

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey),
// });

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

const loginUser = (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not found" });
      }

      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Error occured while login please try again" });
        }
        if (!result) {
          return res.status(403).json({ error: "incorrect email or password" });
        } else {
          return res.status(200).json(formatDatatoSend(user));
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    });
};

// const googleAuth = async (req, res) => {
//   let { access_token } = req.body;

//   getAuth()
//     .verifyIdToken(access_token)
//     .then(async (decodedUser) => {
//       let { email, name, picture } = decodedUser;

//       picture = picture.replace("s96-c", "s384-c");

//       let user = await User.findOne({ "personal_info.email": email })
//         .select(
//           "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
//         )
//         .then((u) => {
//           return u || null;
//         })
//         .catch((err) => {
//           return res.status(500).json({ error: err.message });
//         });
//       if (user) {
//         // login
//         if (!user.google_auth) {
//           return res
//             .status(403)
//             .json({ error: "Login with password to access the account" });
//         }
//       } else {
//         //signup
//         let username = await generateUsername(email);

//         user = new User({
//           personal_info: {
//             fullname: name,
//             email,
//             profile_img: picture,
//             username,
//           },
//           google_auth: true,
//         });
//         await user
//           .save()
//           .then((u) => {
//             user = u;
//           })
//           .catch((err) => {
//             return res.status(500).json({ error: err.message });
//           });
//       }

//       return res.status(200).json(formatDatatoSend(user));
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         error:
//           "Failed to authenticate you with google try with another account",
//       });
//     });
// };

export { registerUser, loginUser };
