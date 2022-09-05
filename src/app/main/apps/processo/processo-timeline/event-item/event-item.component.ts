import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, ElementRef, HostBinding,
    Input, OnDestroy, OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Tarefa, Usuario} from '@cdk/models';
import {cdkAnimations} from '@cdk/animations';
import {TimelineEvent} from '../models/timeline-event.model';
import {DateEventGroup} from '../models/date-event-group.model';
import {Subject} from 'rxjs';
import ProcessoTimelineBridge from '../services/processo-timeline.bridge';

@Component({
    selector   : 'event-item',
    templateUrl: './event-item.component.html',
    styleUrls  : ['./event-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EventItemComponent implements OnInit, AfterViewInit, OnDestroy
{
    @HostBinding('class') elementClass: string = 'event-item';
    @ViewChild('dot', {static: false}) dot: ElementRef;

    @Input() dateEventGroup: DateEventGroup;
    @Input() tarefa: Tarefa;
    @Input() timelineEvents: TimelineEvent[] = [];

    parentDot: HTMLDivElement;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _host: ElementRef,
        private _processoTimelineBridge: ProcessoTimelineBridge
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.parentDot = this._getParentDotElement();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getParentDotConnectorStyle(): object {
        this.parentDot = this._getParentDotElement();
        const borderWidth = 1;
        const off1 = this._getOffset(this.parentDot);
        const off2 = this._getOffset(this.dot.nativeElement);

        const x1 = off1.left + off1.width/2;
        const y1 = off1.top + off1.height/2;

        const x2 = off2.left + off2.width/2;
        const y2 = off2.top;

        const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));

        const cx = ((x1 + x2) / 2) - (length / 2);
        const cy = ((y1 + y2) / 2) - (borderWidth / 2);

        const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

        return {
            'left.px': cx,
            'top.px': cy,
            'width.px': length,
            '-moz-transform': `rotate(${angle}deg)`,
            '-webkit-transform': `rotate(${angle}deg)`,
            '-o-transform': `rotate(${angle}deg)`,
            '-ms-transform': `rotate(${angle}deg)`,
            'transform': `rotate(${angle}deg)`,
            'position': 'absolute',
            'borderStyle': 'solid',
            'borderWidth.px': borderWidth,
            'heightWidth.px': borderWidth,
            'border-color': this._processoTimelineBridge.getTarefaHexColor(this.tarefa)
        };
    }

    getSiglaUsuario(usuario: Usuario): string {
        return usuario.nome
            .split(' ')
            .filter((nome) => nome.length > 3)
            .map((nome) => nome[0])
            .join('');
    }

    hasPrevious(): boolean {
        return !!this.dateEventGroup.parent
            && !this.timelineEvents.filter((timelineEvent) => timelineEvent.firstEvent === true).length
    }

    hasNext(): boolean {
        return !this.timelineEvents.filter((timelineEvent) => timelineEvent.lastEvent === true).length
    }

    hasInProgress(): boolean {
        return this.timelineEvents.filter((timelineEvent) => timelineEvent.lastEvent === true && timelineEvent.typeEvent.action === 'tarefa_em_andamento').length > 0
    }

    isMainEvent(): boolean {
        return this.timelineEvents.length === 1 && this.timelineEvents[0].typeEvent.objectClass === 'SuppCore\\AdministrativoBackend\\Api\\V1\\DTO\\Tarefa';
    }

    hasMainEvent(): boolean {
        const mainEvents = [
            'SuppCore\\AdministrativoBackend\\Api\\V1\\DTO\\Tarefa',
            'SuppCore\\AdministrativoBackend\\Api\\V1\\DTO\\Distribuicao'
        ]
        return this.timelineEvents
            .filter((timelineEvent) => mainEvents.includes(timelineEvent.typeEvent.objectClass))
            .length > 0;
    }

    getEventIco(timelineEvent: TimelineEvent): string {
        let ico = 'list';
        if (timelineEvent.typeEvent.objectClass === 'SuppCore\\AdministrativoBackend\\Api\\V1\\DTO\\Atividade' && timelineEvent.objectContext?.juntadas?.length) {
            ico = 'book';
        }
        if (timelineEvent.typeEvent.objectClass === 'SuppCore\\AdministrativoBackend\\Api\\V1\\DTO\\DocumentoAvulso') {
            ico = 'mail';
        }

        return ico;
    }

    hasParentDotElement(): boolean {
        return !!this._getParentDotElement();
    }

    getDotClass(): object {
        const dotClass = {
            'has-previous': this.hasPrevious(),
            'has-next': this.hasNext(),
            'sub-event': !this.isMainEvent() && this.timelineEvents.length === 1,
            'in-progress': this.hasInProgress()
        };

        dotClass[`event-item-tarefa-${this.tarefa.id}`] = true;

        return dotClass;
    }

    getTooltip(): string {
        if (this.timelineEvents.length === 1) {
            return this.timelineEvents[0].message
        }

        return `${this.timelineEvents.length} eventos`
    }

    private _getParentDotElement(): HTMLDivElement {
        const firstTimelineEvent = this.timelineEvents.find((timelineEvent) => timelineEvent.firstEvent);

        if (firstTimelineEvent && firstTimelineEvent.usuario.id !== this.tarefa.criadoPor.id) {
            const parentTarefa = this._findParentDotTarefa(firstTimelineEvent, this.tarefa.criadoPor, this.dateEventGroup);
            if (parentTarefa) {
                return  this._host.nativeElement.closest(`processo-timeline`).querySelector(`.event-item-tarefa-${parentTarefa.id}.dot`);
            }
        }

        return null;
    }

    private _findParentDotTarefa(firstTimelineEvent: TimelineEvent, usuario: Usuario, dateEventGroup?: DateEventGroup): Tarefa {
        const parentTimelineEvents = (dateEventGroup?.timelineEvents || [])
            .filter((timelineEvent) => timelineEvent.tarefa.id !== this.tarefa.id && timelineEvent.firstEvent === true && (timelineEvent.usuario.id === usuario.id) && timelineEvent.eventDate.isBefore(firstTimelineEvent.eventDate))
            .sort(((timelineEventA, timelineEventB) => timelineEventA.eventDate.toDate().getUTCDate() - timelineEventB.eventDate.toDate().getUTCDate()));

        if (parentTimelineEvents.length) {
            return parentTimelineEvents[parentTimelineEvents.length-1].tarefa;
        }

        return this._findParentDotTarefa(firstTimelineEvent, usuario, dateEventGroup?.parent);
    }

    private static _getRanHexColor(size: number = 3): string {
        let result = [];
        let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

        for (let n = 0; n < size; n++) {
            result.push(hexRef[Math.floor(Math.random() * 16)]);
        }
        return '#'+result.join('');
    }

    private _getOffset(el: HTMLDivElement): any {
        return {
            left: el.offsetLeft + window.scrollX,
            top: el.offsetTop + window.scrollY,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }
}
