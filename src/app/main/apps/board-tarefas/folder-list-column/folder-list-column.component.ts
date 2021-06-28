import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Folder, Pagination, Tarefa} from "../../../../../@cdk/models";
import {FormControl} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import * as fromStore from '../store';
import {of, Subject} from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    takeUntil,
    withLatestFrom
} from "rxjs/operators";
import * as _ from 'lodash';
import {IInfiniteScrollEvent} from "ngx-infinite-scroll/src/models";
import {CdkUtils} from "../../../../../@cdk/utils";
import {UpdateData} from "../../../../../@cdk/ngrx-normalizr";
import {tarefa as tarefaSchema} from "../../../../../@cdk/normalizr";

@Component({
    selector: 'folder-list-column',
    templateUrl: './folder-list-column.component.html',
    styleUrls: ['./folder-list-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class FolderListColumnComponent implements OnInit, OnDestroy{

    @Input()
    folder: Folder = null;

    private _unsubscribeAll: Subject<any> = new Subject();
    pagination: Pagination = new Pagination();
    tarefaList: Tarefa[] = [];
    selectedTarefaList: Tarefa[] = [];

    controls = {
        displayedCampos: [],
        allCampos: [
            {
                id: 'processo.nup',
                label: 'NUP',
                fixed: true
            },
            {
                id: 'especieTarefa.nome',
                label: 'Espécie Tarefa',
                fixed: false
            },
            {
                id: 'setorResponsavel.nome',
                label: 'Setor Responsável',
                fixed: false
            },
            {
                id: 'dataHoraDistribuicao',
                label: 'Data da Distribuição',
                fixed: false
            },
            {
                id: 'dataHoraPrazo',
                label: 'Prazo',
                fixed: false
            },
            {
                id: 'observacao',
                label: 'Observação',
                fixed: false
            }
        ],
        campos: (new FormControl()),
        folderSelectedIds: [],
        selectedIds: [],
        selectedTarefas: [],
        savingIds: [],
        deletingIds: [],
        isIndeterminate: false,
        loading:  true
    }

    constructor(private _store: Store<fromStore.BoardTarefasAppState>,
                private _changeRef: ChangeDetectorRef)
    {
    }

    ngOnInit(): void
    {
        this._store
            .pipe(
                select(fromStore.getTarefas),
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                filter(tarefasList => tarefasList !== undefined),
            )
            .subscribe(tarefaList => {
                if (this.folder.id) {
                    this.tarefaList = _.filter(tarefaList, {folder: {id: this.folder.id}});
                } else {
                    this.tarefaList = _.filter(tarefaList, (tarefa) => !tarefa?.folder?.id);
                }

                if (!this.tarefaList.length && this.pagination.total && this.controls.savingIds.length) {
                    setTimeout(_=> this.doLoadMoreTarefas({
                        'id': 'notIn:'+this.controls.savingIds.join(',')
                    }), 300);
                }

                this._changeRef.markForCheck();
            });

        this._store
            .pipe(
                select(fromStore.getTarefasSelected),
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                filter(tarefasSelectedList => tarefasSelectedList !== undefined),
            )
            .subscribe(tarefasSelectedList => {
                this.controls.selectedTarefas = tarefasSelectedList;
                this.controls.selectedIds = tarefasSelectedList.map(tarefa => tarefa.id);
                this.controls.folderSelectedIds = this.controls.selectedIds.filter(id => this.tarefaList.map(tarefa => tarefa.id).includes(id));
                this.controls.isIndeterminate = this.controls.folderSelectedIds.length > 0
                    && this.controls.folderSelectedIds.length !== this.tarefaList.length;

                this._changeRef.detectChanges();
            });

        this._store
            .pipe(
                select(fromStore.getFolderDeletingIds),
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                filter(deletingIds => deletingIds !== undefined),
            )
            .subscribe(deletingIds => {
                this.controls.deletingIds = deletingIds;
                this._changeRef.detectChanges();
            });

        this._store
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                select(fromStore.getFolderTarefas),
                filter(folderTarefas => folderTarefas !== undefined)
            )
            .subscribe(folderTarefas => {
                this.pagination = _.find(folderTarefas, {folderNome: this.folder.nome.toUpperCase()})?.pagination;
                this.controls.loading = _.find(folderTarefas, {folderNome: this.folder.nome.toUpperCase()})?.loading;
                this.controls.displayedCampos = _.find(folderTarefas, {folderNome: this.folder.nome.toUpperCase()})?.displayedCampos;
                this._changeRef.markForCheck();
            });

        this._store
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                select(fromStore.getSelectedTarefas),
                filter(tarefaList => tarefaList !== undefined)
            )
            .subscribe(tarefaList => {
                this.selectedTarefaList = tarefaList;
            });

        this._store
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged(),
                select(fromStore.getTarefasSavingIds),
                filter(savingIds => savingIds !== undefined)
            )
            .subscribe((savingIds => this.controls.savingIds = savingIds));

        this.controls.campos.setValue(this.controls.allCampos.map(c => c.id).filter(c => this.controls.displayedCampos.indexOf(c) > -1));

        this.controls.campos.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                let displayedCampos = [];
                this.controls.allCampos.forEach((c) => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        displayedCampos.push(c.id);
                    }
                });
                this._store.dispatch(new fromStore.UpdateDisplayedCampos({
                    nome: this.folder.nome.toUpperCase(),
                    displayedCampos: displayedCampos
                }))
                return of([]);
            })
        ).subscribe();
    }

    onClickTarefa(tarefa: Tarefa): void
    {
    }

    doLoadMoreTarefas(listFilter: any = {}): void
    {
        if (this.tarefaList?.length >= this.pagination?.total) {
            return;
        }

        const params = {
            nome: this.folder.nome.toUpperCase(),
            pagination: {
                ...this.pagination,
                limit: 10,
                offset: this.tarefaList.length,
                listFilter: listFilter
            },
            increment: true
        };

        this._store.dispatch(new fromStore.GetTarefas(params));
    }

    doReload(): void
    {
        const params = {
            pagination: {
                ...this.pagination,
                limit: (this.tarefaList.length > 10 ? this.tarefaList.length : 10),
                offset: 0
            },
            nome: (this.folder.id ? this.folder.nome.toUpperCase() : 'ENTRADA'),
            increment: false
        };

        this._store.dispatch(new fromStore.GetTarefas(params));
    }

    doSort(sort: any): void
    {
        this._store.dispatch(new fromStore.GetTarefas(
            {
                nome: this.folder.nome.toUpperCase(),
                pagination: {
                    ...this.pagination,
                    sort: sort,
                    limit: 10,
                    offset: 0
                },
                increment: false
            }
        ))
    }

    doRemoveFolder(folder: Folder): void
    {
        this._store.dispatch(new fromStore.DeleteFolder(folder.id));
    }

    doToggleSelectAll(ev): void {
        ev.preventDefault();
        if (this.isActionsDisabled()) {
            return;
        }
        let selectedIds = [];

        if (this.controls.folderSelectedIds.length === this.tarefaList.length) {
            selectedIds = [];
        } else {
            selectedIds = this.tarefaList.map(tarefa => tarefa.id);
        }

        this._store.dispatch(new fromStore.ChangeSelectedTarefas(selectedIds));
    }

    onDrop($event, enabled: boolean): void
    {
        if (enabled) {
            let newFolderName = this.folder.nome.toUpperCase();
            let oldFolderName = '';
            const loteId = CdkUtils.makeId();

            this.controls.selectedTarefas.forEach((tarefa) => {

                oldFolderName = tarefa?.folder?.nome?.toUpperCase() || 'ENTRADA';
                const operacaoId = CdkUtils.makeId();

                this._store.dispatch(new fromStore.ChangeTarefasFolder({
                    tarefa: tarefa,
                    loteId: loteId,
                    operacaoId: CdkUtils.makeId(),
                    newFolder: (this.folder.id ? this.folder : null),
                    oldFolder: (tarefa?.folder || null),
                    redo: [
                        new fromStore.ChangeTarefasFolder({
                            tarefa: tarefa,
                            loteId: loteId,
                            operacaoId: operacaoId,
                            newFolder: this.folder,
                            oldFolder: (tarefa?.folder || null),
                            redo: 'inherent'
                        })
                    ],
                    undo: [
                        new fromStore.ChangeTarefasFolder({
                            tarefa: tarefa,
                            loteId: loteId,
                            operacaoId: operacaoId,
                            newFolder: (tarefa?.folder || null),
                            oldFolder: this.folder,
                            redo: 'inherent'
                        })
                    ]
                }));
            });

            // tmp disabled
            // this._store.dispatch(new fromStore.AddFolderWaitingReload(newFolderName));
            // this._store.dispatch(new fromStore.AddFolderWaitingReload(oldFolderName));
        }
    }

    isDropzoneEnabled(event: DragEvent): boolean
    {
        return !this.controls.folderSelectedIds.length;
    }

    onDragOver($event: DragEvent, folderListColumnContent: HTMLElement, enabled: boolean): void {
        if (enabled) {
            const elementClass = folderListColumnContent.getAttribute('class').replace('folder-list-column-drag-over-disabled', '');
            folderListColumnContent.setAttribute('class', elementClass + ' folder-list-column-drag-over');
            this._changeRef.detectChanges();
        }
        if (!enabled && folderListColumnContent.getAttribute('class').indexOf('folder-list-column-drag-over-disabled') === -1) {
            folderListColumnContent.setAttribute('class', folderListColumnContent.getAttribute('class') + ' folder-list-column-drag-over-disabled');
            this._changeRef.detectChanges();
        }
    }

    isActionsDisabled(): boolean
    {
        return !!this.controls.savingIds.length;
    }

    isTarefaDisabled(tarefa: Tarefa): boolean
    {
        return this.controls.savingIds.includes(tarefa.id);
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
