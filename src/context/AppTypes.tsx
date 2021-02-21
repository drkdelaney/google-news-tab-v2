import { ActionType, Doodle, Topic, Weather } from '../models';

export type Action =
    | { type: ActionType.SET_CURRENT_WEATHER; weather: Weather }
    | { type: ActionType.SET_CURRENT_WEATHER_ERROR; error: any }
    | { type: ActionType.SET_DOODLES; doodles: Doodle[] }
    | { type: ActionType.SET_DOODLES_ERROR; error: any }
    | { type: ActionType.ADD_TOPIC; topic: Topic };

export type Dispatch = (action: Action) => void;
