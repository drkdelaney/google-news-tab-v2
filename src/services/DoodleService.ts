import { Doodle, Response } from '../models';

const googleDoodleURL = `https://3esokhxlqe.execute-api.us-east-1.amazonaws.com/dev/doodles`;
const apiKey = 'xSM1rvLyj1C2WP4Y1FS18CoEBqvu8yO9jikwslP4';

export async function loadDoodles(): Promise<Doodle[]> {
    const now = new Date();
    const currentDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
    console.log(currentDate.getTime());
    try {
        const headers = new Headers();
        headers.set('x-api-key', apiKey);
        const doodleResponse = await fetch(
            `${googleDoodleURL}?pubDate=${currentDate.getTime()}`
        );
        const { items } = (await doodleResponse.json()) as Response<Doodle>;
        return items;
    } catch (e) {
        throw new Error(e);
    }
}
