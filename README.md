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
