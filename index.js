const express = require("express"),
    app = express(),
    path = require("path"),
    mongoose = require("mongoose"),
    session = require('express-session'),
    hbs = require("hbs"),
    db_url = "mongodb://localhost/express_hbs",
    port = 5000,
    AuthRoutes = require("./app/routes/auth"),
    isAuthenticated = require("./app/controller/user").isAuthenticated,
    RolesModel = require("./app/model/role"),
    UserRoutes = require("./app/routes/user");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerHelper("inc", (value) => parseInt(value) + 1)
hbs.registerHelper("dec", (value) => {
    if (parseInt(value) > 0) return parseInt(value) - 1
    else return parseInt(value)
})

mongoose.connect(`${db_url}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
    err => err ? console.error("Error while connecting to database", err) : console.info("Database Connected Succesfully")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'MySecret', resave: true,
    saveUninitialized: true
}));

app.use('/uploads', express.static('uploads'));

app.use("/auth", AuthRoutes);
app.use("/user", isAuthenticated, UserRoutes);

(function () {
    RolesModel.estimatedDocumentCount((err, count) => {
        if (count === 0) {
            const role = ["ADMIN", "SUPERVISOR", "USER"];
            RolesModel.insertMany([{ role: role[0] }, { role: role[1] }, { role: role[2] }])
                .then(role => console.info("Role collection created", role))
        }
    })
})()

app.listen(port, () => console.info(`Server is running on Port number ${port}`))