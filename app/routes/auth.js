const router = require("express").Router(),
    UserController = require("../controller/user");
module.exports = router;


router.post("/signup/:role", (req, res) => {
    if (req.body.username && req.body.password && req.params.role === "user") {
        UserController.addUser(req.body, req.params.role).then(user => res.status(200).send({ success: true, message: "Signed up successfully", result: user }))
            .catch(err => res.status(500).send({ success: false, message: err.message }));
    } else res.status(400).send({ success: false, message: "Missing body" })
});
router.post("/signin", (req, res) => {
    if (req.body.username && req.body.password) {
        UserController.loginUser(req.body, (err, token) => err ? res.status(500).send({ success: false, message: err.message }) : res.status(200).send({ success: true, message: "Authenticated successfully", result: token }))
    } else res.status(400).send({ success: false, message: "Missing body" })
});

