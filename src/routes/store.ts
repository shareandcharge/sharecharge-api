import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /api/store/locations/:cpo get all locations by CPO
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get all locations owned by a CPO
     * 
     * @apiParam {string} cpo The address of the CPO to query for location details
     * @apiSampleRequest http://localhost:3000/api/store/locations/:cpo
    */    
    router.get('/locations/:cpo', authenticate, async (req, res) => {
        const locations = await sc.store.getLocationsByCPO(req.params.cpo);
        res.send(locations);
    });

    /**
     * @api {get} /api/store/locations/:cpo/:scId get location by scId
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get single location owned by a CPO
     * 
     * @apiParam {string} scId The unique identifier of the location to query
     * @apiSampleRequest http://localhost:3000/api/store/locations/:cpo/:scId     
    */  
    router.get('/locations/:cpo/:scId', authenticate, async (req, res) => {
        try {
            const location = await sc.store.getLocationById(req.params.cpo, req.params.scId);
            res.send(location);
        } catch (err) {
            res.status(400).send('Unable to find location with that ID');
        }
    });

    /**
     * @api {get} /api/store/locations/all-ids get location ids
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Get all location ids connected to the currently used wallet
     * 
     * @apiSampleRequest http://localhost:3000/api/store/locations/all-ids     
    */  
    router.get('/locations/all-ids', authenticate, async (req, res) => {
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
     * @api {get} /api/store/tariffs/:cpo get tariffs by CPO
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get all tariffs owned by a CPO
     * 
     * @apiParam {string} cpo The address of the CPO to query tariffs from
     * @apiSampleRequest http://localhost:3000/api/store/tariffs/:cpo     
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

    /**
     * @api {get} /api/store/locations/owner/:scId get owner of scId
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get the address of the owner of a location by its Share&Charge ID
     * 
     * @apiParam scId The unique location identifier of the location on the Share&Charge network
     * @apiSampleRequest http://localhost:3000/api/store/locations/owner/:scId          
    */ 
    router.get('/locations/owner/:scId', authenticate, async (req, res) => {
        const owner = await sc.store.getOwnerOfLocation(req.params.scId);
        res.send(owner);
    });

    /**
     * @api {post} /api/store/location add single location
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Add a new location to the network
     * 
     * @apiParam {json} body [OCPI location object](https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description)
     * @apiParamExample {json} Request-Example
     *      { <locationObject> }
     *
    */ 
    router.post('/location', authenticate, async (req, res) => {
        try {
            const loc = req.body;
            // check req.body is valid (a little bit)
            if (!loc.id || !loc.evses || !loc.coordinates) {
                res.status(400).send('Location object not valid. Ensure location follows the OCPI model');
            }
            const result = await sc.store.useWallet(wallet).addLocation(loc);
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    /**
     * @api {post} /api/store/locations add multiple locations
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * 
     * @apiDescription Add multiple new locations to the network
     * 
     * @apiParam {json} body Array of [OCPI location objects](https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description)
     * @apiParamExample {json} Request-Example:
     * [
     *  { <locationObject> },
     *  { <locationObject> }
     * ]
    */ 
    router.post('/locations', authenticate, async (req, res) => {
        let locations = req.body;
        const results = {};
        for (const loc of locations) {
            try {
                if (!loc.id || !loc.evses || !loc.coordinates) {
                    throw Error('Location object not valid. Ensure location follows the OCPI model');
                }
                const result = await sc.store.useWallet(wallet).addLocation(loc);
                results[loc.id] = result;
            } catch (err) {
                results[loc.id] = {
                    error: err.message
                }
            }
        }
        res.send(results);
    });


    /**
     * @api {put} /api/store/location/:id update single location
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Update a location with a particular scId
     * 
     * @apiParam {json} body [OCPI location object](https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description)
     * @apiParamExample {json} Request-Example:
     *      { <locationObject> }
     *
    */ 
    router.put('/location/:id', authenticate, async (req, res) => {
        try {
            const loc = req.body;
            if (!loc.id || !loc.evses || !loc.coordinates) {
                res.status(400).send('Location object not valid. Ensure location follows the OCPI model');
            } else {
                const result = await sc.store.useWallet(wallet).updateLocation(req.params.id, loc);
                res.send(result);
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // // update locations
    // router.put('/locations', authenticate, async (req, res) => {
    //     let locations = req.body;
    //     const evLocations = await sc.store.getLocationsByCPO(wallet.keychain[0].address);

    //     for (const location of locations) {
    //         try {
    //             const evLocation = await evLocations.find(loc => {
    //                 return loc.data ? loc.data.id === location.data.id : false;
    //             });

    //             if (evLocation) {
    //                 const result = await sc.store.useWallet(wallet).updateLocation(evLocation.scId, location.data);
    //                 res.send(`Updated location:\n ${result.scId}`);
    //             }
    //         } catch (err) {
    //             res.status(500).send(err.message);
    //         }
    //     }
    // });


    /**
     * @api {delete} /api/store/location/:scId delete single location
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Delete a location by its scId
     *
     * @apiParam {string} scId The unique identifier of the location on the Share&Charge network 
    */ 
    router.delete('/location/:scId', authenticate, async(req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).removeLocation(req.params.scId);
            res.send(`Location with ${result.scId} is removed`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {post} /api/store/tariffs add tariffs
     * @apiName /tariffs
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Add tariffs to the network
     * 
     * @apiParam {json} body Array of [OCPI tariff objects](https://github.com/ocpi/ocpi/blob/master/mod_tariffs.md#3-object-description)
     * @apiParamExample {json} Example-Request:
     *      [
     *          { <tariffObject> },
     *          { <tariffObject> }
     *      ]
    */ 
    router.post('/tariffs', authenticate, async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).addTariffs(req.body);
            res.send(`Added tariffs data\nipfs: ${result}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {put} /api/store/tariffs update tariffs
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * 
     * @apiParam {json} body [OCPI tariff object](https://github.com/ocpi/ocpi/blob/master/mod_tariffs.md#3-object-description)
     * @apiParamExample {json} Example-Request:
     *      [
     *          { <tariffObject> },
     *          { <tariffObject> }
     *      ]
    */ 
    router.put('/tariffs', authenticate, async (req, res) => {
        try {
            const result = await sc.store.useWallet(wallet).updateTariffs(req.body);
            res.send(`Updated tariffs data\nipfs: ${result}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    
    /**
     * @api {delete} /api/store/tariffs delete tariffs
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
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