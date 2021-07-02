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

import {EspecieTarefa} from '@cdk/models';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store/reducers';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../../@cdk/utils';


@Component({
    selector: 'especie-tarefa-list',
    templateUrl: './especie-tarefa-list.component.html',
    styleUrls: ['./especie-tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieTarefaListComponent implements OnInit, OnDestroy {

    routerState: any;
    especieTarefas$: Observable<EspecieTarefa[]>;
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
        private _store: Store<fromStore.EspecieTarefaListAppState>,
    ) {
        this.especieTarefas$ = this._store.pipe(select(fromStore.getEspecieTarefaList));
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
        this._store.dispatch(new fromStore.UnloadEspecieTarefa());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetEspecieTarefa({
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
        this._store.dispatch(new fromStore.GetEspecieTarefa({
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

    edit(especieTarefaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + especieTarefaId]);
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    delete(especieTarefaId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteEspecieTarefa({
            especieTarefaId: especieTarefaId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]) {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
