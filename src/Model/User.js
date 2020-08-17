export default class User {
    name = '';
    id = '';
    produceTransport = null;
    consumeTransport = null;


    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}