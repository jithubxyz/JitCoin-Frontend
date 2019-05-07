export interface Block {
    header: Body;
    body: Header;
}

interface Body {
    version: number;
    previousBlockHash: string;
    merkleTree: string;
    time: number;
    nonce: number;
    hash: string | null;
    gameType: number;
}

interface Header {
    coinbaseTransaction: any;
    transactions: any[];
}