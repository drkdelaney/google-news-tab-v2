import { ActionType, CryptoData, Doodle, Topic, Weather } from '../models';

export type Action =
    | { type: ActionType.ADD_TOPIC; topic: Topic }
    | { type: ActionType.RESET_CRYPTO_DATA }
    | { type: ActionType.SET_CRYPTO_DATA_ERROR; error: any }
    | { type: ActionType.SET_CRYPTO_DATA; cryptoData: CryptoData }
    | { type: ActionType.SET_CRYPTO_FREQUENCY; frequency: string }
    | { type: ActionType.SET_CURRENT_TOPIC; topic: Topic }
    | { type: ActionType.SET_CURRENT_WEATHER_ERROR; error: any }
    | { type: ActionType.SET_CURRENT_WEATHER; weather: Weather }
    | { type: ActionType.SET_DOODLES_ERROR; error: any }
    | { type: ActionType.SET_DOODLES; doodles: Doodle[] }
    | { type: ActionType.SET_RSS_DATA; data: any; key: string }
    | { type: ActionType.SET_RSS_ERROR; error: any }
    | { type: ActionType.SET_TOPICS; topics: Topic[] };

export type Dispatch = (action: Action) => void;
