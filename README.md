# sharecharge-api
HTTP webserver for the Share&amp;Charge e-Mobility Network

## Usage

~~~~
git clone git@github.com:motionwerkGmbH/sharecharge-api.git
cd sharecharge-api
npm install
npm run install
npm run start

> @motionwerk/sharecharge-api@0.3.2 start /home/me/motionwerk/sharecharge-api
> ts-node src/app.ts
2018-07-11T07:17:34.997Z - info: API server running on http://localhost:3000

~~~~

test if everything works with: <strong>http://localhost:3000/api/token/info</strong>

you sould see:

~~~~
{
    "name": "MSP Token",
    "symbol": "MSP",
    "address": "0xA4443565f8790E6fd4e88974b490630822A35c14",
    "owner": "0x69ce47CE13d71c494f8bCec8afEcB78158Edd58a"
}
~~~~


## Troubleshooting:

#### I'm not getting the json with the token info

Your config file under $HOME/.sharecharge should look something like this:

~~~~
{
  "tokenAddress":"0xA4443565f8790E6fd4e88974b490630822A35c14",
  "locationsPath": "locations.json",
  "tariffsPath": "tariffs.json",
  "bridgePath": "@motionwerk/sharecharge-example-bridge",
  "seed": "health salt town tiger vintage trend cart nation grace mechanic long dial",
  "stage": "local",
  "gasPrice": 1,
  "ethProvider": "http://localhost:8545",
  "ipfsProvider": {
    "host": "ipfs.infura.io",
    "port": "5001",
    "protocol": "https"
  }
}
~~~~

2) You should have tobalaba running in the background, since the contract for the token is published on tobalaba

#### I still don't see the token info json

Try to use sharecharge-cli

~~~~
sharecharge-cli$ ts-node src/sc.ts wallet info
~~~~

output:
~~~~

coinbase: 0x69ce47ce13d71c494f8bcec8afecb78158edd58a
tx count: 16
~~~~
