"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const config_1 = require("../config");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const users = [
    {
        email: 'stipa@motionwerk.com',
        password: bcrypt.hashSync('test1234', 10),
        isAdmin: true
    }
];
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const user = users.find(x => x.email === req.body.email);
    if (!user)
        return res.status(400).send('Invalid email or password!');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Invalid email or password!');
    const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, config_1.config.jwtPrivateKey);
    res.send(token);
});
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req, schema);
}
exports.default = router;
//# sourceMappingURL=auth.js.map