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
import {Documento, Pagination, Sigilo, Usuario} from '@cdk/models';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'documento-edit-sigilos',
    templateUrl: './documento-edit-sigilos.component.html',
    styleUrls: ['./documento-edit-sigilos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditSigilosComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    documento$: Observable<Documento>;
    documento: Documento;

    pagination: any;

    sigilo$: Observable<Sigilo>;
    sigilo: Sigilo;
    sigilos$: Observable<Sigilo[]>;
    formSigilos = false;
    sigiloIsSaving$: Observable<boolean>;
    sigiloErrors$: Observable<any>;
    sigiloLoading$: Observable<boolean>;
    paginationSigilo$: Observable<any>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    routerState: any;
    lote: string;
    _profile: Usuario;
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
     * @param _matDialog
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditSigilosAppState>,
        private _location: Location,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._profile = _loginService.getUserProfile();
        this.sigilos$ = this._store.pipe(select(fromStore.getSigilos));
        this.sigiloIsSaving$ = this._store.pipe(select(fromStore.getIsSavingSigilos));
        this.sigiloErrors$ = this._store.pipe(select(fromStore.getErrorsSigilos));
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
        this.sigilo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((sigilo) => {
            this.sigilo = sigilo;
        });
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);

        this.paginationSigilo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reloadSigilos(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });
        this.sigiloIsSaving$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((next) => {
            if (!next) {
                this.formSigilos = false;
            }
        });
        this.sigiloErrors$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((next) => {
            if (next) {
                this.formSigilos = true;
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/sigilos';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
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
        this._store.dispatch(new fromStore.UnloadSigilos());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    showFormSigilos(): void {
        this.formSigilos = !this.formSigilos;
    }

    submitSigilo(values): void {
        if (this.sigilo) {
            this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                    // eslint-disable-next-line max-len
                    message: 'Atenção, a desclassificação, redução do grau de sigilo ou alteração de restrição de acesso de um documento precisam ser confimadas. Deseja prosseguir?'
                },
                disableClose: true
            });

            this.confirmDialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    this.doSalvarSigilo(values);
                }

                this.confirmDialogRef = null;
            });
        } else {
            this.doSalvarSigilo(values);
        }
    }

    doSalvarSigilo(values): void {
        const sigilo = new Sigilo();

        Object.entries(values).forEach(
            ([key, value]) => {
                sigilo[key] = value;
            }
        );

        sigilo.documento = this.documento;
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveSigiloDocumento({
            documentoId: this.documento.id,
            sigilo: sigilo,
            operacaoId: operacaoId
        }));
    }

    editSigilo(sigiloId: number): void {
        this.formSigilos = true;
        this._store.dispatch(new fromStore.GetSigilo({sigiloId: sigiloId}));
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
            populate: []
        }));
    }
}
