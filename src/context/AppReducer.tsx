import { ActionType } from '../models';
import { saveTopics } from '../services/StorageService';
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
            const topics = [...state.topics, action.topic];
            saveTopics(topics);
            return {
                ...state,
                topics,
            };
        }
        case ActionType.SET_CURRENT_TOPIC: {
            return {
                ...state,
                currentTopic: action.topic,
            };
        }
        case ActionType.SET_RSS_DATA: {
            return {
                ...state,
                rssData: state.rssData.set(action.key, action.data),
            };
        }
        case ActionType.SET_RSS_ERROR: {
            return {
                ...state,
                rssError: action.error,
            };
        }
        case ActionType.SET_CRYPTO_DATA: {
            return {
                ...state,
                cryptoData: action.cryptoData,
            };
        }
        case ActionType.SET_CRYPTO_DATA_ERROR: {
            return {
                ...state,
                cryptoDataError: action.error,
            };
        }
        case ActionType.RESET_CRYPTO_DATA: {
            return {
                ...state,
                cryptoData: undefined,
            };
        }
        case ActionType.SET_TOPICS: {
            saveTopics(action.topics);
            return {
                ...state,
                topics: action.topics,
            };
        }
        case ActionType.SET_CRYPTO_FREQUENCY: {
            return {
                ...state,
                cryptoFrequency: action.frequency,
            };
        }
        case ActionType.REMOVE_TOPIC: {
            const topics = state.topics.filter((t) => t.id !== action.key);
            saveTopics(topics);
            return {
                ...state,
                topics,
            };
        }
        case ActionType.OPEN_MODAL: {
            return {
                ...state,
                modalProps: action.data,
            };
        }
        default: {
            throw new Error(`Undefined action type`);
        }
    }
}
