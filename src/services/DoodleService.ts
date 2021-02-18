import { Doodle, Response } from '../models';

const googleDoodleURL = `https://3esokhxlqe.execute-api.us-east-1.amazonaws.com/dev/doodles`;
const apiKey = 'xSM1rvLyj1C2WP4Y1FS18CoEBqvu8yO9jikwslP4';

export async function loadDoodles(): Promise<Doodle[]> {
    const now = new Date();
    const currentDate = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
    try {
        const doodleURL = new URL(googleDoodleURL);
        doodleURL.searchParams.set('apiKey', apiKey);
        doodleURL.searchParams.set('pubDate', `${currentDate}`);
        const doodleResponse = await fetch(doodleURL.href);
        const { items } = (await doodleResponse.json()) as Response<Doodle>;
        return items;
    } catch (e) {
        throw new Error(e);
    }
}
