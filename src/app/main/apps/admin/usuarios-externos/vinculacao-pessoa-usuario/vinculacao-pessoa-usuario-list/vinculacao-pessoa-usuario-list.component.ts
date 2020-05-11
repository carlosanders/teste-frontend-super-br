import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Pessoa} from '../../../../../../../@cdk/models';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {getRouterState} from '../../../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'vinculacao-pessoa-usuario-list',
    templateUrl: './vinculacao-pessoa-usuario-list.component.html',
    styleUrls: ['./vinculacao-pessoa-usuario-list.component.scss']
})
export class VinculacaoPessoaUsuarioListComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    pessoas$: Observable<Pessoa[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    @Output()
    select: EventEmitter<Pessoa> = new EventEmitter();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VinculacaoPessoaUsuarioListAppState>,
    ) {
        this.pessoas$ = this._store.pipe(select(fromStore.getVinculacaoPessoaUsuarioList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVinculacaoPessoaUsuario({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        }));
    }

    delete(pessoaId: number): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoPessoaUsuario(pessoaId));
    }

    doSelect(pessoa: Pessoa): void {
        this.select.emit(pessoa);
    }

    create() : void {
        this._router.navigate([this.routerState.url.replace('listar', 'criar')]);
    }

}
