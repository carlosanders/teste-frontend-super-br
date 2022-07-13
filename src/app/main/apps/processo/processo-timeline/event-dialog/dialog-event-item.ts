import {TimelineEvent} from '../models/timeline-event.model';
import {InjectionToken} from '@angular/core';

export abstract class DialogEventItem {
    public static supports(timelineEvent: TimelineEvent): boolean {
        return false;
    };

    public static order(): number {
        return 999;
    };
}


export const EVENT_ITEM_DIALOG_DATA = new InjectionToken('EVENT_ITEM_DIALOG_DATA');
