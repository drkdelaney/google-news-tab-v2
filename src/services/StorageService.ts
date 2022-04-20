import { Topic } from '../models';
const STORAGE_KEY = 'topics';

export function saveTopics(topics: Topic[]): void {
    // setStorage(STORAGE_KEY, topics);
}

export async function loadTopics(): Promise<Topic[]> {
    // return getStorage<Topic[]>(STORAGE_KEY);
    return new Promise((resolve, reject) => {resolve([])});
}

function setStorage(key: string, value: any): void {
    chrome.storage.sync.set({ [key]: value });
}

function getStorage<T>(key: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        chrome.storage.sync.get([key], (result: any) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else if (key in result) {
                resolve(result[key]);
            } else {
                reject(`${key} not found in result: ${result}`);
            }
        });
    });
}
