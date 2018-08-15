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
    "name": "info",
    "group": "cdr",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token value displayed on server start</p>"
          }
        ]
      }
    },
    "description": "<p>get and filter Charge Detail Records (CDRs)</p>",
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
    "groupTitle": "cdr"
  },
  {
    "type": "get",
    "url": "/api/charging/cdr",
    "title": "/cdr",
    "name": "_cdr",
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
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging"
  },
  {
    "type": "get",
    "url": "/api/charging/confirm/start",
    "title": "/confirm/start",
    "name": "_confirm_start",
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
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging"
  },
  {
    "type": "get",
    "url": "/api/charging/confirm/stop",
    "title": "/confirm/stop",
    "name": "_confirm_stop",
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
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging"
  },
  {
    "type": "get",
    "url": "/api/charging/request/start",
    "title": "/request/start",
    "name": "_request_start",
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
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging"
  },
  {
    "type": "get",
    "url": "/api/charging/request/stop",
    "title": "/request/stop",
    "name": "_request_stop",
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
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging"
  },
  {
    "type": "get",
    "url": "/api/charging/session",
    "title": "/session",
    "name": "_session",
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
    "description": "<p>get a charging session at a particular scId and EVSE ID</p>",
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
    "version": "0.0.0",
    "filename": "src/routes/charging.ts",
    "groupTitle": "charging"
  },
  {
    "type": "post",
    "url": "/api/store/locations",
    "title": "/locations",
    "name": "_location",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Add multiple new locations to the network</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "post",
    "url": "/api/store/location",
    "title": "/location",
    "name": "_location",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Add a new location to the network</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "put",
    "url": "/api/store/location/:id",
    "title": "/location/:id",
    "name": "_location__id",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Update a location</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "delete",
    "url": "/api/store/location/:id",
    "title": "/location/:id",
    "name": "_location__id",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Delete a location</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/store/locations/:cpo",
    "title": "/locations/:cpo",
    "name": "_locations__cpo",
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
    "description": "<p>Get all locations owned by a CPO</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/store/locations/:cpo/:id",
    "title": "/locations/:cpo/:id",
    "name": "_locations__cpo__id",
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
    "description": "<p>Get single location owned by a CPO</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/store/locations/all-ids",
    "title": "/locations/all-ids",
    "name": "_locations_all_ids",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get all location ids connected to the currently used wallet</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/store/locations/owner/:scId",
    "title": "/locations/owner/:scId",
    "name": "_locations_owner__scId",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get the address of the owner of a location by its Share&amp;Charge ID</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "delete",
    "url": "/api/store/tariffs",
    "title": "/tariffs",
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
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>delete all tariffs of CPO</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "post",
    "url": "/api/store/tariffs",
    "title": "/tariffs",
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
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Add tariffs to the network</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "put",
    "url": "/api/store/tariffs",
    "title": "/tariffs",
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
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Update all tariffs</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/store/tariffs/:cpo",
    "title": "/tariffs/:cpo",
    "name": "_tariffs__cpo",
    "group": "store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>Get all tariffs owned by a CPO</p>",
    "version": "0.0.0",
    "filename": "src/routes/store.ts",
    "groupTitle": "store"
  },
  {
    "type": "get",
    "url": "/api/token/balance/:address",
    "title": "/balance/:address",
    "name": "_balance__address",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>get token balance of a particular address</p>",
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token"
  },
  {
    "type": "post",
    "url": "/api/token/deploy",
    "title": "/deploy",
    "name": "_deploy",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>deploy a new eMobility Service Provider token on the network</p>",
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token"
  },
  {
    "type": "post",
    "url": "/api/token/mint",
    "title": "/mint",
    "name": "_mint",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>mint tokens for a driver address</p>",
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token"
  },
  {
    "type": "post",
    "url": "/api/token/burn/:value",
    "title": "burn value of tokens from wallet",
    "name": "burn",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>burn tokens from wallet</p>",
    "sampleRequest": [
      {
        "url": "../api/token/burn"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token"
  },
  {
    "type": "get",
    "url": "/api/token/info",
    "title": "get token info",
    "name": "info",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>get token info</p>",
    "sampleRequest": [
      {
        "url": "../api/token/info"
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
    "groupTitle": "token"
  },
  {
    "type": "post",
    "url": "/api/token/transfer/:recipient/:value",
    "title": "transfer value of tokens to recipient",
    "name": "transfer",
    "group": "token",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>transfer tokens to recipient address</p>",
    "sampleRequest": [
      {
        "url": "../api/token/transfer"
      }
    ],
    "version": "0.0.0",
    "filename": "src/routes/token.ts",
    "groupTitle": "token"
  },
  {
    "type": "get",
    "url": "/api/wallet/create",
    "title": "create a new wallet",
    "name": "createWallet",
    "group": "wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>create a wallet</p>",
    "sampleRequest": [
      {
        "url": "../api/wallet/create"
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
    "groupTitle": "wallet"
  },
  {
    "type": "get",
    "url": "/api/wallet/balance/:address",
    "title": "gets balance",
    "name": "getBalance",
    "group": "wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>gets balance of a wallet</p>",
    "sampleRequest": [
      {
        "url": "../api/wallet/balance/:address"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>the address of a wallet</p>"
          }
        ]
      }
    },
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
    "groupTitle": "wallet"
  },
  {
    "type": "get",
    "url": "/api/wallet/info",
    "title": "gets information about the currently set wallet",
    "name": "getInfo",
    "group": "wallet",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Token value</p>"
          }
        ]
      }
    },
    "description": "<p>gets coinbase and transaction count for wallet</p>",
    "sampleRequest": [
      {
        "url": "../api/wallet/info"
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
    "groupTitle": "wallet"
  }
] });
