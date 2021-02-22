import { Map } from 'immutable';
import { Doodle, Topic, Weather } from '../models';

export interface AppState {
    weather?: Weather;
    weatherError?: any;
    doodles?: Doodle[];
    doodlesError?: any;
    topics: Topic[];
    currentTopic?: Topic;
    rssData: Map<string, any>;
    rssError: any;
}

const defaultTopics = [
    new Topic('Top News', 'TOP_NEWS'),
    new Topic('U.S.', 'NATION'),
    new Topic('World', 'WORLD'),
    new Topic('Local', 'LOCAL'),
    new Topic('Business', 'BUSINESS'),
    new Topic('Technology', 'TECHNOLOGY'),
    new Topic('Entertainment', 'ENTERTAINMENT'),
    new Topic('Sports', 'SPORTS'),
    new Topic('Science', 'SCIENCE'),
    new Topic('Health', 'HEALTH'),
];

export const initialAppState: AppState = {
    weather: undefined,
    weatherError: undefined,
    doodles: undefined,
    doodlesError: undefined,
    topics: defaultTopics,
    currentTopic: undefined,
    rssData: Map(),
    rssError: undefined,
};
