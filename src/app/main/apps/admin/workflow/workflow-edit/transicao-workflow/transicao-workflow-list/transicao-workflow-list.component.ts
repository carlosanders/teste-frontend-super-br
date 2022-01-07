import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {TransicaoWorkflow} from '@cdk/models/transicao-workflow.model';
import {Back, getRouterState} from 'app/store';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'transicao-workflow-list',
    templateUrl: './transicao-workflow-list.component.html',
    styleUrls: ['./transicao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoWorkflowListComponent implements OnInit, OnDestroy {

    routerState: any;
    transicoesWorkflows$: Observable<TransicaoWorkflow[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TransicaoWorkflowListAppState>,
    ) {
        this.transicoesWorkflows$ = this._store.pipe(select(fromStore.getTransicaoWorkflowList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetTransicaoWorkflow({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

    edit(transicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + transicaoWorkflowId]).then();
    }

    regras(transicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + transicaoWorkflowId + '/validacoes']).then();
    }

    acoes(transicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + transicaoWorkflowId + '/acoes']).then();
    }

    subWorkflows(transicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + transicaoWorkflowId + '/sub-workflows/listar']).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    delete(transicaoWorkflowId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteTransicaoWorkflow({
            transicaoWorkflowId: transicaoWorkflowId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
