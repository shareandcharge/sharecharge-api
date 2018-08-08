import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/store/locations/:cpo get all locations by CPO
     * @apiName locations/:cpo
     * @apiGroup store
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription get all locations by CPO
    */    
    router.get('/locations/:cpo', authenticate, async (req, res) => {
        const locations = await sc.store.getLocationsByCPO(req.params.cpo);
        res.send(locations);
    });

    // get location by id
    router.get('/locations/:cpo/:id', authenticate, async (req, res) => {
        const location = await sc.store.getLocationById(req.params.cpo, req.params.id);
        res.send(location);
    });

    // get location ids
    router.get('/all-ids', authenticate, async (req, res) => {
        const allIds: any = [];
        const cpo = wallet.keychain[0].address;
        const ids = await sc.store.getLocationsByCPO(cpo);

        try {
            for (const id of ids) {
                allIds.push(id.scId);
            }
            res.send(`All location ids: \n ${allIds}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    /**
     * @api {get} /api/store/tariffs/:cpo get all tariffs by CPO
     * @apiName tariffs/:cpo
     * @apiGroup store
     * @apiHeader {String} Authorization Authorization Token value  
     * @apiParam {String} cpo The CPO ID of which the tariffs belong to
     * 
     * @apiDescription get all tariffs by CPO
    */ 
    router.get('/tariffs/:cpo', authenticate, async (req, res) => {
        try {
            if (req.query.raw === "true") {
                const tariffs = await sc.store.getAllTariffsByCPO(req.params.cpo, false);
                res.send(tariffs);
            } else {
                const tariffs = await sc.store.getAllTariffsByCPO(req.params.cpo);
                res.send(tariffs);
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // get owner of the location
    router.get('/owner/:scId', authenticate, async (req, res) => {
        const owner = await sc.store.getOwnerOfLocation(req.params.scId);
        res.send(owner);
    });


    // add location
    router.post('/locations', authenticate, async (req, res) => {
        let locations = req.body;

        for (const location of locations) {
            try {
                const result = await sc.store.useWallet(wallet).addLocation(location);
                res.send(`Added locations:\n ${result.scId}`);
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
    });

    // remove location
    router.delete('/locations/:id', authenticate, async(req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).removeLocation(req.params.id);
            res.send(`Location with ${result.scId} is removed`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // update location
    router.put('/locations', authenticate, async (req, res) => {
        let locations = req.body;
        const evLocations = await sc.store.getLocationsByCPO(wallet.keychain[0].address);

        for (const location of locations) {
            try {
                const evLocation = await evLocations.find(loc => {
                    return loc.data ? loc.data.id === location.data.id : false;
                });

                if (evLocation) {
                    const result = await sc.store.useWallet(wallet).updateLocation(evLocation.scId, location.data);
                    res.send(`Updated location:\n ${result.scId}`);
                }
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
    });

    // add tariffs
    router.post('/tariffs', authenticate, async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).addTariffs(req.body);
            res.send(`Added tariffs data\nipfs: ${result}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // update tariffs
    router.put('/tariffs', authenticate, async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).updateTariffs(req.body);
            res.send(`Updated tariffs data\nipfs: ${result}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    
    /**
     * @api {delete} /api/store/tariffs delete all tariffs of CPO
     * @apiName tariffs
     * @apiGroup store
     * @apiHeader {String} Authorization Authorization Token value  
     * 
     * @apiDescription delete all tariffs of CPO
    */ 
    router.delete('/tariffs', authenticate, async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).removeTariffs();
            res.send('Removed tariffs');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    return router;
};