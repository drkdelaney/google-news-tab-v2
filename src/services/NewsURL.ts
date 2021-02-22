export class NewsURL {
    private query: string;
    private rssAPIKey = 'uhvrh7g3aqgxmvoe3ehxnxl0r6rq8frx5wymysjn';

    constructor(q: string) {
        this.query = q;
    }

    public get RSSNewsTopicURL() {
        const url = new URL(this.RSSToJSON);
        url.searchParams.set('rss_url', this.googleRSSTopic);
        return url.href;
    }

    public get RSSNewsQueryURL() {
        const url = new URL(this.RSSToJSON);
        url.searchParams.set('rss_url', this.googleQuery);
        return url.href;
    }

    public googleRSSTopNews() {
        return `https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/news/rss&count=38&api_key=uhvrh7g3aqgxmvoe3ehxnxl0r6rq8frx5wymysjn`;
    }

    public googleRSSLocal(location: string) {
        return `https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/news/rss/headlines/section/geo/${location}&count=38&api_key=uhvrh7g3aqgxmvoe3ehxnxl0r6rq8frx5wymysjn`;
    }

    public openStreetMapUrl(lat: number, long: number) {
        return `https://nominatim.openstreetmap.org/search/${lat},${long}?format=json&addressdetails=1`;
    }

    private get googleQuery() {
        return `https://news.google.com/news/rss?q=${this.query}`;
    }

    private get googleRSSTopic() {
        return `https://news.google.com/news/rss/headlines/section/topic/${this.query}`;
    }

    private get RSSToJSON() {
        const url = new URL('https://api.rss2json.com/v1/api.json?count=38');
        url.searchParams.set('api_key', this.rssAPIKey);
        return url.href;
    }
}
