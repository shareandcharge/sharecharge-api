import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/token/info get token info
     * @apiName info
     * @apiGroup token
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription get token info 
     * @apiSampleRequest ../api/token/info
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "name": "Share&Charge Token",
     *          "symbol": "SCT",
     *          "address": "0x407d3449819A6e47ce43687d58B3C00dCed77bc8",
     *          "owner": "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e"
     *      }
    */
    router.get('/info', authenticate, async (req, res) => {
        let response = {
            name: await sc.token.getName(),
            symbol: await sc.token.getSymbol(),
            address: sc.token.address,
            owner: await sc.token.getOwner()
        };
        res.send(response);
    });

    router.get('/balance/:address', authenticate, async (req, res) => {
        const balance = await sc.token.getBalance(req.params.address);
        res.send(String(balance));
    });

    router.post('/deploy', authenticate, async (req, res) => {
        try {
            const address = await sc.token.useWallet(wallet).deploy(String(req.body.name), String(req.body.symbol));
            await sc.token.useWallet(wallet).setAccess(sc.charging.address);
            res.send(address);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    router.post('/mint', authenticate, async (req, res) => {
        const owner = await sc.token.getOwner();
        const driver = await wallet.keychain[0].address;

        if (driver.toLowerCase() !== owner.toLowerCase()) {
            res.send("You do not have the permission to mint tokens for this contract");
        } else {
            try {
                await sc.token.useWallet(wallet).mint(String(req.body.driver), Number(req.body.amount));
                res.send('OK');
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
    });

    /**
     * @api {post} /api/token/burn/:value burn value of tokens from wallet
     * @apiName burn
     * @apiGroup token
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription burn tokens from wallet 
     * @apiSampleRequest ../api/token/burn
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
    */
    router.post('/burn/:value', authenticate, async (req, res) => {
        try {
            await sc.token.useWallet(wallet).burn(req.params.value);
            res.send('OK');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {post} /api/token/transfer/:recipient/:value transfer value of tokens to recipient
     * @apiName transfer
     * @apiGroup token
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription transfer tokens to recipient address 
     * @apiSampleRequest ../api/token/transfer
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
    */
   router.post('/transfer/:recipient/:value', authenticate, async (req, res) => {
        try {
            await sc.token.useWallet(wallet).transfer(req.params.recipient, req.params.value);
            res.send('OK');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    return router;
}

