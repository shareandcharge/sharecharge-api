import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/charging/session session
     * @apiGroup charging
     * @apiHeader {string} Authorization Token value 
     * 
     * @apiDescription Get a charging session at a particular scId and EVSE ID
     * 
     * @apiParam {String} scId A unique Share&Charge location identifier
     * @apiParam {String} evseId An Electric Vehicle Supply Unit identifier
     * 
     * @apiSampleRequest http://localhost:3000/api/charging/session/:scId/:evseId
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
                "id": "27215646981",
                "controller": "0x684e91B424F285043239F5b7c3937caDa2D6f45C",
                "tariffId": "3",
                "tariffValue": "3600",
                "token": "0x682F10b5e35bA3157E644D9e7c7F3C107EB46305",
                "price": "250",
                "startTime": "1534412787" 
     *      }
    */
    router.get('/session/:scId/:evseId', authenticate, async(req, res) => {
        const session = await sc.charging.getSession(req.params.scId, req.params.evseId);
        res.send(session);
    });

    /**
     * @api {get} /api/charging/request/start request start
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Request the start of a charging session
     * 
     * @apiParam {number} tariffId The OCPI enum identifier for the type of tariff used to charge (0 = energy; 1 = flat; 3 = time)
     * @apiParam {number} tariffValue The number of units to charge for (in watt hours if energy-based tariff or seconds if time/flat-based tariff)
     * @apiParam {number} price The estimated price of the charging session
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *          "tariffId": 1,
     *          "tariffValue": 3600,
     *          "price": 1000
     *      }
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
     * @api {get} /api/charging/confirm/start confirm start
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Confirm the start of a charging session
     * 
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *      }
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
     * @api {get} /api/charging/request/stop request stop
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
        try {
            await sc.charging.useWallet(wallet).requestStop(String(req.body.scId), String(req.body.evseId));
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /api/charging/confirm/stop confirm stop
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
        try {
            await sc.charging.useWallet(wallet).confirmStop(String(req.body.scId), String(req.body.evseId));
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /api/charging/cdr cdr
     * @apiGroup charging
     * @apiHeader {String} Authorization Token value 
     * @apiDescription Confirm a Charge Detail Record (CDR) on the network
     * 
     * @apiParam {number} tariffValue The final units charged during the session (in watt hours if energy-based tariff or seconds if time/flat-based tariff)
     * @apiParam {number} price The final price of the charging session
     * @apiParamExample {json} Example-Request
     *      {
     *          "scId": "0x35312e3433323938342c372e303033393038",
     *          "evseId": "BE-5084-4",
     *          "tariffvalue": 1800,
     *          "price": 500
     *      }
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