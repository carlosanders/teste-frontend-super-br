import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Subject} from 'rxjs';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as moment from 'moment';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {TimelineEvent} from './models/timeline-event.model';
import {Tarefa} from '@cdk/models';
import {DateEventGroup} from './models/date-event-group.model';
import {EventDialogComponent} from './event-dialog/event-dialog.component';

@Component({
    selector: 'processo-timeline',
    templateUrl: './processo-timeline.component.html',
    styleUrls: ['./processo-timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoTimelineComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    private _startExpanded: boolean = true;

    timeline: Map<number, DateEventGroup> = new Map<number, DateEventGroup>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.ProcessoTimelineAppState>,
        private _dialog: MatDialog
    ) {

        this._store.pipe(
            select(fromStore.getList),
            takeUntil(this._unsubscribeAll),
            filter((list) => !!list)
        ).subscribe((list: TimelineEvent[]) => {
            this._processYearEventGroup(list);
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    private _processYearEventGroup(timelineEvents: TimelineEvent[]): void {
        const yearsEventGroup = new Map<number, DateEventGroup>();
        const parentEventGroup = <DateEventGroup>{
            parent: null,
            groupType: null,
            groupKey: -1,
            timelineEvents: timelineEvents,
            tarefas: timelineEvents.reduce((tarefas: Map<number, {tarefa: Tarefa, timelineEvents: TimelineEvent[]}>, timelineEvent: TimelineEvent) => {
                if (!tarefas.has(timelineEvent.tarefa.id)) {
                    tarefas.set(timelineEvent.tarefa.id, {tarefa: timelineEvent.tarefa, timelineEvents: []});
                }

                const tarefaData = tarefas.get(timelineEvent.tarefa.id);
                tarefas.set(timelineEvent.tarefa.id, {
                    ...tarefaData,
                    timelineEvents: [
                        ...tarefaData.timelineEvents,
                        timelineEvent
                    ]
                });

                return tarefas;
            }, new Map<number, {tarefa: Tarefa, timelineEvents: TimelineEvent[]}>()),
            expanded: true,
            childs: yearsEventGroup,
            groupDate: timelineEvents[0]?.eventDate,
        };

        (timelineEvents).forEach((timelineEvent: TimelineEvent) => {
            if (!yearsEventGroup.has(timelineEvent.eventDate.year())) {
                yearsEventGroup.set(
                    timelineEvent.eventDate.year(),
                    {
                        groupKey: timelineEvent.eventDate.year(),
                        groupDate: timelineEvent.eventDate,
                        timelineEvents: [],
                        groupType: 'year',
                        tarefas: new Map<number, {}>(),
                        childs: new Map<number, DateEventGroup>(),
                        expanded: this._startExpanded,
                        parent: parentEventGroup
                    }
                )
            }

            const yearEventGroup = yearsEventGroup.get(timelineEvent.eventDate.year());

            const tarefasInSameYear = timelineEvents
                .filter((data) =>
                    (
                        data.eventDate.isSame(timelineEvent.eventDate, 'year')
                        || (data.eventDate.isBefore(timelineEvent.eventDate, 'year') && !data.tarefa.dataHoraConclusaoPrazo)
                    )
                    && !yearEventGroup.tarefas.has(data.tarefa.id))
                .reduce((tarefas: Tarefa[], data) => {
                    if (!tarefas.find((tarefa) => tarefa.id === data.tarefa.id)) {
                        tarefas.push(data.tarefa);
                    }

                    return tarefas;
                }, <Tarefa[]>[]);

            tarefasInSameYear
                .forEach((tarefa) => {
                    yearEventGroup.tarefas.set(tarefa.id, {tarefa: tarefa, timelineEvents: []});
                });

            const tarefaData = yearEventGroup.tarefas.get(timelineEvent.tarefa.id);

            yearEventGroup.tarefas.set(
                timelineEvent.tarefa.id,
                {
                    tarefa: timelineEvent.tarefa,
                    timelineEvents: [
                        ...tarefaData.timelineEvents,
                        timelineEvent
                    ]
                }
            );

            yearEventGroup.timelineEvents.push(timelineEvent);

            this._processMonthEventGroup(yearEventGroup, timelineEvent, timelineEvents);

            this.timeline = yearsEventGroup;
        });
    }

    private _processMonthEventGroup(yearEventGroup: DateEventGroup, timelineEvent: TimelineEvent, timelineEvents: TimelineEvent[]): void {

        if (!yearEventGroup.childs.has(timelineEvent.eventDate.month())) {
            yearEventGroup.childs.set(
                timelineEvent.eventDate.month(),
                {
                    groupKey: timelineEvent.eventDate.month(),
                    groupDate: timelineEvent.eventDate,
                    timelineEvents: [],
                    groupType: 'month',
                    tarefas: new Map<number, {}>(),
                    childs: new Map<number, DateEventGroup>(),
                    expanded: this._startExpanded,
                    parent: yearEventGroup
                }
            )
        }
        const monthEventGroup = yearEventGroup.childs.get(timelineEvent.eventDate.month());

        const tarefasInSameMonth = timelineEvents
            .filter((data) =>
                !monthEventGroup.tarefas.has(data.tarefa.id)
                && data.eventDate.isSameOrBefore(timelineEvent.eventDate, 'month')
                && timelineEvents.filter((afterEvents) => data.tarefa.id === afterEvents.tarefa.id && afterEvents.eventDate.isSameOrAfter(timelineEvent.eventDate, 'month')).length
            )
            .reduce((tarefas: Tarefa[], data) => {
                if (!tarefas.find((tarefa) => tarefa.id === data.tarefa.id)) {
                    tarefas.push(data.tarefa);
                }

                return tarefas;
            }, <Tarefa[]>[]);

        tarefasInSameMonth
            .forEach((tarefa) => {
                monthEventGroup.tarefas.set(tarefa.id, {tarefa: tarefa, timelineEvents: []});
            });

        const tarefaData = monthEventGroup.tarefas.get(timelineEvent.tarefa.id);
        monthEventGroup.tarefas.set(
            timelineEvent.tarefa.id,
            {
                tarefa: timelineEvent.tarefa,
                timelineEvents: [
                    ...tarefaData.timelineEvents,
                    timelineEvent
                ]
            }
        );

        monthEventGroup.timelineEvents.push(timelineEvent);

        monthEventGroup.tarefas = new Map<number, {tarefa?: Tarefa; timelineEvents?: TimelineEvent[]}>(
            [
                ...monthEventGroup.tarefas
            ].sort()
        );

        this._processWeekEventGroup(monthEventGroup, timelineEvent, timelineEvents);
    }

    private _processWeekEventGroup(monthEventGroup: DateEventGroup, timelineEvent: TimelineEvent, timelineEvents: TimelineEvent[]): void {

        const weekOfMonth = timelineEvent.eventDate.week() - moment(timelineEvent.eventDate).startOf('month').week() + 1
        if (!monthEventGroup.childs.has(weekOfMonth)) {
            monthEventGroup.childs.set(
                weekOfMonth,
                {
                    groupKey: weekOfMonth,
                    groupDate: timelineEvent.eventDate,
                    groupType: 'week',
                    timelineEvents: [],
                    tarefas: new Map<number, {}>(),
                    childs: new Map<number, DateEventGroup>(),
                    expanded: false,
                    parent: monthEventGroup
                }
            )
        }
        const weekEventGroup = monthEventGroup.childs.get(weekOfMonth);

        const tarefasInSameWeek = timelineEvents
            .filter((data) =>
                !weekEventGroup.tarefas.has(data.tarefa.id)
                && data.eventDate.isSameOrBefore(timelineEvent.eventDate, 'week')
                && timelineEvents.filter((afterEvents) => data.tarefa.id === afterEvents.tarefa.id && afterEvents.eventDate.isSameOrAfter(timelineEvent.eventDate, 'week')).length
            )
            .reduce((tarefas: Tarefa[], data) => {
                if (!tarefas.find((tarefa) => tarefa.id === data.tarefa.id)) {
                    tarefas.push(data.tarefa);
                }

                return tarefas;
            }, <Tarefa[]>[]);

        tarefasInSameWeek
            .forEach((tarefa) => {
                weekEventGroup.tarefas.set(tarefa.id, {tarefa: tarefa, timelineEvents: []});
            });

        const tarefaData = weekEventGroup.tarefas.get(timelineEvent.tarefa.id);

        weekEventGroup.tarefas.set(
            timelineEvent.tarefa.id,
            {
                tarefa: timelineEvent.tarefa,
                timelineEvents: [
                    ...tarefaData.timelineEvents,
                    timelineEvent
                ]
            }
        );

        weekEventGroup.timelineEvents.push(timelineEvent);

        weekEventGroup.tarefas = new Map<number, {tarefa?: Tarefa; timelineEvents?: TimelineEvent[]}>(
            [
                ...weekEventGroup.tarefas
            ].sort()
        )
    }

    toogleDateGroup(dateGroup: DateEventGroup): void {
        dateGroup.expanded = !dateGroup.expanded;
    }

    hasChildrenExpanded(dateEventGroup: DateEventGroup): boolean {
        return [...dateEventGroup.childs]
            .filter(([, dateGroupEvent]) => dateGroupEvent.expanded)
            .length > 0
    }

    hasPrevious(dateEventGroup: DateEventGroup, timelineEvents: TimelineEvent[]): boolean {
        return !!dateEventGroup.parent
            && !timelineEvents.filter((timelineEvent) => timelineEvent.firstEvent === true).length
    }

    onClickEventItem(tarefa: Tarefa, timelineEvents: TimelineEvent[]): void {
        this._dialog.open(EventDialogComponent, {
            data: {tarefa, timelineEvents},
            hasBackdrop: true,
            disableClose: false,
            closeOnNavigation: true,
        });
    }
}
