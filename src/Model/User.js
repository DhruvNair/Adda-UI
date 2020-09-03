export class User {
    name = '';
    id = '';
    produceTransport = null;
    consumeTransport = null;
    producer = null;
    stream = null;


    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

export class OtherUser {
    name = '';
    id = '';
    consumer = null;
    stream = null;

    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}