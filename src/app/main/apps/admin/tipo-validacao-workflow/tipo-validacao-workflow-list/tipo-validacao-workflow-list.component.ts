import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {TipoValidacaoWorkflow, Usuario} from '@cdk/models';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'tipo-validacao-workflow-list',
    templateUrl: './tipo-validacao-workflow-list.component.html',
    styleUrls: ['./tipo-validacao-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoValidacaoWorkflowListComponent implements OnInit {

    routerState: any;
    tipoValidacaoWorkflows$: Observable<TipoValidacaoWorkflow[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TipoValidacaoWorkflowListAppState>,
    ) {
        this.tipoValidacaoWorkflows$ = this._store.pipe(select(fromStore.getTipoValidacaoWorkflowList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
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
        this._store.dispatch(new fromStore.GetTipoValidacaoWorkflow({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    edit(tipoValidacaoWorkflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + tipoValidacaoWorkflowId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    delete(tipoValidacaoWorkflowId: number): void {
        this._store.dispatch(new fromStore.DeleteTipoValidacaoWorkflow(tipoValidacaoWorkflowId));
    }

}
