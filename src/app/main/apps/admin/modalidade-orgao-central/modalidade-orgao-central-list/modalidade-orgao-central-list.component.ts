import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {ModalidadeOrgaoCentral} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '@cdk/animations';
import {UnloadModalidadeOrgaoCentral} from './store';


@Component({
    selector: 'modalidade-orgao-central-list',
    templateUrl: './modalidade-orgao-central-list.component.html',
    styleUrls: ['./modalidade-orgao-central-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModalidadeOrgaoCentralListComponent implements OnInit, OnDestroy {

    routerState: any;
    modalidadeOrgaoCentralList$: Observable<ModalidadeOrgaoCentral[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModalidadeOrgaoCentralListAppState>,
    ) {
        this.modalidadeOrgaoCentralList$ = this._store.pipe(select(fromStore.getModalidadeOrgaoCentralList));
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
        this._store.dispatch(new fromStore.UnloadModalidadeOrgaoCentral());
    }



    reload(params): void {
        this._store.dispatch(new fromStore.GetModalidadeOrgaoCentral({
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
        this._store.dispatch(new fromStore.GetModalidadeOrgaoCentral({
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

    edit(modalidadeOrgaoCentralId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + modalidadeOrgaoCentralId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
