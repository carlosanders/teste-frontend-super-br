import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pessoa} from '../../../../../../@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'admin-pessoa-list',
    templateUrl: './admin-pessoa-list.component.html',
    styleUrls: ['./admin-pessoa-list.component.scss']
})
export class AdminPessoaListComponent implements OnInit {

    routerState: any;
    pessoas$: Observable<Pessoa[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;


    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.PessoaListAppState>,
    ) {
        this.pessoas$ = this._store.pipe(select(fromStore.getPessoaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

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
        this._store.dispatch(new fromStore.GetPessoa({
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

    edit(pessoaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + pessoaId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
