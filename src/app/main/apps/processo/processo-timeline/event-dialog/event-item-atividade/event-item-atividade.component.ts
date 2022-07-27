import {
    ChangeDetectionStrategy,
    Component, HostBinding, Inject,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {TimelineEvent} from '../../models/timeline-event.model';
import {DialogEventItem, EVENT_ITEM_DIALOG_DATA} from '../dialog-event-item';

@Component({
    selector   : 'event-item-atividade',
    templateUrl: './event-item-atividade.component.html',
    styleUrls  : ['./event-item-atividade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EventItemAtividadeComponent extends DialogEventItem
{
    @HostBinding('class') elementClass: string = 'event-item-dialog';

    constructor(@Inject(EVENT_ITEM_DIALOG_DATA) public timelineEvent: TimelineEvent) {
        super();
    }

    public static supports(timelineEvent: TimelineEvent): boolean {
        return timelineEvent.typeEvent.objectClass === 'SuppCore\\AdministrativoBackend\\Api\\V1\\DTO\\Atividade';
    }

    public static order(): number {
        return 1;
    }
}
