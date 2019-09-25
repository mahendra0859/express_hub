const router = require("express").Router(),
    UserController = require("../controller/user"),
    NoteController = require("../controller/notes");
module.exports = router;

router.post("/signup/:role", (req, res) => {
    if (req.body.username && req.body.password && req.params.role === "user") {
        UserController.addUser(req.body, req.params.role, (err, token) => {
            if (err && err.code === 11000) res.render("signin", { signin: true, error: "User already exists!" })
            else if (err) res.render("signin", { error: err.message })
            else {
                req.session.token = token;
                res.redirect("http://localhost:5000/auth/notes/1");
            }
        });
    } else res.render("signin", { error: "Missing body" })
});
router.post("/signin", (req, res) => {
    if (req.body.username && req.body.password) {
        UserController.loginUser(req.body, (err, token) => {
            if (err) res.render("signin", { signin: true, error: err.message })
            else {
                req.session.token = token;
                res.redirect("http://localhost:5000/auth/notes/1")
            }
        })
    } else res.render("signin", { signin: true, error: "Missing body" })
});


router.get("/notes/:pagenumber", (req, res) => NoteController.fetchNotes({ flag: "public" }).limit(4).skip(5 * (req.params.pagenumber - 1)).then(notes => res.render("index", { notes, token: req.session.token, page: req.params.pagenumber })));
router.get("/search/notes/:pagenumber", (req, res) => {
    NoteController.fetchNotes({ flag: "public", title: new RegExp(req.query.title, 'i') })
        .then(notes => res.render("index", { notes, token: req.session.token }))
});

router.get("/signin", (req, res) => res.render("signin", { signin: true }))
router.get("/signup", (req, res) => res.render("signin"))

router.get("/signout", (req, res) => {
    delete req.session.token;
    res.redirect("http://localhost:5000/auth/notes/1");
});
router.get("/createnote", (req, res) => {
    if (req.session.token) res.render("notes")
    else res.redirect("http://localhost:5000/auth/notes/1")
});