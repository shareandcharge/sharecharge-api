import { ShareCharge, Wallet, ToolKit } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    router.get('/info', async (req, res) => {
        const logs = await sc.charging.contract.getLogs('ChargeDetailRecord', req.query);
        const response = logs.map(obj => (
            {
                evseId: obj.returnValues.evseId,
                scId: obj.returnValues.scId,
                controller: obj.returnValues.controller,
                start: new Date(obj.startTime * 1000).toUTCString(),
                end: new Date(obj.endTime * 1000).toUTCString(),
                finalPrice: obj.returnValues.finalPrice,
                tokenContract: obj.returnValues.tokenAddress,
                chargingContract: obj.address,
                transactionHash: obj.transactionHash,
            }

        ));
        res.send(response);
    });

    return router;
}
