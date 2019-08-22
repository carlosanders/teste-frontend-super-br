import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Favorito} from '@cdk/models/favorito.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from '../../../../auth/login/login.service';
import {Pagination} from '@cdk/models/pagination';

import {catchError, takeUntil} from 'rxjs/operators';
import {FavoritoService} from '@cdk/services/favorito.service';


@Component({
    selector: 'favorito-setor-responsavel-list',
    templateUrl: './favorito-setor-responsavel-list.component.html',
    styleUrls: ['./favorito-setor-responsavel-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FavoritoSetorResponsavelListComponent implements OnInit, OnDestroy {

    routerState: any;
    favoritos$: Observable<Favorito[]>;
    favoritos: Favorito[];

    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    showSetorResponsavel = true;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    favorito: Favorito;
    displayedColumns: string[] = ['id', 'nome', 'descricao', 'actions'];
    actions: string[] = ['favorito'];

    private _unsubscribeAll: Subject<any> = new Subject();

    templatePagination: Pagination;
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
        private _store: Store<fromStore.FavoritoListAppState>,
        private _loginService: LoginService,
        private _favoritoService: FavoritoService
    ) {
        this.favoritos$ = this._store.pipe(select(fromStore.getFavoritoList));
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

        this.reload({...this.pagination});
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    reload (params): void {
        this._store.dispatch(new fromStore.GetFavoritos({
            ...this.pagination,
            filter: {
                'setorResponsavel': 'isNotNull',
                'prioritario': 'eq:' + 'true',
                'usuario.id': 'eq:' + this._loginService.getUserProfile().usuario.id
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate,
                'setorResponsavel'
            ]
        }));
    }

    edit(favoritoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + favoritoId]);
    }

    delete($event: number): void {
        
    }

    doToggleFavorito(favorito: Favorito): void {
        this._store.dispatch(new fromStore.ToggleFavoritoSetorResponsavel(favorito));
        this.reload({...this.pagination});
    }

    submit(values): void {

        const usuario = new Usuario();
        usuario.id = this._loginService.getUserProfile().usuario.id;

        // busca e verifica se existe, se sim update, senao insert
        this._favoritoService.query(
            `{"usuario.id": "eq:${usuario.id}","setorResponsavel.id": "eq:${values.setorResponsavel.id}"}`,
            5,
            0,
            '{}',
            '["populateAll"]')
            .pipe(
                catchError(() => {
                        return of([]);
                    }
                )
            ).subscribe(
            value => {

                this.favorito = value['entities'];

                if (this.favorito[0])
                {
                    this.favorito[0].setorResponsavel = values.setorResponsavel;
                    this.favorito[0].prioritario = true;
                }
                else {
                    const favorito = new Favorito();
                    favorito.prioritario = true;
                    favorito.qtdUso = 1;
                    favorito.setorResponsavel = values.setorResponsavel;
                    favorito.usuario = usuario;
                    this.favorito[0] = favorito;
                }

                this._store.dispatch(new fromStore.SaveFavorito(this.favorito[0]));
                this.reload({...this.pagination});
            }
        );

    }
}
