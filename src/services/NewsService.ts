import { getLatLong, NewsURL } from '.';

export async function loadRSSFeed(topic: string) {
    const newsURL = new NewsURL(topic);

    switch (topic) {
        case 'WORLD':
        case 'NATION':
        case 'BUSINESS':
        case 'TECHNOLOGY':
        case 'ENTERTAINMENT':
        case 'SPORTS':
        case 'SCIENCE':
        case 'HEALTH':
            return fetch(newsURL.RSSNewsTopicURL);
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
            return fetch(newsURL.googleRSSLocal(location ?? ''));
        default:
            return fetch(newsURL.RSSNewsQueryURL);
    }
}
