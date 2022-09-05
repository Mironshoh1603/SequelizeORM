const express = require("express");
const app = express();
const { sequelize, User, Post } = require("./models");

app.use(express.json());
app.post("/user", async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.create({ name, email, role });
    res.status(200).json({
      status: "Succes",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});
app.get("/user", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "Succes",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
});
app.get("/user/:uuid", async (req, res, next) => {
  try {
    const users = await User.findOne();
    res.status(200).json({
      status: "Succes",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
});

app.post("/post", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({
      where: {
        uuid: userUuid,
      },
    });
    const post = await Post.create({ body, userId: user.id });
    res.status(200).json({
      status: "Succes",
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
});
const port = 5000;
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
  await sequelize.authenticate();
  console.log("Databse conected...");
});
