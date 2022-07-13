import {
    Component, EventEmitter, HostBinding,
    Input, OnInit, Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {TimelineEvent} from '../models/timeline-event.model';
import {DateEventGroup} from '../models/date-event-group.model';
import {Tarefa} from '@cdk/models';

@Component({
    selector   : 'date-group',
    templateUrl: './date-group.component.html',
    styleUrls  : ['./date-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DateGroupComponent implements OnInit
{
    @HostBinding('class') elementClass: string = '';
    @Input() dateEventGroup: DateEventGroup;
    @Output('toogleDateGroup') toogleDateGroupEmiter: EventEmitter<DateEventGroup> = new EventEmitter<DateEventGroup>();
    @Output() clickEventItem: EventEmitter<{tarefa: Tarefa, timelineEvents: TimelineEvent[]}> = new EventEmitter<{tarefa: Tarefa; timelineEvents: TimelineEvent[]}>();

    ngOnInit(): void {
        if (this.dateEventGroup?.groupType) {
            this.elementClass = `${this.dateEventGroup.groupType}-date-group`;
        }
    }

    hasPrevious(timelineEvents: TimelineEvent[]): boolean {
        return !!this.dateEventGroup.parent
            && !timelineEvents.filter((timelineEvent) => timelineEvent.firstEvent === true).length
    }

    toogleDateGroup(): void {
        this.toogleDateGroupEmiter.emit(this.dateEventGroup);
    }

    onClickEventItem(tarefa: Tarefa, timelineEvents: TimelineEvent[]): void {
        this.clickEventItem.emit({tarefa, timelineEvents});
    }

}
