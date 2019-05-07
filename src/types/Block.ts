export interface Block {
    header: Header;
    body: Body;
}

interface Header {
    version: number;
    previousBlockHash: string;
    merkleTree: string;
    time: number;
    nonce: number;
    hash: string | null;
    gameType: number;
}

interface Body {
    coinbaseTransaction: any;
    transactions: any[];
}