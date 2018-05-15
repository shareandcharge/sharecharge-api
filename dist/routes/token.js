"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authenticate_1 = require("../middleware/authenticate");
const router = express.Router();
exports.default = (sc, wallet) => {
    router.get('/token/info', authenticate_1.default, async (req, res) => {
        let response = {
            name: await sc.token.getName(),
            symbol: await sc.token.getSymbol(),
            address: sc.token.address,
            owner: await sc.token.getOwner()
        };
        res.send(response);
    });
    router.get('/token/balance/:address', authenticate_1.default, async (req, res) => {
        const balance = await sc.token.getBalance(req.params.address);
        res.send(balance);
    });
    router.post('/token/deploy', authenticate_1.default, async (req, res) => {
        try {
            const address = await sc.token.useWallet(wallet).deploy(req.params.name, req.params.symbol);
            await sc.token.useWallet(wallet).setAccess(sc.charging.address);
            res.send(address);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
    router.post('/token/mint', authenticate_1.default, async (req, res) => {
        try {
            await sc.token.useWallet(wallet).mint(req.params.driver, req.params.amount);
            res.send('OK');
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
    return router;
};
//# sourceMappingURL=token.js.map