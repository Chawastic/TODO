var express = require('express');
var jsend = require('jsend');
var router = express.Router();
var db = require("../models");
var crypto = require('crypto');
var UserService = require("../services/UserService")
var userService = new UserService(db);
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var jwt = require('jsonwebtoken');
router.use(jsend.middleware);

// Post for registered users to be able to login
router.post("/login", jsonParser, async (req, res, next) => {
    const { email, password } = req.body;
    userService.getOne(email).then((data) => {
        if (data === null) {
            return res.jsend.fail({ "result": "Incorrect email or password" });
        }
        crypto.pbkdf2(password, data.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return next(err); }
            if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
                return res.jsend.fail({ "result": "Incorrect email or password" });
            }
            try {
                let token = jwt.sign(
                    { id: data.id, email: data.email },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "24h" }
                );
                return res.jsend.success({ "result": "You are logged in", "id": data.id, "email": data.email, "token": token });
            } catch (err) {
                return next(err);
            }
        });
    }).catch(next);
});

// Post for new users to register / signup
router.post("/signup", async (req, res, next) => {
    const { name, email, password } = req.body;
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      userService.create(name, email, hashedPassword, salt)
      res.jsend.success({"result": "You created an account."});
    });
});

router.get('/fail', (req, res) => {
	return res.status(401).jsend.error({ statusCode: 401, message: 'message', data: 'data' });
});

module.exports = router;

