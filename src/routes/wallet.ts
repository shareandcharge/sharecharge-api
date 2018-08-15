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
     * @api {get} /api/wallet/create create a new wallet
     * @apiName createWallet
     * @apiGroup wallet
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription create a wallet 
     * @apiSampleRequest ../api/wallet/create
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
     * @api {get} /api/wallet/balance/:address gets balance
     * @apiName getBalance
     * @apiGroup wallet
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription gets balance of a wallet 
     * @apiSampleRequest ../api/wallet/balance/:address
     * @apiParam {String} address the address of a wallet
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
     * @api {get} /api/wallet/info gets information about the currently set wallet
     * @apiName getInfo 
     * @apiGroup wallet
     * @apiHeader {String} Authorization Authorization Token value
     * 
     * @apiDescription gets coinbase and transaction count for wallet
     * @apiSampleRequest ../api/wallet/info
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