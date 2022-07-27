import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input, Output,
    ViewEncapsulation
} from '@angular/core';
import {Tarefa} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';
import {TimelineEvent} from '../models/timeline-event.model';
import {DateEventGroup} from '../models/date-event-group.model';

@Component({
    selector   : 'event-list',
    templateUrl: './event-list.component.html',
    styleUrls  : ['./event-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EventListComponent
{
    @Input() dateGroupEvent: DateEventGroup;
    @Output() clickEventItem: EventEmitter<{tarefa: Tarefa, timelineEvents: TimelineEvent[]}> = new EventEmitter<{tarefa: Tarefa; timelineEvents: TimelineEvent[]}>();

    onClickEventItem(tarefa: Tarefa, timelineEvents: TimelineEvent[]): void {
        this.clickEventItem.emit({tarefa, timelineEvents});
    }
}
