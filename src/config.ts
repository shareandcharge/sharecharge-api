import { IConfig, getConfigDir, prepareConfigLocation } from "@motionwerk/sharecharge-config";
import * as fs from "fs";
import * as path from "path";

prepareConfigLocation();

const config: IConfig = JSON.parse(fs.readFileSync(path.join(getConfigDir(), "config.json"), "UTF8"));

export { config }
