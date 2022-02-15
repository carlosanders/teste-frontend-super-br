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
import {VinculacaoTransicaoWorkflow} from '@cdk/models/vinculacao-transicao-workflow.model';
import {Back, getRouterState} from 'app/store';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'sub-workflow-list',
    templateUrl: './sub-workflow-list.component.html',
    styleUrls: ['./sub-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SubWorkflowListComponent implements OnInit, OnDestroy {

    routerState: any;
    vinculacoesTransicaoWorkflow$: Observable<VinculacaoTransicaoWorkflow[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _router: Router,
                private _store: Store<fromStore.VinculacaoTransicaoWorkflowListAppState>)
    {
        this.vinculacoesTransicaoWorkflow$ = this._store.pipe(select(fromStore.getVinculacaoTransicaoWorkflowList));
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
        this._store.dispatch(new fromStore.GetVinculacaoTransicaoWorkflow({
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

    edit(vinculacaoTransicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoTransicaoWorkflowId]).then();
    }

    regras(vinculacaoTransicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoTransicaoWorkflowId + '/validacoes']).then();
    }

    acoes(vinculacaoTransicaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoTransicaoWorkflowId + '/acoes']).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    delete(transicaoWorkflowId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteVinculacaoTransicaoWorkflow({
            id: transicaoWorkflowId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
