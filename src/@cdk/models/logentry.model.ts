import * as moment from 'moment';
import {Transform, Exclude} from 'class-transformer';

export class LogEntry {

    @Exclude({ toPlainOnly: true })
    id?: number;

    @Exclude({ toPlainOnly: true })
    action?: string;

    @Exclude({ toPlainOnly: true })
    objectId?: number;

    @Exclude({ toPlainOnly: true })
    @Transform(value => value ? value.format() : null, { toPlainOnly: true })
    @Transform(value => value ? moment(value) : null, { toClassOnly: true })
    loggedAt?: Date;

    objectClass?: string;

    valor?: string;

    data?: any;


    username?: string;

    constructor() {
        this.id = null;
        this.objectId = null;
        this.loggedAt = null;
        this.username = null;
        this.action = null;
        this.data = null;
        this.objectClass = null;
        this.valor = null;
    }
}
