#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharecharge_lib_1 = require("@motionwerk/sharecharge-lib");
const config_1 = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
require("reflect-metadata");
const loggingProvider_1 = require("./services/loggingProvider");
const charging_1 = require("./routes/charging");
const cdr_1 = require("./routes/cdr");
const store_1 = require("./routes/store");
const token_1 = require("./routes/token");
const auth_1 = require("./routes/auth");
const logger = new loggingProvider_1.default().obtain();
const app = express();
const sc = sharecharge_lib_1.ShareCharge.getInstance(config_1.config);
sc.startListening();
sc.on('Error', result => {
    logger.error("Error", result);
});
const wallet = new sharecharge_lib_1.Wallet('filter march urge naive sauce distance under copy payment slow just cool');
app.use(bodyParser.json()); // support json bodies
app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies
app.use('/health', (req, res) => res.send('OK'));
app.use('/api/store', store_1.default(sc, wallet));
app.use('/api/token', token_1.default(sc, wallet));
app.use('/api/charging', charging_1.default(sc, wallet));
app.use('/api/cdr', cdr_1.default(sc, wallet));
app.use('/api/auth', auth_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    // process.send({ msg: "started", args: ""});
    logger.info('API server running on http://localhost:' + port);
});
//# sourceMappingURL=app.js.map