import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Visibilidade} from '@cdk/models';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Pagination} from '@cdk/models';
import {Colaborador} from '@cdk/models';
import {LoginService} from '../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Usuario} from "../../../../../@cdk/models/usuario.model";

@Component({
    selector: 'visibilidade',
    templateUrl: './visibilidade.component.html',
    styleUrls: ['./visibilidade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VisibilidadeComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    loading$: Observable<boolean>;
    isSaving$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    formAcessoRestrito = false;
    loadingAcessoRestrito$: Observable<boolean>;

    operacoes: any[] = [];

    routerState: any;

    filter = {};

    _profile: Usuario;

    visibilidades$: Observable<Visibilidade[]>;
    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;

    deletingVisibilidadeIds$: Observable<any>;
    deletedVisibilidadeIds$: Observable<any>;
    visibilidadeIsSaving$: Observable<boolean>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VisibilidadeAppState>,
        private _loginService: LoginService
    ) {
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeList));
        this.visibilidade$ = this._store.pipe(select(fromStore.getVisibilidade));
        this.deletingVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletingVisibilidadeIds));
        this.deletedVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletedVisibilidadeIds));
        this.loadingAcessoRestrito$ = this._store.pipe(select(fromStore.getVisibilidadeIsLoading));
        this.visibilidadeIsSaving$ = this._store.pipe(select(fromStore.getIsSavingVisibilidade));

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};

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

    }

    showFormAcessoRestrito(): void {
        this.formAcessoRestrito = !this.formAcessoRestrito;
    }

    showFormTarefa(): void {

        this._router.navigate(['/apps/tarefas/' + this.routerState.params.generoHandle + '/' +
        this.routerState.params.typeHandle + '/' +
        this.routerState.params.targetHandle + '/criar']).then();
    }

    submitVisibilidade(visibilidade): void {
        this._store.dispatch(new fromStore.SaveVisibilidadeProcesso({
            processoId: this.routerState.params.processoHandle,
            visibilidade: visibilidade
        }));
        this.visibilidadeIsSaving$.subscribe((next) => {
            if (!next) {
                this.formAcessoRestrito = false;
            }
        });
    }

    deleteVisibilidade(visibilidadeId: number): void {
        this._store.dispatch(new fromStore.DeleteVisibilidade({
            processoId: this.routerState.params.processoHandle,
            visibilidadeId: visibilidadeId
        }));
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVisibilidade({
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

}
