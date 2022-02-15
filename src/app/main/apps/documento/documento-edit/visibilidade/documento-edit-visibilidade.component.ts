import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {Documento, Pagination, Usuario, Visibilidade} from '@cdk/models';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'documento-edit-visibilidade',
    templateUrl: './documento-edit-visibilidade.component.html',
    styleUrls: ['./documento-edit-visibilidade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditVisibilidadeComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;
    documento$: Observable<Documento>;
    documento: Documento;

    visibilidades$: Observable<Visibilidade[]>;
    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;

    deletingVisibilidadeIds$: Observable<any>;
    deletedVisibilidadeIds$: Observable<any>;
    visibilidadeIsSaving$: Observable<boolean>;
    errors$: Observable<any>;
    lote: string;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    formAcessoRestrito = false;
    loadingAcessoRestrito$: Observable<boolean>;

    _profile: Usuario;

    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _sanitizer
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditVisibilidadeAppState>,
        private _location: Location,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));

        this._profile = _loginService.getUserProfile();
        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeList));
        this.visibilidade$ = this._store.pipe(select(fromStore.getVisibilidade));
        this.deletingVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletingVisibilidadeIds));
        this.deletedVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletedVisibilidadeIds));
        this.loadingAcessoRestrito$ = this._store.pipe(select(fromStore.getVisibilidadeIsLoading));
        this.visibilidadeIsSaving$ = this._store.pipe(select(fromStore.getIsSavingVisibilidade));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.visibilidade$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(visibilidade => this.visibilidade = visibilidade);
        this.documento$.pipe(
            filter(documento => !!documento),
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);

        if (!this.visibilidade) {
            this.visibilidade = new Visibilidade();
        }

    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/visibilidade';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then( (componentFactory)  => {
                            this.container.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    showFormAcessoRestrito(): void {
        this.formAcessoRestrito = !this.formAcessoRestrito;
    }

    submitVisibilidade(visibilidade): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVisibilidadeDocumento({
            documentoId: this.documento.id,
            visibilidade: visibilidade,
            operacaoId: operacaoId
        }));
        this.visibilidadeIsSaving$.subscribe((next) => {
            if (!next) {
                this.formAcessoRestrito = false;
            }
        });
    }

    deleteVisibilidade(visibilidadeId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteVisibilidade({
            visibilidadeId: visibilidadeId,
            operacaoId: operacaoId,
            loteId: loteId,
            documentoId: this.routerState.params.documentoHandle
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.deleteVisibilidade(id, this.lote));
    }

}
