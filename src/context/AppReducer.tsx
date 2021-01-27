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
        case ActionType.SET_DOODLES: {
            return {
                ...state,
                doodles: action.doodles,
            };
        }
        default: {
            throw new Error(`Undefined action type`);
        }
    }
}
