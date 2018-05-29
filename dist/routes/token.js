"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.default = (sc, wallet) => {
    router.get('/info', async (req, res) => {
        let response = {
            name: await sc.token.getName(),
            symbol: await sc.token.getSymbol(),
            address: sc.token.address,
            owner: await sc.token.getOwner()
        };
        res.send(response);
    });
    router.get('/balance/:address', async (req, res) => {
        const balance = await sc.token.getBalance(req.params.address);
        res.send(String(balance));
    });
    router.post('/deploy', async (req, res) => {
        try {
            const address = await sc.token.useWallet(wallet).deploy(String(req.body.name), String(req.body.symbol));
            await sc.token.useWallet(wallet).setAccess(sc.charging.address);
            res.send(address);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
    router.post('/mint', async (req, res) => {
        const owner = await sc.token.getOwner();
        const driver = await wallet.keychain[0].address;
        if (driver.toLowerCase() !== owner.toLowerCase()) {
            res.send("You do not have the permission to mint tokens for this contract");
        }
        else {
            try {
                await sc.token.useWallet(wallet).mint(String(req.body.driver), Number(req.body.amount));
                res.send('OK');
            }
            catch (err) {
                res.status(500).send(err.message);
            }
        }
    });
    return router;
};
//# sourceMappingURL=token.js.map