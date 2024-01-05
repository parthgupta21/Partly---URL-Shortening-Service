const express = require("express");
const path = require('path')
const { connectToMongoDB } = require("./connect");
const URL = require('./models/url');
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth')


const urlRoute = require('./routes/url');
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// static folder path
 app.use(express.static("client"));

connectToMongoDB("mongodb://localhost:27017/test").then(console.log(() => "MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user",  userRoute);
app.use("/", checkAuth, staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory:
                {
                    timestamp: Date.now(),
                },
            },

        }
    );
    res.redirect(entry.redirectURL);

});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))