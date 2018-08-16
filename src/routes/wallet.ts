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
     * @api {get} /api/wallet/create create
     * @apiGroup wallet
     * @apiHeader {string} Authorization Token value  
     * 
     * @apiDescription generate a new wallet 
     * @apiSampleRequest http://localhost:3000/api/wallet/create
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "seed": "art bonus expect glance column select toddler spoon replace garlic exclude true",
     *          "address": "0x06dc7133158725a109b091c3438be224544299f4"
     *      }
    */
    router.get('/create', authenticate, async (req, res) => {
        const wallet = Wallet.generate();
        console.log('Wallet created');
        
        const seed = wallet.seed;
        const address = wallet.wallet.keychain[0].address;

        res.send({seed, address});
    });


    /**
     * @api {get} /api/wallet/balance/:address get balance
     * @apiGroup wallet
     * @apiHeader {String} Authorization Token value  
     * 
     * @apiDescription Gets EV Coin balance of a wallet 
     * @apiParam {String} address The address of the wallet to query
     * @apiSampleRequest http://localhost:3000/api/wallet/balance/:address
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "balance": "42"
     *      }
    */
    router.get('/balance/:address', authenticate, async (req, res) => {
        const balance = await web3.eth.getBalance(req.params.address);
        res.send({balance});
    });

    /**
     * @api {get} /api/wallet/info get info
     * @apiGroup wallet
     * @apiHeader {String} Authorization Token value
     * 
     * @apiDescription gets coinbase and transaction count for wallet
     * @apiSampleRequest http://localhost:3000/api/wallet/info
     * 
     * @apiSuccess {String} coinbase The (primary) public address of the wallet
     * @apiSuccess {String} txCount The nonce of the coinbase
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "coinbase": "0x123..",
     *          "txCount": 1
     *      }
     */
    router.get('/info', authenticate, async (req, res) => {
        res.send({
            coinbase: wallet.coinbase,
            txCount: await web3.eth.getTransactionCount(wallet.coinbase)
        });
    });

    return router;

};