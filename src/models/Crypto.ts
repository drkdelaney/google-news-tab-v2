export interface CryptoData {
    iso: string;
    name: string;
    slug: string;
    ingestionStart: string;
    interval: string;
    entries: Array<[number, number]>;
}

export interface CryptoResponse {
    statusCode: number;
    message: string;
    data: CryptoData;
}
