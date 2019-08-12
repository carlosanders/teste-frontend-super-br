import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'especie-atividade-list',
    templateUrl: './especie-atividade-list.component.html',
    styleUrls: ['./especie-atividade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EspecieAtividadeListComponent implements OnInit {

    routerState: any;
    especieAtividades$: Observable<EspecieAtividade[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    displayedColumns: string[] = ['id', 'nome', 'descricao', 'genero.nome', 'actions'];
    actions: string[] = ['favorito'];

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.EspecieAtividadeListAppState>,
    ) {
        this.especieAtividades$ = this._store.pipe(select(fromStore.getEspecieAtividadeList));
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

    reload (params): void {
        this._store.dispatch(new fromStore.GetEspeciesAtividades({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        }));
    }

    edit(especieAtividadeId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + especieAtividadeId]);
    }

    delete(especieAtividadeId: number): void {
        this._store.dispatch(new fromStore.DeleteEspecieAtividade(especieAtividadeId));
    }

    favorito(especieAtividadeId: number): void {
        this._store.dispatch(new fromStore.SaveEspecieAtividade(especieAtividadeId));
    }

}
