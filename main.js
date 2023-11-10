const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previosHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previosHash = previosHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previosHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "7/11/2023", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.previosHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previosBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previosHash !== previosBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let kongCoin = new Blockchain();
kongCoin.addBlock(new Block(1, "8/11/2023", {amount: 5}));
kongCoin.addBlock(new Block(2, "10/11/2023", {amount: 10}))

kongCoin.chain[1].data = { amount: 100 };
kongCoin.chain[1].hash = kongCoin.chain[1].calculateHash();

// console.log('Is blockchain valid? :' + kongCoin.isChainValid());
console.log(JSON.stringify(kongCoin, null, 5));