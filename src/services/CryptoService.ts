import { DateTime } from 'luxon';
import CryptoISOMap from '../crypto/CryptoISOMappings.json';
import { CryptoData, CryptoResponse } from '../models';

const coinDeskUrl = 'https://production.api.coindesk.com/v2/price/values';

interface json {
    [key: string]: string;
}

export function hasCryptoISO(search: string): boolean {
    const cryptoObject = CryptoISOMap as json;
    return search.toUpperCase() in cryptoObject;
}

export async function loadCryptoData(search: string): Promise<CryptoData> {
    const cryptoObject = CryptoISOMap as json;
    const cryptoISO = cryptoObject[search.toUpperCase()];
    const url = new URL(`${coinDeskUrl}/${cryptoISO}`);
    const now = DateTime.utc();
    const startDate = now
        .minus({ days: 1 })
        .set({ second: 0, millisecond: 0 })
        .toISO({
            suppressSeconds: true,
            suppressMilliseconds: true,
            includeOffset: false,
        });
    const endDate = now.set({ second: 0, millisecond: 0 }).toISO({
        suppressSeconds: true,
        suppressMilliseconds: true,
        includeOffset: false,
    });
    url.searchParams.set('start_date', startDate);
    url.searchParams.set('end_date', endDate);

    try {
        const response = await fetch(url.href);
        const { data } = (await response.json()) as CryptoResponse;
        return data;
    } catch (e) {
        throw new Error(e);
    }
}
