const mongo = require("../shared/mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const service = {
  async register(req, res) {
    try {
      const data = await mongo.users.findOne({ email: req.body.email });

      // Checking weather email already exist in db.
      if (data) {
        res.status(400).send("user already exist");
      } else {
        //   hashing the password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        //   inserting the new user details in db.
        const insertData = await mongo.users.insertOne(req.body);
        console.log(insertData);
        res.status(201).send("user successfully registered");
      }
    } catch (err) {
      console.log("error in", err);
    }
  },

  async login(req, res) {
    try {
      const data = await mongo.users.findOne({ email: req.body.email });

      //   check weather user exist
      if (data) {
        const isValid = await bcrypt.compare(req.body.password, data.password);
        if (!isValid) {
          res.status(403).send("Password is Incorrect");
        } else {
          const token = jwt.sign({ userId: data._id }, "guvi");
          console.log(token);
          res.send({ token: token });
        }
      } else {
        res.send("user doesnt exist");
      }
    } catch (err) {
      console.log(err);
      res.send("error in logging in");
    }
  },
};

module.exports = service;
