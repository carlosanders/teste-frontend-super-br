import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';
import {TimelineEvent} from '../models/timeline-event.model';
import {cdkAnimations} from '@cdk/animations';
import {Tarefa} from '@cdk/models';
import {ComponentPortal} from '@angular/cdk/portal';
import {EventItemDefaultComponent} from './event-item-default/event-item-default.component';
import {EVENT_ITEM_DIALOG_DATA} from './dialog-event-item';
import {EventItemAtividadeComponent} from './event-item-atividade/event-item-atividade.component';

@Component({
    selector   : 'event-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrls  : ['./event-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EventDialogComponent
{
    tarefa: Tarefa;
    timelineEvents: TimelineEvent[] = [];

    readonly dialogEventItems: any[] = [
        EventItemDefaultComponent,
        EventItemAtividadeComponent,
    ];

    constructor(
        private _dialogRef: MatDialogRef<EventDialogComponent>,
        private _viewContainerRef: ViewContainerRef,
        private _injector: Injector,
        @Inject(MAT_DIALOG_DATA) {tarefa, timelineEvents}
    ) {
        this.tarefa = tarefa;
        this.timelineEvents = timelineEvents;
    }

    getComponent(timelineEvent: TimelineEvent): ComponentPortal<EventItemDefaultComponent> {
        const component = this.dialogEventItems
            .sort((componentA, componentB) => componentA.order() - componentB.order())
            .find((component) => component.supports(timelineEvent));

        const injector = Injector.create({
            providers: [
                {
                    provide: EVENT_ITEM_DIALOG_DATA, useValue: timelineEvent
                }
            ],
            parent: this._injector
        });

        return new ComponentPortal(component , null, injector);
    }


    fechar(): void {
        this._dialogRef.close();
    }

}
