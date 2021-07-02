import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Workflow} from '@cdk/models';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'workflow-list',
    templateUrl: './workflow-list.component.html',
    styleUrls: ['./workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WorkflowListComponent implements OnInit, OnDestroy {

    routerState: any;
    workflows$: Observable<Workflow[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.WorkflowListAppState>,
    ) {
        this.workflows$ = this._store.pipe(select(fromStore.getWorkflowList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }


    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadWorkflow());
    }


    reload(params): void {
        this._store.dispatch(new fromStore.GetWorkflow({
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

    editTransicoesWorkflow(workflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `editar/${workflowId}/transicoes`)]);
    }

    edit(workflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + workflowId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    delete(workflowId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteWorkflow({
            workflowId: workflowId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]) {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    view(workflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/' + workflowId + '/visualizar')]);
    }

    especies(workflowId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `editar/${workflowId}/especies-processo/listar`)]);
    }
}
