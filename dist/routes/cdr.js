"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.default = (sc, wallet) => {
    router.get('/info', async (req, res) => {
        const logs = await sc.charging.contract.getLogs('ChargeDetailRecord', req.query);
        const response = logs.map(obj => ({
            date: new Date(obj.timestamp * 1000).toUTCString(),
            evseId: obj.returnValues.evseId,
            scId: obj.returnValues.scId,
            controller: obj.returnValues.controller,
            finalPrice: obj.returnValues.finalPrice,
            tokenContract: obj.returnValues.tokenAddress,
            chargingContract: obj.address,
            transactionHash: obj.transactionHash,
        }));
        res.send(response);
    });
    return router;
};
//# sourceMappingURL=cdr.js.map