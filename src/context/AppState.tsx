import { Weather } from '../models';

export interface AppState {
    weather?: Weather;
}

export const initialAppState: AppState = {
    weather: undefined,
};
