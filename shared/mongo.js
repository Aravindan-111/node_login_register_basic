const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

const mongodb = {
  db: null,
  users: null,

  async connect() {
    await client.connect();
    console.log("connected to DB 'mongodb://localhost:27017'");

    this.db = client.db("password-reset");
    this.users = this.db.collection("users");
  },
};

module.exports = mongodb;
