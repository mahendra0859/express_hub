const express = require("express"),
    app = express(),
    path = require("path"),
    mongoose = require("mongoose"),
    port = 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
mongoose.connect("mongodb://localhost/express_hbs", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
    err => err ? console.error("Error while connecting to database", err) : console.info("Database Connected Succesfully")
);

app.get("/", (req, res) => { res.render("index"); });

app.listen(port, () => console.info(`Server is running on Port number ${port}`))