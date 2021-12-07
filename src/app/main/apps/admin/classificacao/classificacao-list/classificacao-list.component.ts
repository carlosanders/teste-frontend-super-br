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
import {Classificacao} from '@cdk/models';
import * as fromStore from './store';
import {getRouterState} from '../../../../../store';
import {cdkAnimations} from '@cdk/animations';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'classificacao-list',
    templateUrl: './classificacao-list.component.html',
    styleUrls: ['./classificacao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ClassificacaoListComponent implements OnInit, OnDestroy {

    routerState: any;
    classificacoes$: Observable<Classificacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    idDeletados: Set<number> = new Set([]);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _router: Router,
                private _store: Store<fromStore.ClassificacaoListAppState>) {

        this.classificacoes$ = this._store.pipe(select(fromStore.getClassificacaoList));
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
        this.deletingIds$.subscribe((e) => e.forEach((itemdic) => this.idDeletados.add(itemdic['classificacaoId'])));
    }

    ngOnInit(): void
    {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadClassificacao());
    }

    reload(params): void
    {
        this._store.dispatch(new fromStore.GetClassificacao({
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

    inatived(params): void
    {
        this._store.dispatch(new fromStore.GetClassificacao({
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

    edit(classificacaoId: number): void
    {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + classificacaoId]).then();
    }

    visibility(classificacaoId: number): void
    {
        this._router.navigate([this.routerState.url.replace('listar', classificacaoId+ '/acessos')]).then();
    }

    create(): void
    {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    delete(classificacaoId: number, loteId: string = null): void
    {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteClassificacao({
            classificacaoId: classificacaoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void
    {
        this.lote = CdkUtils.makeId();
        ids = ids.filter((id:number) => !this.idDeletados.has(id));
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
