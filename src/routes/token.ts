import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /token/info get token info
     * @apiGroup token
     * @apiHeader {string} Authorization Token value  
     * 
     * @apiDescription get information about the currently used eMobility Service Provider token
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
        console.log('GET /token/info');
        let response = {
            name: await sc.token.getName(),
            symbol: await sc.token.getSymbol(),
            address: sc.token.address,
            owner: await sc.token.getOwner()
        };
        res.send(response);
    });

    /**
     * @api {get} /token/balance/:address get token balance
     * @apiGroup token
     * @apiHeader {String} Authorization Token value  
     * @apiDescription get token balance of a particular address
     * 
     * @apiParam {string} address Address of the wallet to query
     */
    router.get('/balance/:address', authenticate, async (req, res) => {
        console.log(`GET /token/balance/${req.params.address}`);
        const balance = await sc.token.getBalance(req.params.address);
        res.send(String(balance));
    });

    /**
     * @api {post} /api/token/deploy deploy
     * @apiGroup token
     * @apiHeader {String} Authorization Token value  
     * @apiDescription deploy a new eMobility Service Provider token on the network 
     * 
     * @apiParam {string} name The name of the new eMobility Service Provider token
     * @apiParam {string} symbol The symbol of the new token
     * @apiParamExample {json} Request-Example:
     *      {
     *          "name": "My New MSP Token",
     *          "symbol": "MSPT"
     *      }   
     * 
     */
    router.post('/deploy', authenticate, async (req, res) => {
        console.log('POST /token/deploy');
        try {
            const address = await sc.token.useWallet(wallet).deploy(String(req.body.name), String(req.body.symbol));
            await sc.token.useWallet(wallet).setAccess(sc.charging.address);
            res.send(address);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {post} /token/mint mint
     * @apiGroup token
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Mint tokens for a driver (NOTE: you must be the owner of the MSP token to mint) 
     * 
     * @apiParam {string} driver The address of the driver to mint tokens for
     * @apiParam {number} amount The value of tokens to mint for the driver
     * @apiParamExample {json} Request-Example:
     *      {
     *          "driver": "0x1234567...",
     *          "amount": 1000
     *      }
    */
    router.post('/mint', authenticate, async (req, res) => {
        console.log('POST /token/mint');
        const owner = await sc.token.getOwner();
        const walletAddress = await wallet.keychain[0].address;

        if (walletAddress.toLowerCase() !== owner.toLowerCase()) {
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
     * @api {post} /token/burn/:value burn
     * @apiGroup token
     * @apiHeader {String} Authorization Token value  
     * @apiDescription burn tokens from currently used wallet 
     * 
     * @apiParam {string} value The amount of tokens to burn
     * @apiParamExample {json} Request-Example:
     *      {
     *          "value": 1000
     *      }
    */
    router.post('/burn/:value', authenticate, async (req, res) => {
        console.log(`POST /token/burn/${req.params.value}`);
        try {
            await sc.token.useWallet(wallet).burn(req.params.value);
            res.send('OK');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {post} /token/transfer/:recipient/:value transfer
     * @apiGroup token
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Transfer tokens to recipient address 
     * 
     * @apiParam {string} recipient The address of the wallet to send tokens to
     * @apiParam {string} value The amount of tokens to send
    */
   router.post('/transfer/:recipient/:value', authenticate, async (req, res) => {
       console.log(`POST /token/transfer/${req.params.recipient}/${req.params.value}`);
        try {
            await sc.token.useWallet(wallet).transfer(req.params.recipient, req.params.value);
            res.send('OK');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    return router;
}

