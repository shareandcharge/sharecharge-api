import { Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const Web3 = require('web3');

const router = express.Router();

export default (config, wallet: Wallet)=> {

    const web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.ethProvider));

    router.get('/create', authenticate, async (req, res) => {
        const wallet = Wallet.generate();
        console.log('Wallet created');
        
        const seed = wallet.seed;
        const address = wallet.wallet.keychain[0].address;

        res.send({seed, address});
    });

    router.get('/balance/:address', authenticate, async (req, res) => {
        const balance = await web3.eth.getBalance(req.params.address);
        res.send({balance});
    });

    return router;

};