define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/docs/main.js",
    "group": "_home_adam_Motionwerk_sharecharge_api_src_docs_main_js",
    "groupTitle": "_home_adam_Motionwerk_sharecharge_api_src_docs_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/cdr/info/",
    "title": "info",
    "description": "<p>get and (optionally) filter Charge Detail Records (CDRs)</p>",
    "group": "cdr",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value displayed on server start</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"controller\": \"0x50f43EE60da70E438ba1Ca74cC1C7d8fD9DDEE9a\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/cdr/info"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n   \"scId\": \"0x35312e3433323936362c372e303033393436\",\n   \"evseId\": \"BB-5983-3\",\n   \"sessionId\": \"808296243576\",\n   \"controller\": \"0x50f43EE60da70E438ba1Ca74cC1C7d8fD9DDEE9a\",\n   \"start\": \"Wed, 01 Aug 2018 13:19:57 GMT\",\n   \"end\": \"Wed, 01 Aug 2018 13:20:22 GMT\",\n   \"finalPrice\": \"110\",\n   \"tariff\": \"flat\",\n   \"chargedUnits\": \"0\",\n   \"tokenContract\": \"0xbA07888d72C26ab0744f651824D9Dc774fb0445F\",\n   \"chargingContract\": \"0xde969C804Eb613653C35E6E39f39b5de78630c1a\",\n   \"transactionHash\": \"0x677d17daf85010e4c7107f081f80eb4b0ba49abc3b9978a8cdb60a3d30a74a45\" \n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cdr.ts",
    "groupTitle": "cdr",
    "name": "GetApiCdrInfo"
  },
  {
    "type": "get",
    "url": "/api/charging/cdr",
    "title": "cdr",
    "group": "charging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Confirm a Charge Detail Record (CDR) on the network</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "tariffValue",
            "description": "<p>The final units charged during the session (in watt hours if energy-based tariff or seconds if time/flat-based tariff)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "price",
            "description": "<p>The final price of the charging session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example-Request",
          "content": "{\n    \"scId\": \"0x35312e3433323938342c372e303033393038\",\n    \"evseId\": \"BE-5084-4\",\n    \"tariffvalue\": 1800,\n    \"price\": 500\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging",
    "name": "GetApiChargingCdr"
  },
  {
    "type": "get",
    "url": "/api/charging/confirm/start",
    "title": "confirm start",
    "group": "charging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Confirm the start of a charging session</p>",
    "parameter": {
      "examples": [
        {
          "title": "Example-Request",
          "content": "{\n    \"scId\": \"0x35312e3433323938342c372e303033393038\",\n    \"evseId\": \"BE-5084-4\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging",
    "name": "GetApiChargingConfirmStart"
  },
  {
    "type": "get",
    "url": "/api/charging/confirm/stop",
    "title": "confirm stop",
    "group": "charging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Confirm the stop of a charging session</p>",
    "parameter": {
      "examples": [
        {
          "title": "Example-Request",
          "content": "{\n    \"scId\": \"0x35312e3433323938342c372e303033393038\",\n    \"evseId\": \"BE-5084-4\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging",
    "name": "GetApiChargingConfirmStop"
  },
  {
    "type": "get",
    "url": "/api/charging/request/start",
    "title": "request start",
    "group": "charging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Request the start of a charging session</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "tariffId",
            "description": "<p>The OCPI enum identifier for the type of tariff used to charge (0 = energy; 1 = flat; 3 = time)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "tariffValue",
            "description": "<p>The number of units to charge for (in watt hours if energy-based tariff or seconds if time/flat-based tariff)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "price",
            "description": "<p>The estimated price of the charging session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example-Request",
          "content": "{\n    \"scId\": \"0x35312e3433323938342c372e303033393038\",\n    \"evseId\": \"BE-5084-4\",\n    \"tariffId\": 1,\n    \"tariffValue\": 3600,\n    \"price\": 1000\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging",
    "name": "GetApiChargingRequestStart"
  },
  {
    "type": "get",
    "url": "/api/charging/request/stop",
    "title": "request stop",
    "group": "charging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Request the stop of a charging session</p>",
    "parameter": {
      "examples": [
        {
          "title": "Example-Request",
          "content": "{\n    \"scId\": \"0x35312e3433323938342c372e303033393038\",\n    \"evseId\": \"BE-5084-4\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging",
    "name": "GetApiChargingRequestStop"
  },
  {
    "type": "get",
    "url": "/api/charging/session",
    "title": "session",
    "group": "charging",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get a charging session at a particular scId and EVSE ID</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scId",
            "description": "<p>A unique Share&amp;Charge location identifier</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "evseId",
            "description": "<p>An Electric Vehicle Supply Unit identifier</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/charging/session/:scId/:evseId"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n           \"id\": \"27215646981\",\n           \"controller\": \"0x684e91B424F285043239F5b7c3937caDa2D6f45C\",\n           \"tariffId\": \"3\",\n           \"tariffValue\": \"3600\",\n           \"token\": \"0x682F10b5e35bA3157E644D9e7c7F3C107EB46305\",\n           \"price\": \"250\",\n           \"startTime\": \"1534412787\" \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging",
    "name": "GetApiChargingSession"
  },
  {
    "type": "delete",
    "url": "/api/store/location/:scId",
    "title": "delete single location",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Delete a location by its scId</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "scId",
            "description": "<p>The unique identifier of the location on the Share&amp;Charge network</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "DeleteApiStoreLocationScid"
  },
  {
    "type": "delete",
    "url": "/api/store/tariffs",
    "title": "delete tariffs",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>delete all tariffs of CPO</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "DeleteApiStoreTariffs"
  },
  {
    "type": "get",
    "url": "/api/store/locations/all-ids",
    "title": "get location ids",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get all location ids connected to the currently used wallet</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/store/locations/all-ids"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "GetApiStoreLocationsAllIds"
  },
  {
    "type": "get",
    "url": "/api/store/locations/:cpo",
    "title": "get all locations by CPO",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get all locations owned by a CPO</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cpo",
            "description": "<p>The address of the CPO to query for location details</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/store/locations/:cpo"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "GetApiStoreLocationsCpo"
  },
  {
    "type": "get",
    "url": "/api/store/locations/:cpo/:scId",
    "title": "get location by scId",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get single location owned by a CPO</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "scId",
            "description": "<p>The unique identifier of the location to query</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/store/locations/:cpo/:scId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "GetApiStoreLocationsCpoScid"
  },
  {
    "type": "get",
    "url": "/api/store/locations/owner/:scId",
    "title": "get owner of scId",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get the address of the owner of a location by its Share&amp;Charge ID</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "scId",
            "description": "<p>The unique location identifier of the location on the Share&amp;Charge network</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/store/locations/owner/:scId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "GetApiStoreLocationsOwnerScid"
  },
  {
    "type": "get",
    "url": "/api/store/tariffs/:cpo",
    "title": "get tariffs by CPO",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get all tariffs owned by a CPO</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cpo",
            "description": "<p>The address of the CPO to query tariffs from</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/store/tariffs/:cpo"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "GetApiStoreTariffsCpo"
  },
  {
    "type": "post",
    "url": "/api/store/location",
    "title": "add single location",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Add a new location to the network</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p><a href=\"https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description\">OCPI location object</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{ <locationObject> }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "PostApiStoreLocation"
  },
  {
    "type": "post",
    "url": "/api/store/locations",
    "title": "add multiple locations",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Add multiple new locations to the network</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>Array of <a href=\"https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description\">OCPI location objects</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[\n { <locationObject> },\n { <locationObject> }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "PostApiStoreLocations"
  },
  {
    "type": "put",
    "url": "/api/store/location/:id",
    "title": "update single location",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Update a location with a particular scId</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p><a href=\"https://github.com/ocpi/ocpi/blob/master/mod_locations.md#3-object-description\">OCPI location object</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ <locationObject> }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "PutApiStoreLocationId"
  },
  {
    "type": "put",
    "url": "/api/store/tariffs",
    "title": "update tariffs",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p><a href=\"https://github.com/ocpi/ocpi/blob/master/mod_tariffs.md#3-object-description\">OCPI tariff object</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example-Request:",
          "content": "[\n    { <tariffObject> },\n    { <tariffObject> }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store",
    "name": "PutApiStoreTariffs"
  },
  {
    "type": "post",
    "url": "/api/store/tariffs",
    "title": "add tariffs",
    "name": "_tariffs",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Add tariffs to the network</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>Array of <a href=\"https://github.com/ocpi/ocpi/blob/master/mod_tariffs.md#3-object-description\">OCPI tariff objects</a></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example-Request:",
          "content": "[\n    { <tariffObject> },\n    { <tariffObject> }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/token/balance/:address",
    "title": "get token balance",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>get token balance of a particular address</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the wallet to query</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/token/balance/:address"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token",
    "name": "GetApiTokenBalanceAddress"
  },
  {
    "type": "get",
    "url": "/api/token/info",
    "title": "get token info",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>get information about the currently used eMobility Service Provider token</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/token/info"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"name\": \"Share&Charge Token\",\n    \"symbol\": \"SCT\",\n    \"address\": \"0x407d3449819A6e47ce43687d58B3C00dCed77bc8\",\n    \"owner\": \"0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token",
    "name": "GetApiTokenInfo"
  },
  {
    "type": "post",
    "url": "/api/token/burn/:value",
    "title": "burn",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>burn tokens from currently used wallet</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "value",
            "description": "<p>The amount of tokens to burn</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"value\": 1000\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token",
    "name": "PostApiTokenBurnValue"
  },
  {
    "type": "post",
    "url": "/api/token/deploy",
    "title": "deploy",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>deploy a new eMobility Service Provider token on the network</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the new eMobility Service Provider token</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "symbol",
            "description": "<p>The symbol of the new token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"My New MSP Token\",\n    \"symbol\": \"MSPT\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token",
    "name": "PostApiTokenDeploy"
  },
  {
    "type": "post",
    "url": "/api/token/mint",
    "title": "mint",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Mint tokens for a driver (NOTE: you must be the owner of the MSP token to mint)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "driver",
            "description": "<p>The address of the driver to mint tokens for</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "amount",
            "description": "<p>The value of tokens to mint for the driver</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"driver\": \"0x1234567...\",\n    \"amount\": 1000\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token",
    "name": "PostApiTokenMint"
  },
  {
    "type": "post",
    "url": "/api/token/transfer/:recipient/:value",
    "title": "transfer",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Transfer tokens to recipient address</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipient",
            "description": "<p>The address of the wallet to send tokens to</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "value",
            "description": "<p>The amount of tokens to send</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token",
    "name": "PostApiTokenTransferRecipientValue"
  },
  {
    "type": "get",
    "url": "/api/wallet/balance/:address",
    "title": "get balance",
    "group": "wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Gets EV Coin balance of a wallet</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>The address of the wallet to query</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/wallet/balance/:address"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"balance\": \"42\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/wallet.ts",
    "groupTitle": "wallet",
    "name": "GetApiWalletBalanceAddress"
  },
  {
    "type": "get",
    "url": "/api/wallet/create",
    "title": "create",
    "group": "wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>generate a new wallet</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/wallet/create"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"seed\": \"art bonus expect glance column select toddler spoon replace garlic exclude true\",\n    \"address\": \"0x06dc7133158725a109b091c3438be224544299f4\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/wallet.ts",
    "groupTitle": "wallet",
    "name": "GetApiWalletCreate"
  },
  {
    "type": "get",
    "url": "/api/wallet/info",
    "title": "get info",
    "group": "wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value</p>"
          }
        ]
      }
    },
    "description": "<p>gets coinbase and transaction count for wallet</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/wallet/info"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "coinbase",
            "description": "<p>The (primary) public address of the wallet</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "txCount",
            "description": "<p>The nonce of the coinbase</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"coinbase\": \"0x123..\",\n    \"txCount\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/wallet.ts",
    "groupTitle": "wallet",
    "name": "GetApiWalletInfo"
  }
] });
