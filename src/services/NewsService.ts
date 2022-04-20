import { getLatLong, NewsURL } from '.';
import { Topic } from '../models';

export async function loadRSSFeed(topic: Topic) {
    const newsURL = new NewsURL(topic.query);

    switch (topic.query) {
        case 'WORLD':
        case 'NATION':
        case 'BUSINESS':
        case 'TECHNOLOGY':
        case 'ENTERTAINMENT':
        case 'SPORTS':
        case 'SCIENCE':
        case 'HEALTH':
            return handleRequest(fetch(newsURL.RSSNewsTopicURL));
        case 'TOP_NEWS':
            return handleRequest(fetch(newsURL.googleRSSTopNews()));
        case 'LOCAL':
            const [lat, long] = await getLatLong();
            const response = await fetch(newsURL.openStreetMapUrl(lat, long));
            const json = await response.json();
            let location;
            if (json.length > 0 && json[0].address) {
                const neighborhood = json[0].address.neighbourhood;
                const city = json[0].address.city;
                const state = json[0].address.state;
                const cityOrNeighborhood = `${
                    city
                        ? city.toLowerCase()
                        : neighborhood
                        ? neighborhood.toLowerCase()
                        : ''
                }`;
                location = `${
                    cityOrNeighborhood ? cityOrNeighborhood + ',' : ''
                }${state ? state.toLowerCase() : ''}`;
            }
            return handleRequest(fetch(newsURL.googleRSSLocal(location ?? '')));
        default:
            return handleRequest(fetch(newsURL.RSSNewsQueryURL));
    }
}

async function handleRequest(request: Promise<Response>) {
    try {
        const response = await request;
        const { items } = await response.json();
        return items;
    } catch (e: any) {
        throw new Error(e);
    }
}
