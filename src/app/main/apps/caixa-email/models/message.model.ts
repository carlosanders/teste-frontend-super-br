import {Transform, Type} from 'class-transformer';
import * as moment from 'moment';
import {Folder} from './folder.model';
import {Address} from './address.model';
import {Attachment} from './attachment.model';

export class Message {

    id?: number;
    uuid?: string;
    subject?: string;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    date?: moment.Moment;

    htmlBody?: string;
    readed?: boolean;

    @Type(() => Folder)
    folder?: Folder;

    @Type(() => Address)
    from?: Address;

    @Type(() => Address)
    to?: Address[];

    @Type(() => Address)
    cc?: Address[];

    @Type(() => Address)
    bcc?: Address[];

    @Type(() => Attachment)
    attachments?: Attachment[];

    constructor() {
        this.id = null;
        this.uuid = null;
        this.subject = null;
        this.date = null;
        this.htmlBody = null;
        this.readed = null;
        this.folder = null;
        this.from = null;
        this.to = [];
        this.cc = [];
        this.bcc = [];
        this.attachments = [];
    }
}
