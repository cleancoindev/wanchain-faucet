let wanUtil = require('wanchain-util');
var Tx = wanUtil.ethereumTx;

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let coinbase = "0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e";
let coinbaseSK = process.env.COINBASESK;
let g_int_serial  = web3.eth.getTransactionCount(coinbase);
let g_tx_index = 0;


        let filter = web3.eth.filter('latest');
        filter.watch(function(err,blockhash){
            g_int_serial  = web3.eth.getTransactionCount(coinbase);
            g_tx_index = 0;
        });
exports.giveEtherTo = function (receiverAddress, etherAmout=12)
{
    var privateKey = new Buffer(coinbaseSK,'hex');
    var amount = web3.toWei(etherAmout, 'ether');
    var bn = new web3.BigNumber(amount);
    var hexValue = '0x' + bn.toString(16);
    var serial = web3.toHex(g_int_serial+g_tx_index);
    g_tx_index += 1;
    var rawTx = {
        nonce: serial,
        gasLimit: '0x100000',
        pasPrice: '30000000000',
        to: receiverAddress,
        value: hexValue
    };
    const tx = new Tx(rawTx);
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    try {
        let hash = web3.eth.sendRawTransaction("0x"+serializedTx.toString('hex'));
        console.log("giveEtherTo hash:" + hash);
        return hash;
    }catch(err){
        console.log("giveEtherTo failed:",err);
        return "";
    }
}

