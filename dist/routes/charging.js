"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.default = (sc, wallet) => {
    // get session
    router.get('/session/:scId/:evseId', async (req, res) => {
        const session = await sc.charging.getSession(req.params.scId, req.params.evseId);
        res.send(session);
    });
    // get all cdrs
    router.get('/cdr', async (req, res) => {
        const cdr = await sc.charging.contract.getLogs('ChargeDetailRecord');
        res.send(cdr);
    });
    router.post('/start/:id', async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStart(req.params.scId, req.params.evseId, sc.token.address, req.params.price);
            res.sendStatus(200);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
    router.post('/stop/:id', async (req, res) => {
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