import { Doodle, Weather } from '../models';

export interface AppState {
    weather?: Weather;
    doodles?: Doodle[];
}

export const initialAppState: AppState = {
    weather: undefined,
    doodles: undefined,
};
