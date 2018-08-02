import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/charging/session get a session
     * @apiName session
     * @apiGroup charging
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription get a session
    */
    router.get('/session/:scId/:evseId', authenticate, async(req, res) => {
        const session = await sc.charging.getSession(req.params.scId, req.params.evseId);
        res.send(session);
    });

    // request start
    router.post('/request/start', authenticate, async (req, res) => {
        console.log(req.body);
        try {
            await sc.charging.useWallet(wallet).requestStart(
                String(req.body.scId), 
                String(req.body.evseId), 
                Number(req.body.tariffId),
                Number(req.body.tariffValue),
                sc.token.address, 
                Number(req.body.price)
            );
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // confirm start
    router.post('/confirm/start', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).confirmStart(String(req.body.scId), String(req.body.evseId), "0x01");
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // request stop
    router.post('/request/stop', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStop(String(req.body.scId), String(req.body.evseId));
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // confirm stop
    router.post('/confirm/stop', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).confirmStop(String(req.body.scId), String(req.body.evseId));
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // issue cdr
    router.post('/cdr', authenticate, async(req, res) => {
        try {
            await sc.charging.useWallet(wallet).chargeDetailRecord(
                String(req.body.scId), 
                String(req.body.evseId), 
                Number(req.body.tariffValue),
                Number(req.body.price)
            );
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    })

    return router;
}