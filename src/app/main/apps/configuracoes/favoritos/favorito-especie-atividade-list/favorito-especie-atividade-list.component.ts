import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Favorito} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../auth/login/login.service';
import {Pagination} from '@cdk/models';
import {takeUntil} from 'rxjs/operators';
import {FavoritoService} from '@cdk/services/favorito.service';

@Component({
    selector: 'favorito-especie-atividade-list',
    templateUrl: './favorito-especie-atividade-list.component.html',
    styleUrls: ['./favorito-especie-atividade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class FavoritoEspecieAtividadeListComponent implements OnInit, OnDestroy {

    routerState: any;
    favoritos$: Observable<Favorito[]>;
    favoritos: Favorito[];

    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    showEspecieAtividade = true;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    favorito: Favorito;
    displayedColumns: string[] = ['id', 'nome', 'descricao', 'actions'];

    templatePagination: Pagination;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _favoritoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.FavoritoListEspecieAtividadeAppState>,
        public _loginService: LoginService,
        private _favoritoService: FavoritoService
    ) {
        this.favoritos$ = this._store.pipe(select(fromStore.getFavoritoListEspecieAtividade));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this.templatePagination = new Pagination();

        this._store
            .pipe(select(getRouterState),
                takeUntil(this._unsubscribeAll))
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

        this.favoritos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(favorito => {
            this.favoritos = favorito;
        });

    }

    ngOnDestroy(): void {

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetFavoritos({
            ...this.pagination,
            filter: {
                'especieAtividade': 'isNotNull',
                'prioritario': 'eq:' + 'true',
                'usuario.id': 'eq:' + this._loginService.getUserProfile().id
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                'especieAtividade'
            ]
        }));
    }

    doToggleFavorito(favorito: Favorito): void {
        if (!favorito.prioritario) {
            favorito.prioritario = true;
        }
        this._store.dispatch(new fromStore.ToggleFavoritoEspecieAtividade(favorito));
        this.reload({...this.pagination});
    }

    submit(valor): void {

        this._store.dispatch(new fromStore.GetFavorito({
            filter: {
                'usuario.id': 'eq:' + this._loginService.getUserProfile().id,
                'especieAtividade.id': 'eq:' + valor.especieAtividade.id
            },
            valor: valor
        }));
    }

    create () : void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }
}
