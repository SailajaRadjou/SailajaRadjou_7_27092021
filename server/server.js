const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

const commentsRouter = require('./routes/comments');
app.use("/comments", commentsRouter);

const usersRouter = require('./routes/users');
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
    console.log("Server is running on port 3001");
    });
});