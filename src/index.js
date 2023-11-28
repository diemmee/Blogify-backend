const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const blogRouter = require("./routes/blog.router");

const {
    resourceNotFound,
    handlerError,
} = require("./controllers/errors.controller");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Blog" });
});

app.use("/blog", blogRouter);

app.use(resourceNotFound);
app.use(handlerError);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
