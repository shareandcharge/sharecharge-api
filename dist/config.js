"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharecharge_config_1 = require("@motionwerk/sharecharge-config");
const fs = require("fs");
const path = require("path");
sharecharge_config_1.prepareConfigLocation();
const config = JSON.parse(fs.readFileSync(path.join(sharecharge_config_1.getConfigDir(), "config.json"), "UTF8"));
exports.config = config;
//# sourceMappingURL=config.js.map