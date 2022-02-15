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
import {VinculacaoEspecieProcessoWorkflow} from '@cdk/models';
import * as fromStore from './store';
import {getRouterState} from 'app/store';
import {cdkAnimations} from '@cdk/animations';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'vinculacao-especie-processo-workflow-list',
    templateUrl: './vinculacao-especie-processo-workflow-list.component.html',
    styleUrls: ['./vinculacao-especie-processo-workflow-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoEspecieProcessoWorkflowListComponent implements OnInit, OnDestroy {

    routerState: any;
    vinculacoesEspecieProcessoWorkflow$: Observable<VinculacaoEspecieProcessoWorkflow[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VinculacaoEspecieProcessoWorkflowListAppState>,
    ) {
        this.vinculacoesEspecieProcessoWorkflow$ = this._store.pipe(select(fromStore.getVinculacaoEspecieProcessoWorkflowList));
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

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVinculacaoEspecieProcessoWorkflow({
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

    inatived(params): void {
        this._store.dispatch(new fromStore.GetVinculacaoEspecieProcessoWorkflow({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context,
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    delete(vinculacaoEspecieProcessoWorkflowId): void {
        const operacaoId = CdkUtils.makeId();
        const vinculacaoEspecieProcessoWorkflow = new VinculacaoEspecieProcessoWorkflow();
        vinculacaoEspecieProcessoWorkflow.id = vinculacaoEspecieProcessoWorkflowId;
        this._store.dispatch(new fromStore.DeleteVinculacaoEspecieProcessoWorkflow(
            {
                ...this.pagination,
                vinculacaoEspecieProcessoWorkflow: vinculacaoEspecieProcessoWorkflow,
                operacaoId: operacaoId
            }
        ));
    }
}
