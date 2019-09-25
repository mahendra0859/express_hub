const UserModel = require("../model/user"),
    RoleModel = require("../model/role"),
    compare = require("bcrypt").compare,
    jwt = require("jsonwebtoken"),
    SECRET = "681bfbb0bb32e351acd413241fc964e1da0cc6ccb3078bd6d08a71e137710356e82201fd190041f36d6198794f5516067c52afdb0540e5c177abded118d578695813774eaeec2e7c957be78132bcac0a39c5e06d571da0ad3619b8ebed4afae759e6251e69a531f4142b61d56ae750d709bb198d276b4451bdcba5823d1991fb077e800fa6db0b820b587c58f45224bc1fc78f12d4f25e9d21cb83cf3399e98f1c853b17ebb2533fa7380c01f5b0f30ac355d10ba5d9024e09fc38c3c7565143961ead151b21f08469ad0b7b9f072fd66992398007c7c34eda90b5de1504b6479040614272b8ea468912cbb10390be6532fea38bf8a9dc6813a30d1fd5bd6292"
module.exports = {
    addUser: (data, role, cb) => {
        RoleModel.findOne({ role: new RegExp(role, 'i') }, (err, role) => {
            if (err) cb(err, null)
            else {
                data.role = role.id;
                UserModel.create(data, (err, user) => {
                    if (err) cb(err, null)
                    else cb(null, jwt.sign({ id: user.id }, `${SECRET}`, { expiresIn: '30 days' }))
                })
            }
        })
    },
    loginUser: (data, cb) => {
        const { username, password } = data;
        UserModel.findOne({ username }, (err, user) => {
            if (err) cb(err, null)
            else if (user) {
                compare(password, user.password, (err, same) => {
                    if (err) cb(err, null)
                    else if (same) cb(null, jwt.sign({ id: user.id }, `${SECRET}`, { expiresIn: '30 days' }))
                    else cb(new Error("Inavlid password"), null)
                });
            } else cb(new Error("Invalid username"), null)
        });
    },
    isAuthenticated: (req, res, next) => {
        if (req.session && req.session.token) {
            jwt.verify(req.session.token, `${SECRET}`, (err, payload) => {
                err ? res.status(403).send({ success: false, message: err.message }) : UserModel.findById(payload.id).populate({ path: "notes", populate: { path: "images", select: "name" } })
                    .then(user => {
                        if (user) {
                            console.log("user", user)
                            req.user = user;
                            next();
                        } else res.status(404).send({ success: false, message: "User not found" })
                    }).catch(err => res.status(404).send({ success: false, message: err.message }))
            });
        } else res.status(401).send({ success: false, message: "Unauthorized" })
    },
    updateUserById: (id, data, cb) => {
        UserModel.findByIdAndUpdate(id, data, (err, user) => {
            if (err) cb(err, null)
            else cb(null, user);
        })
    }
}
