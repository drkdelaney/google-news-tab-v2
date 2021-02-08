import { GridPoints, Weather } from '../models';
import { getLatLong } from './LocationService';

export async function loadCurrentWeather() {
    const weatherGovBase = `https://api.weather.gov/points`;
    try {
        const [lat, long]: [number, number] = await getLatLong();
        const gridPointResponse: Response = await fetch(
            `${weatherGovBase}/${lat.toFixed(4)},${long.toFixed(4)}`
        );
        const gridPoints: GridPoints = await gridPointResponse.json();
        const weatherResponse: Response = await fetch(
            gridPoints?.properties?.forecast
        );
        const weather: Weather = await weatherResponse.json();
        return weather;
    } catch (e) {
        throw new Error(e);
    }
}
