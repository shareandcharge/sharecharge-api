import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import authenticate from '../middleware/authenticate';
import * as express from 'express';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    sc.on('StationCreated', result => {
        console.log(result);
    });

    sc.on('StationUpdated', result => {
        console.log(result);
    });

    sc.on('EvseCreated', result => {
        console.log(result);
    });

    sc.on('EvseUpdated', result => {
        console.log(result);
    });

    sc.on('StartRequested', result => {
        // if result.evseId is one of ours since this will receive ALL messages
        // simulate delay of starting evse
        // setTimeout(async () => {
        //     const evse = await sc.evses.getById(result.evseId);
        //     sc.charging.useWallet(wallet).confirmStart(evse);
        // }, 500);
        console.log(result);
    });

    sc.on('StopRequested', result => {
        // if result.evseId is one of ours since this will receive ALL messages
        // simulate delay of starting evse
        // setTimeout(async () => {
        //     const evse = await sc.evses.getById(result.evseId);
        //     // use bridge to stop then get cdr
        //     // await bridge.stop(id);
        //     sc.charging.useWallet(wallet).confirmStop(evse);
        // }, 500);
        console.log(result);
    });

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