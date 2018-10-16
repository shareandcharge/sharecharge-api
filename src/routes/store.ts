import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import * as express from 'express';
import authenticate from '../middleware/authenticate';

const router = express.Router();

export default (sc: ShareCharge, wallet: Wallet) => {

    /**
     * @api {get} /store/locations/:cpo get all locations by CPO
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get all locations owned by a CPO
     * 
     * @apiParam {string} cpo The address of the CPO to query for location details
    */    
    router.get('/locations/:cpo', authenticate, async (req, res) => {
        console.log(`GET /store/locations/${req.params.cpo}`);
        const locations = await sc.store.getLocationsByCPO(req.params.cpo);
        res.send(locations);
    });

    /**
     * @api {get} /store/locations/:cpo/:scId get location by scId
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get single location owned by a CPO
     * 
     * @apiParam {string} scId The unique identifier of the location to query
    */  
    router.get('/locations/:cpo/:scId', authenticate, async (req, res) => {
        console.log(`GET /store/locations/${req.params.cpo}/${req.params.scId}`);
        try {
            const location = await sc.store.getLocationById(req.params.cpo, req.params.scId);
            res.send(location);
        } catch (err) {
            res.status(400).send('Unable to find location with that ID');
        }
    });

    /**
     * @api {get} /store/locations/all-ids get location ids
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Get all location ids connected to the currently used wallet
     * 
    */  
    router.get('/locations/all-ids', authenticate, async (req, res) => {
        console.log('GET /store/locations/all-ids');
        const cpo = wallet.keychain[0].address;
        const ids = await sc.store.getIdsByCPO(cpo);

        try {
            res.send(ids);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    /**
     * @api {get} /store/tariffs/:cpo get tariffs by CPO
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get all tariffs owned by a CPO
     * 
     * @apiParam {string} cpo The address of the CPO to query tariffs from
    */ 
    router.get('/tariffs/:cpo', authenticate, async (req, res) => {
        console.log(`GET /store/tariffs/${req.params.cpo}`);
        try {
            const tariffs = await sc.store.getAllTariffsByCPO(req.params.cpo);
            res.send(tariffs);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {get} /store/get-owner/:scId get owner of scId
     * @apiGroup store
     * @apiHeader {string} Authorization Token value  
     * @apiDescription Get the address of the owner of a location by its Share&Charge ID
     * 
     * @apiParam scId The unique location identifier of the location on the Share&Charge network
    */ 
    router.get('/get-owner/:scId', authenticate, async (req, res) => {
        console.log(`GET /store/get-owner/${req.params.scId}`);
        const owner = await sc.store.getOwnerOfLocation(req.params.scId);
        res.send(owner);
    });

    /**
     * @api {post} /store/location add single location
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
        console.log('POST /store/location');
        try {
            const result = await sc.store.useWallet(wallet).addLocation(req.body);
            res.send(result);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


    /**
     * @api {post} /store/locations add multiple locations
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
        console.log('POST /store/locations');
        let locations = req.body;
        const results = {};
        for (const loc of locations) {
            try {
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
     * @api {put} /store/location/:id update single location
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
        console.log(`PUT /store/location/${req.params.id}`);
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
     * @api {delete} /store/location/:scId delete single location
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription Delete a location by its scId
     *
     * @apiParam {string} scId The unique identifier of the location on the Share&Charge network 
    */ 
    router.delete('/location/:scId', authenticate, async(req, res) => {
        console.log(`DELETE /store/location/${req.params.scId}`);
        try {
            const result = await sc.store.useWallet(wallet).removeLocation(req.params.scId);
            res.send(`Location with ${result.scId} is removed`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {post} /store/tariffs add tariffs
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
        console.log('POST /store/tariffs');
        try {
            const result = await sc.store.useWallet(wallet).addTariffs(req.body);
            res.send(`Added tariffs data\nipfs: ${result}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    /**
     * @api {put} /store/tariffs update tariffs
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
        console.log('PUT /store/tariffs');
        try {
            const result = await sc.store.useWallet(wallet).updateTariffs(req.body);
            res.send(`Updated tariffs data\nipfs: ${result}`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    
    /**
     * @api {delete} /store/tariffs delete tariffs
     * @apiGroup store
     * @apiHeader {String} Authorization Token value  
     * @apiDescription delete all tariffs of CPO
    */ 
    router.delete('/tariffs', authenticate, async (req, res) => {
        console.log('DELETE /store/tariffs');
        try {
            const result = await sc.store.useWallet(wallet).removeTariffs();
            res.send('Removed tariffs');
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    return router;
};