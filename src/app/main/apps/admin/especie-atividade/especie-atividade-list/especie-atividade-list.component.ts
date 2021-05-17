import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {EspecieAtividade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '@cdk/animations';
import {UnloadEspecieAtividade} from "./store";


@Component({
    selector: 'especie-atividade-list',
    templateUrl: './especie-atividade-list.component.html',
    styleUrls: ['./especie-atividade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieAtividadeListComponent implements OnInit, OnDestroy {

    routerState: any;
    especieAtividades$: Observable<EspecieAtividade[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.EspecieAtividadeListAppState>,
    ) {
        this.especieAtividades$ = this._store.pipe(select(fromStore.getEspecieAtividadeList));
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

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadEspecieAtividade());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetEspecieAtividade({
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

    edit(especieAtividadeId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + especieAtividadeId]);
    }

    tipoDocumentoEdit(especieAtividadeId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'tipo-documento-list/') + especieAtividadeId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
