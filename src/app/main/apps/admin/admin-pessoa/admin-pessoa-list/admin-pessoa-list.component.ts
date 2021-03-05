import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {Pessoa} from '../../../../../../@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '../../../../../../@cdk/animations';

@Component({
    selector: 'admin-pessoa-list',
    templateUrl: './admin-pessoa-list.component.html',
    styleUrls: ['./admin-pessoa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
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

    edit(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa/')[0] + '/pessoa/editar/' + pessoaId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.split('/pessoa/')[0] + '/pessoa/editar/criar']).then();
    }

    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.filter((pessoa) => !!pessoa).subscribe((pessoa: Pessoa) => {
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }
}
