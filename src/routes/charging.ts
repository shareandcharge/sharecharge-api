import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import { TariffEnum as Tariffs } from '@motionwerk/sharecharge-common';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /charging/session/:scId/:evseId session
     * @apiGroup charging
     * @apiHeader {string} Authorization Token value 
     * 
     * @apiDescription Get a charging session at a particular scId and EVSE ID
     * 
     * @apiParam {String} scId A unique Share&Charge location identifier
     * @apiParam {String} evseId An Electric Vehicle Supply Unit identifier
     * 
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
                "id": "27215646981",
                "controller": "0x684e91B424F285043239F5b7c3937caDa2D6f45C",
                "tariffType": "3",
                "chargeUnits": "3600",
                "tokenAddress": "0x682F10b5e35bA3157E644D9e7c7F3C107EB46305",
                "estimatedPrice": "250",
                "startTime": "1534412787" 
     *      }
    */
    router.get('/session/:scId/:evseId', authenticate, async(req, res) => {
        console.log(`GET /charging/session/${req.params.scId}/${req.params.evseId}`);
        const session = await sc.charging.getSession(req.params.scId, req.params.evseId);
        res.send(session);
    });

    /**
     * @api {get} /charging/request/start request start
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Request the start of a charging session
     * 
     * @apiParam {string} tariffType The type of tariff to charge with (one of 'ENERGY', 'FLAT' or 'TIME')
     * @apiParam {number} chargeUnits The number of units to charge for (in watt hours if energy-based tariff or seconds if time/flat-based tariff)
     * @apiParam {number} estimatedPrice The estimated price of the charging session
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *          "connector": "1",
     *          "tariffType": 'ENERGY',
     *          "chargeUnits": 3600,
     *          "estimatedPrice": 1000
     *      }
     * 
    */
    router.post('/request/start', authenticate, async (req, res) => {
        console.log('POST /charging/request/start');
        try {
            const tx = sc.charging.useWallet(wallet).requestStart();
            tx.scId = req.body.scId;
            tx.evse = req.body.evseId;
            tx.connector = req.body.connector;
            tx.tariff = req.body.tariffType;
            tx.chargeUnits = req.body.chargeUnits;
            tx.tokenAddress = sc.token.address; 
            tx.estimatedPrice = req.body.price;
            await tx.send();
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /charging/confirm/start confirm start
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Confirm the start of a charging session
     * 
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *          "sessionId": "12345"
     *      }
     * 
    */
    router.post('/confirm/start', authenticate, async (req, res) => {
        console.log('POST /charging/confirm/start');
        try {
            const tx = sc.charging.useWallet(wallet).confirmStart();
            tx.scId = req.body.scId;
            tx.evse = req.body.evseId;
            tx.sessionId = req.body.sessionId;
            await tx.send();
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /charging/request/stop request stop
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Request the stop of a charging session
     * 
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *      }
     * 
    */
    router.post('/request/stop', authenticate, async (req, res) => {
        console.log('POST /charging/request/stop');
        try {
            const tx = sc.charging.useWallet(wallet).requestStop();
            tx.scId = req.body.scId;
            tx.evse = req.body.evseId;
            await tx.send();
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /charging/confirm/stop confirm stop
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Confirm the stop of a charging session
     * 
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *      }
     * 
    */
    router.post('/confirm/stop', authenticate, async (req, res) => {
        console.log('POST /charging/confirm/stop');
        try {
            const tx = sc.charging.useWallet(wallet).confirmStop();
            tx.scId = req.body.scId;
            tx.evse = req.body.evseId;
            await tx.send();
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /charging/cdr cdr
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Confirm a Charge Detail Record (CDR) on the network
     * 
     * @apiParam {number} chargedUnits The final quantity of energy consumed during the session in watt hours
     * @apiParam {number} price The final price of the charging session
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *          "chargedUnits": 1800,
     *          "price": 500
     *      }
     * 
    */
    router.post('/cdr', authenticate, async(req, res) => {
        console.log('POST /charging/cdr');
        try {
            const tx = sc.charging.useWallet(wallet).chargeDetailRecord();
            tx.scId = req.body.scId;
            tx.evse = req.body.evseId;
            tx.chargedUnits = req.body.chargedUnits;
            tx.finalPrice = req.body.price;
            await tx.send();
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    })

    return router;
}