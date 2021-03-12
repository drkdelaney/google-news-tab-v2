import shortid from 'shortid';

export class Topic {
    /**
     * generated id for the topic
     */
    public id: string;
    /**
     * the value to be displayed
     */
    public value: string;
    /**
     * The query for the topic. If none is provided the value will be used.
     */
    public query: string;

    constructor(v: string, q?: string) {
        this.id = shortid.generate();
        this.value = v;
        this.query = q ?? encodeURI(v.toLowerCase());
    }
}
