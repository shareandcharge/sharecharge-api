import { ShareCharge, Wallet } from '@motionwerk/sharecharge-lib';
import { config } from './config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import LoggingProvider from "./services/loggingProvider";
import charging from './routes/charging';
import cdr from './routes/cdr';
import store from './routes/store';
import token from './routes/token';
import auth from './routes/auth';

const logger = new LoggingProvider().obtain();
const app = express();

const sc = ShareCharge.getInstance(config);
sc.startListening();

sc.on('Error', result => {
    logger.error("Error", result);
});

const wallet = new Wallet(config.seed);

app.use(bodyParser.json()); // support json bodies
app.use(bodyParser.urlencoded({extended: true}));  //support encoded bodies

app.use('/health', (req, res) => res.send('OK'));

app.use('/api/store', store(sc, wallet));
app.use('/api/token', token(sc, wallet));
app.use('/api/charging', charging(sc, wallet));
app.use('/api/cdr', cdr(sc, wallet));
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // process.send({ msg: "started", args: ""});
    logger.info('API server running on http://localhost:' + port);
});
