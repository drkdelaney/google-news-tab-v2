import { GridPoints, Weather } from '../models';
import { getLatLong } from './LocationService';

export async function getCurrentWeather() {
    const weatherGovBase = `https://api.weather.gov/points`;
    try {
        const [lat, long]: [number, number] = await getLatLong();
        const headers: Headers = new Headers();
        headers.set('User-Agent', '(News Tab), derek.e.delaney@gmail.com');
        const gridPointResponse: Response = await fetch(
            `${weatherGovBase}/${lat.toFixed(4)},${long.toFixed(4)}`,
            { headers }
        );
        const gridPoints: GridPoints = await gridPointResponse.json();
        const weatherResponse: Response = await fetch(
            gridPoints?.properties?.forecast
        );
        const weather: Weather = await weatherResponse.json();
        return weather;
    } catch (e) {
        console.error(e);
    }
}
