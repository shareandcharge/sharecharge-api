import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import { TariffEnum as Tariffs } from '@motionwerk/sharecharge-common';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /cdr/info/ info
     * @apiDescription get and (optionally) filter Charge Detail Records (CDRs)
     * @apiGroup cdr
     * @apiHeader {string} Authorization Token value displayed on server start  
     * @apiParamExample {json} Request-Example:
     *      {
     *          "controller": "0x2f7D42e9f5112A2999c968A45C26aec13C5acb06"
     *      }
     * 
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      [{
                "scId": "0x2d33312e3933373331382c3131352e373535373939",
                "evseId": "BB-5983-3",
                "sessionId": "02482808578",
                "controller": "0x2f7D42e9f5112A2999c968A45C26aec13C5acb06",
                "start": "Mon, 15 Oct 2018 14:08:01 GMT",
                "end": "Mon, 15 Oct 2018 14:13:11 GMT",
                "finalPrice": "255",
                "tariff": "ENERGY",
                "chargedUnits": "7200",
                "tokenContract": "0x928c1DE0429822e2F543Df7E195790bD2fCD42dd",
                "chargingContract": "0x675E8e701AC2F249eC17F104dC287Fffc39BE26b",
                "transactionHash": "0x89ccec2e215b440308f883a29badc7f6d85218d99f2909c33c24e7e8f032f70c"
            }]
    */
    router.get('/info', authenticate, async (req, res) => {
        console.log('GET /cdr/info');
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
                tariff: Tariffs[obj.returnValues.tariffType],
                chargedUnits: obj.returnValues.chargedUnits,
                tokenContract: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }

        ));
        res.send(response);
    });

    return router;
}
