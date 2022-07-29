import {Transform, Type} from 'class-transformer';
import * as moment from 'moment';
import {Tarefa, Usuario} from '@cdk/models';
import {EventType} from './event-type.model';

export class TimelineEvent {

    message?: string;
    lastEvent?: boolean;
    firstEvent?: boolean;

    @Transform(value => value ? value.format() : null, {toPlainOnly: true})
    @Transform(value => value ? moment(value) : null, {toClassOnly: true})
    eventDate?: moment.Moment;

    @Type(() => Usuario)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    usuario?: Usuario;

    @Type(() => Tarefa)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    tarefa?: Tarefa;

    @Type(() => EventType)
    @Transform(value => value ? value.id : null, {toPlainOnly: true})
    typeEvent?: EventType;

    @Transform(value => value ? JSON.parse(value) : {}, {toClassOnly: true})
    objectContext?: any;

    constructor() {
        this.message = null;
        this.eventDate = null;
        this.usuario = null;
        this.tarefa = null;
        this.objectContext = null;
        this.typeEvent = null;
        this.lastEvent = null;
        this.firstEvent = null;
    }
}
