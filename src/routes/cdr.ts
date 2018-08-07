import { ShareCharge, Wallet, ToolKit } from '@motionwerk/sharecharge-lib';
import { Tariffs } from '@motionwerk/sharecharge-common';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/cdrs/info/ gets Charge Detail Records (CDRs)
     * @apiName info
     * @apiGroup cdrs
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription gets Charge Detail Records (CDRs)
     * @apiSampleRequest ../api/cdrs/info
    */
    router.get('/info', authenticate, async (req, res) => {
        const logs = await sc.charging.contract.getLogs('ChargeDetailRecord', req.query);
        const response = logs.map(obj => (
            {
                scId: ToolKit.hexToScId(obj.returnValues.scId),
                evseId: ToolKit.hexToString(obj.returnValues.evseId),
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
