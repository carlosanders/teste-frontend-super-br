import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subject} from 'rxjs';
import {isSameDay, isSameMonth, startOfDay} from 'date-fns';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarMonthViewDay
} from 'angular-calendar';

import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {cdkAnimations} from '@cdk/animations';

import {CalendarService} from 'app/main/apps/calendario/calendar.service';
import {CalendarEventModel} from 'app/main/apps/calendario/event.model';
import {CalendarEventFormDialogComponent} from 'app/main/apps/calendario/event-form/event-form.component';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as moment from 'moment';
import {CdkUtils} from '../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from "../../../store";

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CalendarComponent implements OnInit, OnDestroy {
    actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;
    events: CalendarEvent[];
    refresh: Subject<any> = new Subject();
    selectedDay: any;
    view: string;
    viewDate: Date;
    locale = 'br';
    routerState: any;

    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService,
        private _store: Store<fromStore.CalendarioAppState>,
    ) {
        // Set the defaults
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this._store
                .pipe(
                    select(fromStore.getEvents(this.routerState.params['contextHandle'] || 'evento')),
                    takeUntil(this._unsubscribeAll)
                )
                .subscribe((events: CalendarEvent[]) => {
                this.events = events;
            });
        });

        this.actions = [
            {
                label: '<i class="material-icons s-16">editar</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.editEvent('edit', event);
                }
            },
            {
                label: '<i class="material-icons s-16">apagar</i>',
                onClick: ({event}: { event: CalendarEvent }): void => {
                    this.deleteEvent(event);
                }
            }
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadTarefas({reset: true}));
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set events
     */
    setEvents(): void {
        this.events = this._calendarService.events.map((item) => {
            item.actions = this.actions;
            return new CalendarEventModel(item);
        });
    }

    /**
     * Before View Renderer
     *
     * @param header
     * @param body
     */
    beforeMonthViewRender({header, body}): void {
        /**
         * Get the selected day
         */
        const _selectedDay = body.find(_day => _day.date.getTime() === this.selectedDay.date.getTime());

        if (_selectedDay) {
            /**
             * Set selected day style
             *
             * @type {string}
             */
            _selectedDay.cssClass = 'cal-selected';
        }

    }

    /**
     * Day clicked
     *
     * @param day
     */
    dayClicked(day: CalendarMonthViewDay): void {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next(true);
    }

    /**
     * Event times changed
     * Event dropped or resized
     *
     * @param event
     * @param newStart
     * @param newEnd
     */
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next(true);
    }

    /**
     * Delete Event
     *
     * @param event
     */
    deleteEvent(event): void {
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                message: 'Deseja realmente apagar?'
            },
            disableClose: false
        });

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Edit Event
     *
     * @param action
     * @param event
     */
    editEvent(action: string, event: CalendarEvent): void {
        if (this.routerState.params['contextHandle'] !== 'evento') {
            return;
        }
        const eventIndex = this.events.indexOf(event);
        const operacaoId = CdkUtils.makeId();

        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                event: event,
                action: action
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                const tarefa = this.events[eventIndex].meta.tarefa;

                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':
                        const changes = {
                            dataHoraInicioPrazo: moment(formData.getRawValue().start).format('YYYY-MM-DDTHH:mm:ss'),
                            dataHoraFinalPrazo: moment(formData.getRawValue().end).format('YYYY-MM-DDTHH:mm:ss'),
                            localEvento: formData.getRawValue().meta.location,
                            observacao: formData.getRawValue().meta.notes
                        };

                        this._store.dispatch(new fromStore.SaveTarefa({
                            tarefa: tarefa,
                            changes: changes,
                            operacaoId: operacaoId
                        }));
                        break;
                    /**
                     * Delete
                     */
                    case 'delete':
                        this._store.dispatch(new fromStore.DeleteTarefa(tarefa.id));
                        this._store.dispatch(new fromStore.DeleteTarefa({
                            tarefaId: tarefa.id,
                            operacaoId: operacaoId,
                        }));

                        break;
                }
            });
    }

    /**
     * Add Event
     */
    addEvent(): void {
        this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                date: this.selectedDay.date
            }
        });
        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }
                const newEvent = response.getRawValue();
                newEvent.actions = this.actions;
                this.events.push(newEvent);
                this.refresh.next(true);
            });
    }
}


