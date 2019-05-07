import { Block } from '../types/Block';

const LOCAL_ENDPOINT = 'http://localhost:7179';

interface ClientResponse<T> {
    message: string;
    code: number;
    data: T | null;
}

export async function getLastBlock() {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    const response: ClientResponse<Block> = await fetch(`${LOCAL_ENDPOINT}/lastBlock`, { method: 'POST', headers: requestHeaders, mode: 'cors', body: JSON.stringify({}) }).then(r => r.json());

    if (response.code === 0 && response.data !== null) {
        return response.data;
    }

    return null;
}

export async function getBalance() {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const response: ClientResponse<number> = await fetch(`${LOCAL_ENDPOINT}/balance`, { method: 'POST', mode: 'cors', headers: requestHeaders, body: JSON.stringify({}) }).then(r => r.json());

    if (response.code === 0) {
        return response.data;
    }

    return null;
}

export async function getBlockByHash(hash: string) {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    const response: ClientResponse<Block> = await fetch(`${LOCAL_ENDPOINT}/blockByHash`, { method: 'POST', body: JSON.stringify({ hash }), mode: 'cors', headers: requestHeaders }).then(r => r.json());

    if (response.code === 0) {
        return response.data;
    }

    return null;
}

export async function getAllBlocks(lastBlock: Block) {
    const blocks: Array<Block> = [lastBlock];
    
    if (!lastBlock.header) {
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

export async function createWallet(passphrase: string) {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    const response: ClientResponse<any> = await fetch(`${LOCAL_ENDPOINT}/createWallet`, { method: 'POST', body: JSON.stringify({passphrase}), mode: 'cors', headers: requestHeaders }).then(r => r.json());

    if (response.code !== 12) {
        return response.message;
    }

    return null;
}

export async function unlockWallet(passphrase: string) {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    const response: ClientResponse<any> = await fetch(`${LOCAL_ENDPOINT}/unlockWallet`, { method: 'POST', body: JSON.stringify({ passphrase: passphrase }), mode: 'cors', headers: requestHeaders }).then(r => r.json());

    if (response.code !== 12) {
        return response.message;
    }

    return null;
}

export async function mineBlock() {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    const response: ClientResponse<any> = await fetch(`${LOCAL_ENDPOINT}/mine`, { method: 'POST', mode: 'cors', body: JSON.stringify({}), headers: requestHeaders }).then(r => r.json());

    if (response.code !== 0) {
        throw new Error(response.message);
    }

    return response.message;
}

export async function placeBet(inputAmount: number, outputAmount: number) {
    const body = JSON.stringify({ inputAmount, outputAmount });

    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    const response: ClientResponse<any> = await fetch(`${LOCAL_ENDPOINT}/placeBet`, { method: 'POST', mode: 'cors', body, headers: requestHeaders }).then(r => r.json());

    if (response.message) {
        throw new Error(response.message);
    }

    return response.message;
}