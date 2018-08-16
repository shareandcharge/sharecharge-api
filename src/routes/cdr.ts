import { ShareCharge, Wallet, ToolKit } from '@motionwerk/sharecharge-lib';
import { Tariffs } from '@motionwerk/sharecharge-common';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/cdr/info/ info
     * @apiDescription get and (optionally) filter Charge Detail Records (CDRs)
     * @apiGroup cdr
     * @apiHeader {string} Authorization Token value displayed on server start  
     * @apiParamExample {json} Request-Example:
     *      {
     *          "controller": "0x50f43EE60da70E438ba1Ca74cC1C7d8fD9DDEE9a"
     *      }
     * 
     * @apiSampleRequest http://localhost:3000/api/cdr/info
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      [{
     *         "scId": "0x35312e3433323936362c372e303033393436",
     *         "evseId": "BB-5983-3",
     *         "sessionId": "808296243576",
     *         "controller": "0x50f43EE60da70E438ba1Ca74cC1C7d8fD9DDEE9a",
     *         "start": "Wed, 01 Aug 2018 13:19:57 GMT",
     *         "end": "Wed, 01 Aug 2018 13:20:22 GMT",
     *         "finalPrice": "110",
     *         "tariff": "flat",
     *         "chargedUnits": "0",
     *         "tokenContract": "0xbA07888d72C26ab0744f651824D9Dc774fb0445F",
     *         "chargingContract": "0xde969C804Eb613653C35E6E39f39b5de78630c1a",
     *         "transactionHash": "0x677d17daf85010e4c7107f081f80eb4b0ba49abc3b9978a8cdb60a3d30a74a45" 
     *      }]
    */
    router.get('/info', authenticate, async (req, res) => {
        const logs = await sc.charging.contract.getLogs('ChargeDetailRecord', req.query);
        const response = logs.map(obj => (
            {
                scId: obj.returnValues.scId,
                evseId: obj.returnValues.evseId,
                sessionId: obj.returnValues.sessionId,
                controller: obj.returnValues.controller,
                start: new Date(obj.returnValues.startTime * 1000).toUTCString(),
                end: new Date(obj.returnValues.endTime * 1000).toUTCString(),
                finalPrice: obj.returnValues.finalPrice,
                tariff:Tariffs[obj.returnValues.tariffId],
                chargedUnits: obj.returnValues.finalTariffValue,
                tokenContract: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }

        ));
        res.send(response);
    });

    return router;
}
