import { Doodle, Weather } from '../models';

export interface AppState {
    weather?: Weather;
    weatherError?: any;
    doodles?: Doodle[];
    doodlesError?: any;
}

export const initialAppState: AppState = {
    weather: undefined,
    weatherError: undefined,
    doodles: undefined,
    doodlesError: undefined,
};
