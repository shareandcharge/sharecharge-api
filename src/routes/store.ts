import { ShareCharge, Wallet, ToolKit } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {
    
    // get locations by CPO id
    router.get('/locations/:cpo', async (req, res) => {
        const locations = await sc.store.getLocationsByCPO(req.params.cpo);
        res.send(locations);
    });
    
    // get location by id
    router.get('/locations/:cpo/:id', async (req, res) => {
        const location = await sc.store.getLocationById(req.params.cpo, req.params.id);
        res.send(location);
    });
    
    // get tariffs by CPO id
    router.get('/tariffs/:cpo', async (req, res) => {
        const tariffs = await sc.store.getAllTariffsByCPO(req.params.cpo);
        res.send(tariffs);
    });
    
    // get owner of the location
    router.get('/owner/:scId', async (req, res) => {
        const owner = await sc.store.getOwnerOfLocation(req.params.scId);
        res.send(owner);
    });
    
    // add location
    router.post('/locations', async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).addLocation(req.params);
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    
    // update location
    router.put('/locations', async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).updateLocation(req.params.scId, req.params.location);
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // add tariffs
    router.post('/tariffs', async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).addTariffs(req.params);
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // update tariffs
    router.put('/tariffs', async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).updateTariffs(req.params);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    

    return router;
};