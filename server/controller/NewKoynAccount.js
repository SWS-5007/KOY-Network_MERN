const { Api, JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig"); // development only
const fetch = require("node-fetch"); // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require("util");

const creatorPrivateKey = "5KXFuHiXMPprfuQK6ZwhS9hzmmzVSTqwMqvAGXmDDQpUdr4mL5T";
const creatorPublicKey =
  "EOS4uXns5GxoeQPnpA9db789XduETbHPU6vvJAimHpSqE4EQcePVT";
const privateKeys = [creatorPrivateKey];
const signatureProvider = new JsSignatureProvider(privateKeys);

const rpc = new JsonRpc("https://testnet.koy.network/", { fetch });
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

const KoynAccounts = require("../model/KoynAccounts");

const createNewAccount = async (account, res) => {
  try {
    const account_name = account.chain_name;
    const owner_publicKey = creatorPublicKey;
    const active_publicKey = account.public_key;
    const result = await api.transact(
      {
        actions: [
          {
            account: "eosio",
            name: "newaccount",
            authorization: [
              {
                actor: "productloger",
                permission: "active",
              },
            ],
            data: {
              creator: "productloger",
              name: account_name,
              owner: {
                threshold: 1,
                keys: [
                  {
                    key: owner_publicKey,
                    weight: 1,
                  },
                ],
                accounts: [],
                waits: [],
              },
              active: {
                threshold: 1,
                keys: [
                  {
                    key: active_publicKey,
                    weight: 1,
                  },
                ],
                accounts: [],
                waits: [],
              },
            },
          },
          {
            account: "eosio",
            name: "buyrambytes",
            authorization: [
              {
                actor: "productloger",
                permission: "active",
              },
            ],
            data: {
              payer: "productloger",
              receiver: account_name,
              bytes: 8192,
            },
          },
          {
            account: "eosio",
            name: "delegatebw",
            authorization: [
              {
                actor: "productloger",
                permission: "active",
              },
            ],
            data: {
              from: "productloger",
              receiver: account_name,
              stake_net_quantity: "1.0000 TLOS",
              stake_cpu_quantity: "1.0000 TLOS",
              transfer: false,
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    account.transaction = result.transaction_id;
    console.log(
      "Created new account " + account_name + " in transaction: ",
      result.transaction_id
    );
    account.save(function (err, account) {
      if (err) res.status(500).send(err);
      res.json(account);
    });
  } catch (err) {
    console.log("New account service error", err);
    res.status(500).send(err);
  }
};

exports.create_account = function (req, res) {
  const reqUser = req.userInfo; // User Info
  var account = new KoynAccounts(req.body);
  account.userId = reqUser.id;
  account.chain_name = randomName();
  createNewAccount(account, res);
};

exports.list_accounts = function (req, res) {
  KoynAccounts.find({}, function (err, accounts) {
    if (err) res.status(500).send(err);
    res.json(accounts);
  });
};

exports.get_account = function (req, res) {
  KoynAccounts.findById(req.params.id, function (err, account) {
    if (err) res.status(500).send(err);
    res.json(account);
  });
};

function randomName() {
  var chars = "12345abcdefghijklmnopqrstuvwxyz";
  var result = "";
  for (var i = 12; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
