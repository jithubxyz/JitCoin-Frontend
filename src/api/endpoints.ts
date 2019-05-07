import { Block } from '../types/Block';

const LOCAL_ENDPOINT = 'http://localhost:7179';

interface ClientResponse<T> {
    message: string;
    code: number;
    data: T | null;
}

async function getLastBlock() {
    const response: ClientResponse<Block> = await fetch(`${LOCAL_ENDPOINT}/lastBlock`, { method: 'GET' }).then(r => r.json());

    if (response.code === 0) {
        return response.data;
    }

    return null;
}

async function getBlockByHash(hash: string) {
    const response: ClientResponse<Block> = await fetch(`${LOCAL_ENDPOINT}/blockByHash`, { method: 'POST', body: JSON.stringify({ hash }) }).then(r => r.json());

    if (response.code === 0) {
        return response.data;
    }

    return null;
}

async function getAllBlocks(lastBlock: Block) {
    const blocks: Array<Block> = [lastBlock];
    
    if (!lastBlock.header.previousBlockHash) {
        return blocks;
    }

    let previousBlockHash = lastBlock.header.previousBlockHash;

    while(previousBlockHash !== null) {
        const block = await getBlockByHash(previousBlockHash);

        if (block) {
            blocks.push(block);
            previousBlockHash = block.header.previousBlockHash;
        } else {
            return blocks;
        }
    }

    return blocks;
}

async function createWallet(passphrase: string) {
    const response: ClientResponse<any> = await fetch(`${LOCAL_ENDPOINT}/createWallet`, { method: 'POST', body: JSON.stringify({ passphrase }) }).then(r => r.json());

    if (response.code !== 12) {
        return response.message;
    }

    return null;
}

async function unlockWallet(passphrase: string) {
    const response: ClientResponse<any> = await fetch(`${LOCAL_ENDPOINT}/unlockWallet`, { method: 'POST', body: JSON.stringify({ passphrase }) }).then(r => r.json());

    if (response.code !== 12) {
        return response.message;
    }

    return null;
}

export {
    getLastBlock,
    getAllBlocks
}