import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import { config } from './config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import charging from './routes/charging';
import cdr from './routes/cdr';
import store from './routes/store';
import token from './routes/token';
import wallet_route from './routes/wallet';

const pkg = require('../package.json');

const app = express();

const sc = ShareCharge.getInstance(config);

const wallet = new Wallet(config.seed);
        
app.use(bodyParser.json()); // support json bodies
app.use(bodyParser.urlencoded({extended: true}));  //support encoded bodies

app.use('/health', (req, res) => res.send('OK'));

app.use('/api/store', store(sc, wallet));
app.use('/api/token', token(sc, wallet));
app.use('/api/charging', charging(sc, wallet));
app.use('/api/cdr', cdr(sc, wallet));
app.use('/api/wallet', wallet_route(config, sc, wallet));
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require('../docs/swagger.json')));
app.use('/api/docs', express.static(path.join(__dirname, 'docs')));

export default (host: string, port: number) => app.listen(port, host, () => {
    // process.send({ msg: "started", args: ""});
    console.log(`API v${pkg.version} running on http://${host}:${port}`);
    console.log(config.apiKey ? `API Key: ${config.apiKey}` : `Warning: No API Key found! Unauthorized access possible.`);
});