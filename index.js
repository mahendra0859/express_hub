const express = require("express"),
    app = express(),
    path = require("path"),
    mongoose = require("mongoose"),
    db_url = "mongodb://localhost/express_hbs",
    port = 5000,
    AuthRoutes = require("./app/routes/auth"),
    isAuthenticated = require("./app/controller/user").isAuthenticated,
    UserRoutes = require("./app/routes/user");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
mongoose.connect(`${db_url}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
    err => err ? console.error("Error while connecting to database", err) : console.info("Database Connected Succesfully")
);
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", isAuthenticated, UserRoutes);

app.get("/api/v1", (req, res) => res.send("Welcome API"));

app.get("/", (req, res) => { res.render("index"); });

app.listen(port, () => console.info(`Server is running on Port number ${port}`))