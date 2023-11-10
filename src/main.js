const SHA256 = require('crypto-js/sha256')


class Transaction{
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor( timestamp, transactions, previosHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("7/11/2023", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAdress(address){
        let balance = 0;
        
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance
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
kongCoin.createTransaction(new Transaction('adress1', 'adress2', 100));
kongCoin.createTransaction(new Transaction('adress2', 'adress1', 50));

console.log('\n Starting the miner...');
kongCoin.minePendingTransaction('kong-address');

console.log('\nBalance of kong is',  kongCoin.getBalanceOfAdress('kong-address'));

console.log('\n Starting the miner agian...');
kongCoin.minePendingTransaction('kong-address');

console.log('\nBalance of kong is',  kongCoin.getBalanceOfAdress('kong-address'));