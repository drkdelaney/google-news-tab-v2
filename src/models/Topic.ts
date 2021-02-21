import shortid from 'shortid';

export class Topic {
    public id: string;
    public value: string;

    constructor(v: string) {
        this.id = shortid.generate();
        this.value = v;
    }
}
