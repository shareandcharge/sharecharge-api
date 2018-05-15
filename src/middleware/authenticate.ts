import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export default function (req, res, next) {
    const header = req.header('Authorization');
    if (!header) return res.status(401).send('Access denied. No token provided!');

    const parts = header.split(' ');
    const token = (parts.length > 1) ? parts[1] : '';

    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}
