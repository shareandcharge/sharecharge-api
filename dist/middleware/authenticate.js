"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
function default_1(req, res, next) {
    const header = req.header('Authorization');
    if (!header)
        return res.status(401).send('Access denied. No token provided!');
    const parts = header.split(' ');
    const token = (parts.length > 1) ? parts[1] : '';
    try {
        const decoded = jwt.verify(token, config_1.config.jwtPrivateKey);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}
exports.default = default_1;
//# sourceMappingURL=authenticate.js.map