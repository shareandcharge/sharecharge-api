import { Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';

const router = express.Router();

export default (wallet: Wallet)=> {

    router.get('/create', async (req, res) => {
        const wallet = Wallet.generate();
        console.log('Wallet created');
        
        const seed = wallet.seed;
        const pubKey = wallet.wallet.keychain[0].address;

        res.send({seed, pubKey});
    });

    return router;

};