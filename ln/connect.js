const lnService = require('ln-service');

const {lnd} = lnService.authenticatedLndGrpc({
  cert: process.env.LND_CERT_BASE64,
  macaroon: process.env.LND_MACAROON_BASE64,
  socket: process.env.LND_GRPC_HOST,
});

module.exports = lnd;
