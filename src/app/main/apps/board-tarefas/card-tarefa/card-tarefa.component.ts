import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Tarefa, Usuario} from "../../../../../@cdk/models";
import {LoginService} from "../../../auth/login/login.service";
import {DndDragImageOffsetFunction} from "ngx-drag-drop";
import * as fromStore from "../store";
import {select, Store} from "@ngrx/store";
import {distinctUntilChanged, filter, takeUntil, withLatestFrom} from "rxjs/operators";
import {Subject} from "rxjs";
import * as _ from 'lodash';

@Component({
    selector: 'card-tarefa',
    templateUrl: './card-tarefa.component.html',
    styleUrls: ['./card-tarefa.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class CardTarefaComponent implements OnInit, OnDestroy
{

    @Input()
    tarefa: Tarefa = null;

    @Input()
    folderSelectedIds: number[] = [];

    @Input()
    displayedCampos: string[] = [
        'especieTarefa.nome',
        'setorResponsavel.nome',
        'dataHoraDistribuicao',
        'dataHoraPrazo',
        'observacao'
    ];

    private _unsubscribeAll: Subject<any> = new Subject();
    usuarioAtual: Usuario;
    tarefaChecked: boolean = false;
    togglingUrgente: boolean = false;
    cardExpanded: boolean = false;
    loadedAssuntos: boolean = false;
    loadedInteressados: boolean = false;
    selectedIds: number[] = [];
    processosIds: number[] = [];
    totalInteressados: number = 0;
    isDraggin: boolean = false;

    constructor(private _store: Store<fromStore.BoardTarefasAppState>,
                private _loginService: LoginService,
                private _changeRef: ChangeDetectorRef)
    {
        this.usuarioAtual = this._loginService.getUserProfile();
    }

    ngOnInit(): void
    {
        this._store
            .pipe(
                takeUntil(this._unsubscribeAll),
                select(fromStore.getIsTogglingUrgenteIds),
                distinctUntilChanged(),
                filter(listIds => listIds !== undefined)
            )
            .subscribe(listIds => this.togglingUrgente = listIds.includes(this.tarefa.id));

        this._store
            .pipe(
                select(fromStore.getSelectedTarefaIds),
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                filter(selectedIds => selectedIds !== undefined)
            )
            .subscribe(selectedIds => {
                this.tarefaChecked = selectedIds.includes(this.tarefa?.id);
                this.selectedIds = selectedIds;
                this._changeRef.markForCheck();
            });

        this._store
            .pipe(
                select(fromStore.getTarefasProcessoLoadingId),
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                filter(processosIds => processosIds !== undefined),
                withLatestFrom(
                    this._store.pipe(select(fromStore.getTarefasProcessoInteressados))
                )
            )
            .subscribe(([processosIds, interessados]) => {
                this.processosIds = processosIds;
                let interessado = _.find(interessados, {id: this.tarefa.processo.id})
                if (interessado) {
                    this.totalInteressados = interessado?.total;
                }
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onChangeCheckTarefa(): void
    {
        let selectedIds = [
            ...this.folderSelectedIds.filter(id => id !== this.tarefa.id),
            this.tarefa.id
        ];

        this._store.dispatch(new fromStore.ChangeSelectedTarefas(selectedIds));
    }

    offsetFunction: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element) => ({x: 0, y: 0});

    onStartDrag(event: DragEvent, tarefa: Tarefa): void {
        let selectedIds = [
            ...this.folderSelectedIds.filter(id => id !== this.tarefa.id),
            this.tarefa.id
        ];

        this._store.dispatch(new fromStore.ChangeSelectedTarefas(selectedIds));

        this.isDraggin = true;
    }

    onCancelDrag(event: DragEvent): void {
        this.isDraggin = false;
        // this.setDraggedTarefasIds.emit([]);
    }

    onCopied(event: DragEvent, tarefa: Tarefa): void {
    }

    onClickToggleUrgente(): void
    {
        if (!this.togglingUrgente) {
            this._store.dispatch(new fromStore.ToggleUrgenteTarefa(this.tarefa));
        }
    }

    onClickToggleCardExpand(): void
    {
        this.cardExpanded = !this.cardExpanded;

        if (!this.tarefa.processo?.interessados?.length) {
            this._store.dispatch(new fromStore.GetTarefasAssuntos({
                processoId: this.tarefa.processo.id,
                params: {
                    filter: {
                        'processo.id': 'eq:' + this.tarefa.processo.id,
                        'principal': 'eq:true'
                    },
                    sort: {},
                    limit: 1,
                    offset: 0,
                    populate: ['assuntoAdministrativo']
                }
            }));
        }

        if (!this.tarefa.processo?.interessados?.length) {
            this._store.dispatch(new fromStore.GetTarefasInteressados(
                {
                    processoId: this.tarefa.processo.id,
                    params: {
                        filter: {
                            'processo.id': 'eq:' + this.tarefa.processo.id
                        },
                        sort: {},
                        limit: 2,
                        offset: 0,
                        populate: ['pessoa']
                    }
                }
            ));
        }
    }

    onClickCopyNup(nup:string): void
    {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (nup));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }


}
