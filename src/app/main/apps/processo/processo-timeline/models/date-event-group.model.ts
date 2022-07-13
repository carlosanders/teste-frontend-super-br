import * as moment from 'moment';
import {TimelineEvent} from './timeline-event.model';
import {Tarefa} from '@cdk/models';

export class DateEventGroup {

    groupDate?: moment.Moment;
    groupKey?: number;
    groupType: GroupType;
    childs?: Map<number, DateEventGroup>;
    tarefas?: Map<number, {tarefa?: Tarefa, timelineEvents?: TimelineEvent[]}>;
    timelineEvents?: TimelineEvent[];
    parent?: DateEventGroup;
    expanded?: boolean;


    constructor() {
        this.groupDate = null;
        this.timelineEvents = [];
        this.groupKey = null;
        this.groupType = null;
        this.childs = new Map<number, DateEventGroup>();
        this.tarefas = new Map<number, {}>();
        this.expanded = null;
        this.parent = null;
    }
}

export type GroupType = 'year' | 'month' | 'week' | null;
