"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middleware/authenticate");
const express = require("express");
const router = express.Router();
exports.default = (sc, wallet) => {
    router.post('/start/:id', authenticate_1.default, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStart(req.params.scId, req.params.evseId, sc.token.address, req.params.price);
            res.sendStatus(200);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
    router.post('/stop/:id', authenticate_1.default, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStop(req.params.scId, req.params.evseId);
            res.sendStatus(200);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
    return router;
};
//# sourceMappingURL=charging.js.map