import { ActionType } from '../models';
import { AppState } from './AppState';
import { Action } from './AppTypes';

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case ActionType.SET_CURRENT_WEATHER: {
            return {
                ...state,
                weather: action.weather,
            };
        }
        case ActionType.SET_CURRENT_WEATHER_ERROR: {
            return {
                ...state,
                weatherError: action.error,
            };
        }
        case ActionType.SET_DOODLES: {
            return {
                ...state,
                doodles: action.doodles,
            };
        }
        case ActionType.SET_DOODLES_ERROR: {
            return {
                ...state,
                doodlesError: action.error,
            };
        }
        case ActionType.ADD_TOPIC: {
            return {
                ...state,
                topics: [...state.topics, action.topic],
            };
        }
        default: {
            throw new Error(`Undefined action type`);
        }
    }
}
