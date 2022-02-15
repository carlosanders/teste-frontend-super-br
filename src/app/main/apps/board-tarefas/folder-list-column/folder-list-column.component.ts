import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Folder, Pagination, Tarefa} from '@cdk/models';
import {FormControl} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../store';
import {of, Subject} from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    takeUntil
} from 'rxjs/operators';
import * as _ from 'lodash';
import {CdkUtils} from '@cdk/utils';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {getRouterState} from 'app/store';

@Component({
    selector: 'folder-list-column',
    templateUrl: './folder-list-column.component.html',
    styleUrls: ['./folder-list-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class FolderListColumnComponent implements OnInit, OnDestroy {

    @Input()
    folder: Folder = null;

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
        loading: true,
        sheetRef: null,
        snackSubscription: null,
        snackSubscriptionType: null
    };
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private _store: Store<fromStore.BoardTarefasAppState>,
                private _changeRef: ChangeDetectorRef,
                private _router: Router,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this._store.pipe(
            select(fromStore.getTarefas),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            filter(tarefasList => tarefasList !== undefined),
        ).subscribe((tarefaList) => {
            if (this.folder.id) {
                this.tarefaList = _.filter(tarefaList, {folder: {id: this.folder.id}});
            } else {
                this.tarefaList = _.filter(tarefaList, tarefa => !tarefa?.folder?.id);
            }

            if (!this.tarefaList.length && this.pagination.total) {
                let loadMore = false;
                let notIn = [];

                if (this.controls.savingIds.length) {
                    loadMore = true;
                    notIn = [
                        ...notIn,
                        ...this.controls.savingIds
                    ];
                }
                if (this.controls.deletingIds.length) {
                    loadMore = true;
                    notIn = [
                        ...notIn,
                        ...this.controls.deletingIds
                    ];
                }

                if (loadMore) {
                    setTimeout(_ => this.doLoadMoreTarefas({
                        'id': 'notIn:' + notIn.join(',')
                    }), 300);
                }
            }

            this._changeRef.markForCheck();
        });

        this._store.pipe(
            select(fromStore.getTarefasSelected),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            filter(tarefasSelectedList => tarefasSelectedList !== undefined),
        ).subscribe((tarefasSelectedList) => {
            this.controls.selectedTarefas = tarefasSelectedList;
            this.controls.selectedIds = tarefasSelectedList.map(tarefa => tarefa.id);
            this.controls.folderSelectedIds = this.controls.selectedIds.filter(id => this.tarefaList.map(tarefa => tarefa.id).includes(id));
            this.controls.isIndeterminate = this.controls.folderSelectedIds.length > 0
                && this.controls.folderSelectedIds.length !== this.tarefaList.length;

            this._changeRef.detectChanges();
        });

        this._store.pipe(
            select(fromStore.getFolderDeletingIds),
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            filter(deletingIds => deletingIds !== undefined),
        ).subscribe((deletingIds) => {
            this.controls.deletingIds = deletingIds;
            this._changeRef.detectChanges();
        });

        this._store.pipe(
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            select(fromStore.getFolderTarefas),
            filter(folderTarefas => folderTarefas !== undefined)
        ).subscribe((folderTarefas) => {
            this.pagination = _.find(folderTarefas, {folderNome: this.folder.nome.toUpperCase()})?.pagination;
            this.controls.loading = _.find(folderTarefas, {folderNome: this.folder.nome.toUpperCase()})?.loading;
            this.controls.displayedCampos = _.find(folderTarefas, {folderNome: this.folder.nome.toUpperCase()})?.displayedCampos || [];
            this._changeRef.markForCheck();
        });

        this._store.pipe(
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            select(fromStore.getSelectedTarefas),
            filter(tarefaList => tarefaList !== undefined)
        ).subscribe((tarefaList) => {
            this.selectedTarefaList = tarefaList;
        });

        this._store.pipe(
            takeUntil(this._unsubscribeAll),
            distinctUntilChanged(),
            select(fromStore.getTarefasSavingIds),
            filter(savingIds => savingIds !== undefined)
        ).subscribe(((savingIds) => {
            this.controls.savingIds = savingIds;
            this._changeRef.markForCheck();
        }));

        this.controls.campos.setValue(this.controls.allCampos.map(c => c.id).filter(c => this.controls.displayedCampos.indexOf(c) > -1));

        this.controls.campos.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                const displayedCampos = [];
                this.controls.allCampos.forEach((c) => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        displayedCampos.push(c.id);
                    }
                });
                this._store.dispatch(new fromStore.UpdateDisplayedCampos({
                    nome: this.folder.nome.toUpperCase(),
                    displayedCampos: displayedCampos
                }));
                return of([]);
            })
        ).subscribe();

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            // caso estiver snack aberto esperando alguma confirmacao se sair da url faz o flush
            if (this.controls.snackSubscription) {
                this.controls.sheetRef.dismiss();
            }
            this.routerState = routerState.state;
        });
    }

    doOpenTarefa(tarefa: Tarefa, openWindow: boolean): void {
        if (openWindow) {
            const extras = {
                queryParams: {
                    novaAba: true
                }
            };
            const url = this._router.createUrlTree([
                'apps/tarefas/' + this.routerState.params.generoHandle + '/minhas-tarefas/' + this.folder.nome.toLowerCase() + '/tarefa/' + tarefa.id +
                '/processo/' + tarefa.processo.id + '/visualizar'
            ], extras);
            window.open(url.toString(), '_blank');
        }
    }

    doLoadMoreTarefas(listFilter: any = {}): void {
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

    doReload(): void {
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

    doSort(sort: any): void {
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
        ));
    }

    doRemoveFolder(folder: Folder): void {
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

    doDeleteTarefas(deletingIdsList: number[]): void {
        if (this.controls.snackSubscription) {
            if (this.controls.snackSubscriptionType === 'delete') {
                // temos um snack de exclusão aberto, temos que ignorar
                this.controls.snackSubscription.unsubscribe();
                this.controls.sheetRef.dismiss();
                this.controls.snackSubscriptionType = null;
                this.controls.snackSubscription = null;
            } else {
                this.controls.sheetRef.dismiss();
            }
        }

        this.controls.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'delete',
                text: 'Deletando'
            }
        });

        this.controls.snackSubscription = this.controls.sheetRef.afterDismissed().subscribe((data) => {
            if (!data.dismissedByAction) {
                const loteId = CdkUtils.makeId();
                deletingIdsList.forEach((id) => {
                    const operacaoId = CdkUtils.makeId();
                    const tarefa = new Tarefa();
                    tarefa.id = id;

                    this._store.dispatch(new fromStore.DeleteTarefas({
                        tarefa: tarefa,
                        loteId: loteId,
                        folder: (this.folder.id ? this.folder : null),
                        operacaoId: CdkUtils.makeId(),
                        redo: [
                            new fromStore.DeleteTarefas({
                                tarefa: tarefa,
                                loteId: loteId,
                                folder: (this.folder.id ? this.folder : null),
                                operacaoId: operacaoId,
                                redo: 'inherent'
                            })
                        ],
                        undo: [
                            new fromStore.UndeleteTarefas({
                                tarefa: tarefa,
                                loteId: loteId,
                                folder: (this.folder.id ? this.folder : null),
                                operacaoId: operacaoId,
                                redo: 'inherent'
                            })
                        ]
                    }));
                });
            }
            this.controls.snackSubscription.unsubscribe();
            this.controls.snackSubscriptionType = null;
            this.controls.snackSubscription = null;
        });
    }

    doCienciaTarefas(tarefasIdsList: number[]): void {
        if (this.controls.snackSubscription) {
            if (this.controls.snackSubscriptionType === 'ciencia') {
                // temos um snack de ciência aberto, temos que ignorar
                this.controls.snackSubscription.unsubscribe();
                this.controls.sheetRef.dismiss();
                this.controls.snackSubscriptionType = null;
                this.controls.snackSubscription = null;
            } else {
                // O snack é de outro tipo, concluí-lo
                this.controls.sheetRef.dismiss();
            }
        }

        this.controls.sheetRef = this._snackBar.openFromComponent(SnackBarDesfazerComponent, {
            duration: 3000,
            panelClass: ['cdk-white-bg'],
            data: {
                icon: 'check',
                text: 'Ciência'
            }
        });

        this.controls.snackSubscription = this.controls.sheetRef.afterDismissed().subscribe((data) => {
            if (!data.dismissedByAction) {
                const loteId = CdkUtils.makeId();
                tarefasIdsList.forEach((id) => {
                    const operacaoId = CdkUtils.makeId();
                    const tarefa = new Tarefa();
                    tarefa.id = id;

                    this._store.dispatch(new fromStore.DarCienciaTarefas({
                        tarefa: tarefa,
                        loteId: loteId,
                        folder: (this.folder.id ? this.folder : null),
                        operacaoId: CdkUtils.makeId(),
                        redo: [
                            new fromStore.DarCienciaTarefas({
                                tarefa: tarefa,
                                loteId: loteId,
                                folder: (this.folder.id ? this.folder : null),
                                operacaoId: operacaoId,
                                redo: 'inherent'
                            })
                        ],
                        undo: null
                    }));
                });
            }
            this.controls.snackSubscription.unsubscribe();
            this.controls.snackSubscriptionType = null;
            this.controls.snackSubscription = null;
        });
    }

    onDrop($event, enabled: boolean): void {
        if (enabled) {
            const loteId = CdkUtils.makeId();
            this.controls.selectedTarefas.forEach((tarefa) => {
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
        }
    }

    isDropzoneEnabled(): boolean {
        return !this.controls.folderSelectedIds.length;
    }

    isActionsDisabled(): boolean {
        return !!this.controls.savingIds.length;
    }

    isTarefaDisabled(tarefa: Tarefa): boolean {
        return this.controls.savingIds.includes(tarefa.id);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
