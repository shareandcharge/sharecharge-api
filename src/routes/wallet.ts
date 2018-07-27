import {Wallet, ShareCharge } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';
import { IConfig } from '@motionwerk/sharecharge-common/dist/common';

const Web3 = require('web3');

const router = express.Router();

export default (config: IConfig, sc: ShareCharge, wallet: Wallet) => {

    const web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.ethProvider));

    /**
     * @api {get} /api/wallet/create create a wallet
     * @apiName createWallet
     * @apiGroup wallet
     * 
     * @apiDescription create a wallet 
     * @apiSampleRequest ../api/wallet/create
    */
    router.get('/create', authenticate, async (req, res) => {
        const wallet = Wallet.generate();
        console.log('Wallet created');
        
        const seed = wallet.seed;
        const address = wallet.wallet.keychain[0].address;

        res.send({seed, address});
    });


    /**
     * @api {get} /api/wallet/balance/:address gets balance
     * @apiName getBalance
     * @apiGroup wallet
     * 
     * @apiDescription gets balance of a wallet 
     * @apiSampleRequest ../api/wallet/balance/:address
     * @apiParam {String} :address the address of a wallet
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
            "balance": "42"
            }
    */
    router.get('/balance/:address', authenticate, async (req, res) => {
        const balance = await web3.eth.getBalance(req.params.address);
        res.send({balance});
    });

    router.get('/history/:address', authenticate, async (req, res) => {
        let chargingEvents = await sc.charging.contract.getLogs('allEvents');
        chargingEvents = chargingEvents.filter(event => {
            return event.returnValues.controller.toLowerCase() === req.params.address.toLowerCase()
        });
        let tokenEvents: any[] = [];
        const tokenOwner = await sc.token.getOwner();
        if (tokenOwner.toLowerCase() === req.params.address.toLowerCase()) {
            tokenEvents = await sc.token.contract.getLogs('Mint');
        } 
        const events = chargingEvents.concat(tokenEvents).sort((a, b) => b.timestamp - a.timestamp);
        res.send(events);
    });

    return router;

};