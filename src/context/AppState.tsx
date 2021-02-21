import { Doodle, Topic, Weather } from '../models';

export interface AppState {
    weather?: Weather;
    weatherError?: any;
    doodles?: Doodle[];
    doodlesError?: any;
    topics: Topic[];
}

const defaultTopics = [
    new Topic('Top News'),
    new Topic('U.S.'),
    new Topic('World'),
    new Topic('Local'),
    new Topic('Business'),
    new Topic('Technology'),
    new Topic('Entertainment'),
    new Topic('Sports'),
    new Topic('Science'),
    new Topic('Health'),
];

export const initialAppState: AppState = {
    weather: undefined,
    weatherError: undefined,
    doodles: undefined,
    doodlesError: undefined,
    topics: defaultTopics,
};
