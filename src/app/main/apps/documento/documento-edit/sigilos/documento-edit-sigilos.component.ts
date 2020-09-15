import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, Input,
    OnDestroy,
    OnInit, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {Router} from '@angular/router';
import {Documento, Pagination, Sigilo, Usuario} from '@cdk/models';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../../../../auth/login/login.service';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'documento-edit-sigilos',
    templateUrl: './documento-edit-sigilos.component.html',
    styleUrls: ['./documento-edit-sigilos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditSigilosComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    documento: Documento;

    pagination: any;

    sigilo$: Observable<Sigilo>;
    sigilo: Sigilo;
    sigilos$: Observable<Sigilo[]>;
    formSigilos = false;
    sigiloIsSaving$: Observable<boolean>;
    sigiloErrors$: Observable<any>;
    sigiloLoading$: Observable<boolean>;
    deletingSigiloIds$: Observable<any>;
    deletedSigiloIds$: Observable<any>;
    paginationSigilo$: Observable<any>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    _profile: Usuario;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    routerState: any;

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
        private _store: Store<fromStore.DocumentoEditSigilosAppState>,
        private _location: Location,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef
    ) {
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._profile = _loginService.getUserProfile();
        this.sigilos$ = this._store.pipe(select(fromStore.getSigilos));
        this.sigiloIsSaving$ = this._store.pipe(select(fromStore.getIsSavingSigilos));
        this.sigiloErrors$ = this._store.pipe(select(fromStore.getErrorsSigilos));
        this.deletingSigiloIds$ = this._store.pipe(select(fromStore.getDeletingSigiloIds));
        this.deletedSigiloIds$ = this._store.pipe(select(fromStore.getDeletedSigiloIds));
        this.sigiloLoading$ = this._store.pipe(select(fromStore.getSigilosIsLoading));
        this.paginationSigilo$ = this._store.pipe(select(fromStore.getSigilosPagination));
        this.sigilo$ = this._store.pipe(select(fromStore.getSigilo));

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
        this.sigilo$.subscribe(
            (sigilo) => {
                this.sigilo = sigilo;
            }
        );

        this.paginationSigilo$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {

                this.pagination = pagination;

            } else {
                this.pagination = pagination;
            }
        });

    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/sigilos';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => {
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    showFormSigilos(): void {
        this.formSigilos = !this.formSigilos;
    }

    submitSigilo(values): void {

        const sigilo = new Sigilo();

        Object.entries(values).forEach(
            ([key, value]) => {
                sigilo[key] = value;
            }
        );

        sigilo.documento = this.documento;
        this._store.dispatch(new fromStore.SaveSigiloDocumento({documentoId: this.documento.id, sigilo: sigilo}));

        this.sigiloIsSaving$.subscribe((next) => {
            if (!next) {
                this.formSigilos = false;
            }
        });

        this.sigiloErrors$.subscribe((next) => {
            if (next) {
                this.formSigilos = true;
            }
        });
    }

    editSigilo(sigiloId: number): void {
        this.formSigilos = true;
        this._store.dispatch(new fromStore.GetSigilo({sigiloId: sigiloId}));
    }

    deleteSigilo(sigiloId: number): void {
        this._store.dispatch(new fromStore.DeleteSigilo({documentoId: this.documento.id, sigiloId: sigiloId}));
    }

    reloadSigilos(params): void {
        this._store.dispatch(new fromStore.GetSigilos({
            ...this.pagination,
            filter: {
                'documento.id': 'eq:' + this.documento.id
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }
}
