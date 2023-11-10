const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previosHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previosHash = previosHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previosHash + this.timestamp + JSON.stringify(this.data) + this. nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:: "+ this.hash);
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "7/11/2023", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.previosHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
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
console.log('Mining block 1...');
kongCoin.addBlock(new Block(1, "8/11/2023", {amount: 5}));

console.log('Mining block 2...');
kongCoin.addBlock(new Block(2, "10/11/2023", {amount: 10}))