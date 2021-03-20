import { Map } from 'immutable';
import { CryptoData, Doodle, ModalProps, Topic, Weather } from '../models';
import { DEFAULT_FREQUENCY } from '../util/Frequencies';

export interface AppState {
    weather?: Weather;
    weatherError?: any;
    doodles?: Doodle[];
    doodlesError?: any;
    topics: Topic[];
    currentTopic?: Topic;
    rssData: Map<string, any>;
    rssError: any;
    cryptoData?: CryptoData;
    cryptoDataError: any;
    cryptoFrequency: string;
    modalProps?: ModalProps;
}

export const initialAppState: AppState = {
    weather: undefined,
    weatherError: undefined,
    doodles: undefined,
    doodlesError: undefined,
    topics: [],
    currentTopic: undefined,
    rssData: Map(),
    rssError: undefined,
    cryptoData: undefined,
    cryptoDataError: undefined,
    cryptoFrequency: DEFAULT_FREQUENCY,
    modalProps: undefined,
};
