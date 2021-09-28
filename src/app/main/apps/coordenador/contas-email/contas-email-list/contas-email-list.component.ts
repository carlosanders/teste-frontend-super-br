import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';
import {ContaEmail} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store';
import {cdkAnimations} from '@cdk/animations';


@Component({
    selector: 'contas-email-list',
    templateUrl: './contas-email-list.component.html',
    styleUrls: ['./contas-email-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ContaEmailListComponent implements OnInit, OnDestroy {

    routerState: any;
    contaEmailList$: Observable<ContaEmail[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ContaEmailListAppState>,
    ) {
        this.contaEmailList$ = this._store.pipe(select(fromStore.getContaEmailList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

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
        this._store.dispatch(new fromStore.UnloadContaEmail());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetContaEmail({
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
            context: params.context
        }));
    }

    inatived(params): void {
        this._store.dispatch(new fromStore.GetContaEmail({
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

    edit(contaEmailId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + contaEmailId]).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }
}
