import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/charging/session /session
     * @apiName /session
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * 
     * @apiDescription get a charging session at a particular scId and EVSE ID
     * 
     * @apiParam {String} scId A unique Share&Charge location identifier
     * @apiParam {String} evseId An Electric Vehicle Supply Unit identifier
    */
    router.get('/session/:scId/:evseId', authenticate, async(req, res) => {
        const session = await sc.charging.getSession(req.params.scId, req.params.evseId);
        res.send(session);
    });

    /**
     * @api {get} /api/charging/request/start /request/start
     * @apiName /request/start
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * 
     * @apiDescription Request the start of a charging session
     * 
    */
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

    /**
     * @api {get} /api/charging/confirm/start /confirm/start
     * @apiName /confirm/start
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * 
     * @apiDescription Confirm the start of a charging session
     * 
    */
    router.post('/confirm/start', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).confirmStart(String(req.body.scId), String(req.body.evseId), "0x01");
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /api/charging/request/stop /request/stop
     * @apiName /request/stop
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * 
     * @apiDescription Request the stop of a charging session
     * 
    */
    router.post('/request/stop', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).requestStop(String(req.body.scId), String(req.body.evseId));
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /api/charging/confirm/stop /confirm/stop
     * @apiName /confirm/stop
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * 
     * @apiDescription Confirm the stop of a charging session
     * 
    */
    router.post('/confirm/stop', authenticate, async (req, res) => {
        try {
            await sc.charging.useWallet(wallet).confirmStop(String(req.body.scId), String(req.body.evseId));
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /api/charging/cdr /cdr
     * @apiName /cdr
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * 
     * @apiDescription Confirm a Charge Detail Record (CDR) on the network
     * 
    */
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