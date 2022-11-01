import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {cdkAnimations} from '@cdk/animations';
import {
    CdkOficiosTarefaGroupInterface
} from '@cdk/components/documento-avulso/cdk-oficios-card-list/cdk-oficios-tarefa-group.interface';

import {DocumentoAvulso, Tarefa} from '@cdk/models';
import {CdkUtils} from '@cdk/utils';
import {select, Store} from '@ngrx/store';
import * as fromTarefasStore from 'app/main/apps/tarefas/store';
import * as appStore from 'app/store';
import {RouterStateUrl} from 'app/store';
import {Back} from 'app/store/actions';
import * as _ from 'lodash';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import * as fromStore from './store';

@Component({
    selector: 'remeter-oficios-bloco',
    templateUrl: './remeter-oficios-bloco.component.html',
    styleUrls: ['./remeter-oficios-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RemeterOficiosBlocoComponent implements OnInit, OnDestroy {

    routerState: RouterStateUrl;
    bufferTarefasIdReload: number[] = [];
    remeterIds: number[] = [];
    actions: string[] = ['select', 'remeter'];
    tarefasAgrupadas: {[tarefaId: number]: CdkOficiosTarefaGroupInterface} = {};
    selectedIds$: Observable<number[]> = new Observable<number[]>();
    isLoadingAny$: Observable<boolean> = new Observable<boolean>();
    documentosAvulso: DocumentoAvulso[] = [];
    private _selectedTarefas: Tarefa[] = [];
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _store: Store<fromStore.RemeterOficiosBlocoAppState>,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this._store.pipe(
            select(appStore.getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => this.routerState = routerState.state);

        this.selectedIds$ = this._store.pipe(
            select(fromStore.getSelectedIds),
            takeUntil(this._unsubscribeAll)
        );

        this.isLoadingAny$ = this._store.pipe(
            select(fromStore.getAnyLoading),
            takeUntil(this._unsubscribeAll)
        );

        this._store.pipe(
            select(fromTarefasStore.getSelectedTarefas),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas: Tarefa[]) => this._selectedTarefas = tarefas);

        this._store.pipe(
            select(fromStore.getDocumentosAvulso),
            takeUntil(this._unsubscribeAll)
        ).subscribe((oficios: DocumentoAvulso[]) => this.documentosAvulso = oficios);

        this._store.pipe(
            select(fromStore.getTarefaGroup),
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefasAgrupadas: {[id: number]: CdkOficiosTarefaGroupInterface}) => this.tarefasAgrupadas = tarefasAgrupadas);

        this._store.pipe(
            select(fromStore.getRemeterIds),
            takeUntil(this._unsubscribeAll)
        ).subscribe((remeterIds: number[]) => {
            if (this.remeterIds.length > 0 && remeterIds.length === 0) {
                this.bufferTarefasIdReload.forEach((id) => {
                    this._store.dispatch(new fromTarefasStore.GetEtiquetasTarefas(id));
                });

                this.bufferTarefasIdReload = [];
            }
            this.remeterIds = remeterIds;
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadOficios());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doRemeter(documentoAvulso: DocumentoAvulso, loteId?: string): void {
        this.bufferTarefasIdReload = _.uniq([...this.bufferTarefasIdReload, documentoAvulso.documentoRemessa.tarefaOrigem.id]);

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.RemeterOficio({
            tarefa: documentoAvulso.documentoRemessa.tarefaOrigem,
            oficio: documentoAvulso,
            operacao: {
                id: operacaoId,
                loteId: loteId,
                type: 'documento avulso',
                content: 'Remetendo o ofício id ' + documentoAvulso.id + '...',
                redo: [
                    new fromStore.RemeterOficio({
                        oficio: documentoAvulso,
                        operacaoId: operacaoId,
                        status: 0, // carregando
                        loteId: loteId,
                        redo: 'inherent'
                    })
                ],
                undo: null
            }
        }));
    }

    doRemeterBloco(documentosAvulso: DocumentoAvulso[]): void {
        const loteId = CdkUtils.makeId();
        documentosAvulso.forEach((documentosAvulso) => {
            this.doRemeter(
                documentosAvulso,
                loteId
            )
        });
    }

    doClicked(documentoAvuso: DocumentoAvulso): void {
        this._router.navigate([this.routerState.url + '/documento/' + documentoAvuso.documentoRemessa.id, {
                outlets: {
                    sidebar: 'oficio/dados-basicos'
                }
            }],
            {
                relativeTo: this._activatedRoute.parent
            }).then();
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    doChangedSelectedIds(selectedIds: number[]): void {
        this._store.dispatch(new fromStore.SetSelectedIds(selectedIds));
    }

    doGetMore(tarefaId: number): void {
        const pagination = this.tarefasAgrupadas[tarefaId].pagination;
        const offset = pagination.offset + pagination.limit;
        this._store.dispatch(new fromStore.GetOficios({
            tarefa: this._selectedTarefas.find((tarefa) => tarefa.id === tarefaId),
            pagination: {
                ...pagination,
                offset: pagination.total > offset ? offset : 0
            },
            more: true
        }))
    }
}
