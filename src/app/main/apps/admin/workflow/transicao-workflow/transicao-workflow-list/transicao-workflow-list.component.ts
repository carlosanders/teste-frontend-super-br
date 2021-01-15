import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {TransicaoWorkflow} from '../../../../../../../@cdk/models/transicao-workflow.model';
import {getRouterState} from '../../../../../../store/reducers';
import {cdkAnimations} from '../../../../../../../@cdk/animations';
import {Back} from '../../../../../../store/actions';

@Component({
    selector: 'transicao-workflow-list',
    templateUrl: './transicao-workflow-list.component.html',
    styleUrls: ['./transicao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoWorkflowListComponent implements OnInit {

    routerState: any;
    transicoesWorkflows$: Observable<TransicaoWorkflow[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TransicaoWorkflowListAppState>,
    ) {
        this.transicoesWorkflows$ = this._store.pipe(select(fromStore.getTransicaoWorkflowList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
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
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + transicaoWorkflowId]);
    }
    
    regras(transicaoWorkflowId: number): void {
        this._router.navigate(
            [this.routerState.url.replace('listar', '') + transicaoWorkflowId + '/validacaoTransicaoWorkflow'])
        ;
    }
    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    delete(transicaoWorkflowId: number): void {
        this._store.dispatch(new fromStore.DeleteTransicaoWorkflow(transicaoWorkflowId));
    }
}
