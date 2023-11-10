const { Blockchain, Transaction} = require('./blockchain')
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('da1eee17f3e05869ae7d13c9fd796a2a510fef01e9a57af827819b308fef4a40');
const myWalletAddress = myKey.getPublic('hex');

let kongCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
kongCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
kongCoin.minePendingTransaction(myWalletAddress);

console.log('\nBalance of kong is',  kongCoin.getBalanceOfAdress(myWalletAddress));

kongCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid? ',  kongCoin.isChainValid());
