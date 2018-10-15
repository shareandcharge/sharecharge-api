# sharecharge-api
HTTP webserver for the Share&amp;Charge e-Mobility Network

## Install and setup

#### Shell

Package installation:
```
npm install -g @motionwerk/sharecharge-api
```

Run:
```
sc-api
```

The server will start, showing you the host and port it is listening on, as well as your authorization token.

To test everything is working, run:
```
curl -H 'Authorization: Token <YOUR_AUTH_TOKEN>' http://localhost:3000/api/token/info
```

You should see the following:

```
{
  "name": "Share&Charge Token",
  "symbol": "SCT",
  "address": "0x407d3449819A6e47ce43687d58B3C00dCed77bc8",
  "owner": "0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e"
}
```

The host and port are also configurable via environment variables:
```
PORT=3001 HOST=0.0.0.0 sc-api
```

#### Module Import

The server is also available as a Node module:

```ts
import scApi from '@motionwerk/sharecharge-api';

const host = '0.0.0.0';
const port = 3001

scApi(host, port);
```


## Development

```
git clone git@github.com:motionwerkGmbH/sharecharge-api.git
cd sharecharge-api
npm install
npm start
```

## Documentation

**NOTE**: Work in Progress

After running the server you can visit `http://localhost:3000/api/docs` (by default) to view the API documentation. 

#### Building new documentation

```
npm run doc && npm start
```

