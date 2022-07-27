import {Transform} from 'class-transformer';

export class EventType {

    name?: string;
    action?: string;
    objectClass?: string;
    objectId?: number;

    @Transform(value => value ? JSON.parse(value) : {}, {toClassOnly: true})
    objectContext?: any;

    constructor() {
        this.name = null;
        this.action = null;
        this.objectContext = null;
        this.objectClass = null;
        this.objectId = null;
    }
}
