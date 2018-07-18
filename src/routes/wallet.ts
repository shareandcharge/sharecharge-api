import { Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
const Web3 = require('web3');

const router = express.Router();

export default (config, wallet: Wallet)=> {

    const web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.ethProvider));

    router.get('/create', async (req, res) => {
        const wallet = Wallet.generate();
        console.log('Wallet created');
        
        const seed = wallet.seed;
        const address = wallet.wallet.keychain[0].address;

        res.send({seed, address});
    });

    router.get('/balance/:address', async (req, res) => {
        const msp = await web3.fromWei(web3.eth.getBalance(req.params.address));
        const balance = msp.c[0];
        res.send({balance});
    });

    return router;

};