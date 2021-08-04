const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }


    createGenesisBlock() {
        return new Block(0, "01/01/2021", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        this.isChainValid;
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);


        //NEW COMMENT 

        // I think I fixed the problem of after tampering, if a new block is being added the chain is verified.
        // If a block appears to be tampered with it will be removed and all blocks will be rehashed
        // I think this fixes problems for now but long chains will make this inefficient.


        //OLD COMMENTS

        // Found out this wouldn't work if tampering can happen after a the block being tampered with is surrounded.
        // Need further research on how tampering can and does happen, I would assume after being surrounded peer checks would eliminate further tampering

    }
    isChainValid() {
        let output = true;
        if (this.chain.length > 1) {
            for (let i = 1; i < this.chain.length; i++) {
                if (this.chain[i].hash !== this.chain[i].calculateHash() || this.chain[i].previousHash !== this.chain[i - 1].hash) {
                    output = false;
                    this.chain.splice(this.chain[i], 1);
                    console.log("Chain Invalid, removed tampered block")
                    break;
                }
            }
            if (output = false) {
                for (let i = 1; i < this.chain.length; i++) {
                    this.previousHash = this.getLatestBlock().hash;
                    this.chain[i].hash = this.chain[i].calculateHash;
                }
            } else {
                console.log("Chain Valid");
            }
        }
        return output;
    }
}

let fredCoin = new BlockChain();

console.log("1");

fredCoin.addBlock(new Block(1, "02/02/2021", { amount: 4 }))

console.log("2");

fredCoin.addBlock(new Block(2, "03/03/2021", { amount: 10 }))
// let hash1 = fredCoin.chain[2].hash


fredCoin.chain[2].data = { amount: 1000 } //tampering data


fredCoin.addBlock(new Block(3, "04/04/2021", { amount: 20 }))
console.log("3");

fredCoin.addBlock(new Block(4, "05/05/2021", { amount: 30 }))

// console.log(JSON.stringify(fredCoin, null, 5));




console.log(JSON.stringify(fredCoin, null, 5));



// fredCoin.chain[2].hash = fredCoin.chain[2].calculateHash(); //tampering with hash


// console.log(JSON.stringify(fredCoin, null, 5));



// TODO find a way to eliminate a tampered block and then fix all hashes of blocks that have not been tampered
