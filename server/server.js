const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


const db = require('./models');

app.use(bodyParser.json());

//Routers
const postRouter = require('./routes/posts');
app.use("/posts", postRouter);

const commentsRouter = require('./routes/comments');
app.use("/comments", commentsRouter);

const usersRouter = require('./routes/users');
app.use("/auth", usersRouter);

const likesRouter = require('./routes/likes');
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
    console.log("Server is running on port 3001");
    });
});