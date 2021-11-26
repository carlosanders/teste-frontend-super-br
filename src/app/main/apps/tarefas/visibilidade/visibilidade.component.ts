import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Pagination, Usuario, Visibilidade} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Back} from '../../../../store';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'visibilidade',
    templateUrl: './visibilidade.component.html',
    styleUrls: ['./visibilidade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VisibilidadeComponent implements OnInit, OnDestroy {

    loading$: Observable<boolean>;
    isSaving$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    lote: string;

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
    private _unsubscribeAll: Subject<any> = new Subject();

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
        public _loginService: LoginService
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

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    ngOnInit(): void {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    showFormAcessoRestrito(): void {
        this.formAcessoRestrito = !this.formAcessoRestrito;
    }

    doAbort(): void {
        this._store.dispatch(new Back());
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

    delete(visibilidadeId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteVisibilidade({
            processoId: this.routerState.params.processoHandle,
            visibilidadeId: visibilidadeId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVisibilidade({
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
            populate: this.pagination.populate
        }));
    }

}
