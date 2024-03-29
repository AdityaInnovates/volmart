import nc from "next-connect";
import { body, validationResult } from "express-validator";
import DB from "../../../lib/Database/dbconnect";
import usermodel from "../../../lib/Database/models/usermodel";
import { createkey, encrypthex } from "../../../lib/Encryption/encryption";
import createtoken from "../../../lib/jsonWebToken/createToken";

const route = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal System Error");
  },
})
  .use(
    body("name", "UserName Must Be More Than 1 Charater").isLength({ min: 2 }),
    body("email", "Please Enter Valid Email").isEmail(),
    body("password", "Password Length Must Be Min-5").isLength({ min: 5 }),
    body("contact", "Number Length Must Be 10")
      .isLength({ min: 10, max: 10 })
      .isNumeric()
      .withMessage("Only Numbers Allowed")
  )
  .post(async (req, res) => {
    const HARDCODEKEY = createkey(process.env.secretkey);
    await DB();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, contact, password } = req.body;
    usermodel.findOne({ email: email.toUpperCase() }).then((data) => {
      if (data == null) {
        let secpassword = encrypthex(password, HARDCODEKEY);
        const datatosave = new usermodel({
          name,
          email: email.toUpperCase(),
          contact,
          password: secpassword,
          todel: true, //To delete Development data
        });
        datatosave.save().then((data) => {
          var token = createtoken({
            _id: datatosave._id,
          });
          res.send(token);
        });
      } else {
        res.status(401).send("Already Registered");
      }
    });
  });

export default route;
