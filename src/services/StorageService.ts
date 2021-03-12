import { Topic } from '../models';

export function saveTopics(topics: Topic[]): void {
    localStorage.setItem('topics', JSON.stringify(topics));
}

export function loadTopics(): Topic[] {
    const jsonTopics = localStorage.getItem('topics');
    return JSON.parse(jsonTopics ?? '[]') as Topic[];
}
