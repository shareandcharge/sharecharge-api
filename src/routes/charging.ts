import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import authenticate from '../middleware/authenticate';
import * as express from 'express';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    router.post('/start/:id', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStart(req.params.scId, req.params.evseId, sc.token.address, req.params.price);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    router.post('/stop/:id', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStop(req.params.scId, req.params.evseId);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    return router;
}