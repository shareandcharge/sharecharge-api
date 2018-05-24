import { ShareCharge, Wallet, ToolKit } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    router.get('/cdr/info', async (req, res) => {
        const logs = await sc.charging.contract.getLogs('ChargeDetailRecord');
        const response = logs.map(obj => (
            {
                date: new Date(obj.timestamp * 1000).toUTCString(),
                evseId: obj.returnValues.evseId,
                scId: obj.returnValues.scId,
                controller: obj.returnValues.controller,
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
