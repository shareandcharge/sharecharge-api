import { config } from '../config';

export default function (req, res, next) {
    if (config.apiKey) {
        const header = req.header('Authorization');
        if (!header) {
            return res.status(401).send('Access denied. No token provided!');
        }
        const token = header.split(' ')[1];
        token === config.apiKey ? next() : res.status(400).send('Invalid token.');
    } else {
        next();
    }
}
