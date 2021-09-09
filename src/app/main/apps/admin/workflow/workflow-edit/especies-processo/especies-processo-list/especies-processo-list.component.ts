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
import {EspecieProcesso} from '@cdk/models';
import * as fromStore from './store';
import {getRouterState} from '../../../../../../../store';
import {cdkAnimations} from '@cdk/animations';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from "../../../../../../../../@cdk/utils";

@Component({
    selector: 'workflow-especies-processo-list',
    templateUrl: './especies-processo-list.component.html',
    styleUrls: ['./especies-processo-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspeciesProcessoListComponent implements OnInit, OnDestroy {

    routerState: any;
    especieProcessos$: Observable<EspecieProcesso[]>;
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
        private _store: Store<fromStore.WorkflowEspecieProcessoListAppState>,
    ) {
        this.especieProcessos$ = this._store.pipe(select(fromStore.getEspecieProcessoList));
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetEspecieProcesso({
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

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    delete(especieProcessoId): void {
        const operacaoId = CdkUtils.makeId();
        const especieProcesso = new EspecieProcesso();
        especieProcesso.id = especieProcessoId;
        this._store.dispatch(new fromStore.UpdateEspecieProcesso(
            {
                ...this.pagination,
                especieProcesso: especieProcesso,
                operacaoId: operacaoId
            }
        ));
    }
}
