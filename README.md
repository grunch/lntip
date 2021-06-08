# Lightning Network tipping app
Simple lightning tipping nodejs app, this app connects to a lnd node using gRPC.

# Instalation
To connect with a lnd node we need to set 3 variables in the `.env` file .

*LND_CERT_BASE64:* LND node TLS certificate on base64 format, you can get it with `base64 ~/.lnd/tls.cert | tr -d '\n'` on the lnd node.

*LND_MACAROON_BASE64:* Macaroon file on base64 format, the macaroon file contains permission for doing actions on the lnd node, for this app a good choice is to use the `invoice.macaroon` file, you can get it with `base64 ~/.lnd/data/chain/bitcoin/mainnet/invoice.macaroon | tr -d '\n'`.

*LND_GRPC_HOST:* IP address or domain name from the LND node and the port separated by colon (`:`), example: `192.168.0.2:10009`.

To install just run:
```
$ git clone git@github.com:grunch/lntip.git
$ cd lntip
$ npm install
```
# Executing
```
$ npm start
```
