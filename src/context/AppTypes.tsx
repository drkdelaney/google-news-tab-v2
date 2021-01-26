import { ActionType, Weather } from '../models';

export type Action =
    | { type: ActionType.SET_CURRENT_WEATHER; weather: Weather }
    | { type: ActionType.ADD_TOPIC };

export type Dispatch = (action: Action) => void;
