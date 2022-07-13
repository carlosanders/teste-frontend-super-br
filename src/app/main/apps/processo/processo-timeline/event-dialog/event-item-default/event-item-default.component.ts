import {
    ChangeDetectionStrategy,
    Component, HostBinding, Inject,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {TimelineEvent} from '../../models/timeline-event.model';
import {EVENT_ITEM_DIALOG_DATA, DialogEventItem} from '../dialog-event-item';

@Component({
    selector   : 'event-item-default',
    templateUrl: './event-item-default.component.html',
    styleUrls  : ['./event-item-default.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EventItemDefaultComponent extends DialogEventItem
{
    @HostBinding('class') elementClass: string = 'event-item-dialog';

    constructor(@Inject(EVENT_ITEM_DIALOG_DATA) public timelineEvent: TimelineEvent) {
        super();
    }

    public static supports(timelineEvent: TimelineEvent): boolean {
        return true;
    }

    public static order(): number {
        return 999;
    }
}
