import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
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
import {LoginService} from '../../../../auth/login/login.service';
import {ComponenteDigital, Documento, Sigilo, Usuario} from '@cdk/models';

@Component({
    selector: 'documento-edit-componentes-digitais',
    templateUrl: './documento-edit-componentes-digitais.component.html',
    styleUrls: ['./documento-edit-componentes-digitais.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditComponentesDigitaisComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;

    routerState: any;
    pagination: any;

    _profile: Usuario;

    formComponentesDigitais = false;
    componenteDigital: ComponenteDigital;
    componenteDigital$: Observable<ComponenteDigital>;
    componentesDigitais$: Observable<ComponenteDigital[]>;
    componenteDigitalLoading$: Observable<boolean>;
    deletingComponenteDigitalIds$: Observable<any>;
    deletedComponenteDigitalIds$: Observable<any>;
    paginationComponenteDigital$: Observable<any>;
    componenteDigitalIsSaving$: Observable<boolean>;
    componenteDigitalErrors$: Observable<any>;

    @ViewChild('ckdUploadComponenteDigital', {static: false})
    cdkUploadComponenteDigital;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditComponentesDigitaisAppState>,
        private _location: Location,
        private _router: Router,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.componentesDigitais$ = this._store.pipe(select(fromStore.getComponentesDigitais));
        this.paginationComponenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigitalPagination));
        this.deletingComponenteDigitalIds$ = this._store.pipe(select(fromStore.getDeletingComponenteDigitalIds));
        this.deletedComponenteDigitalIds$ = this._store.pipe(select(fromStore.getDeletedComponenteDigitalIds));
        this.componenteDigitalLoading$ = this._store.pipe(select(fromStore.getComponenteDigitalLoading));
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.componenteDigitalIsSaving$ = this._store.pipe(select(fromStore.getIsSavingComponenteDigital));
        this.componenteDigitalErrors$ = this._store.pipe(select(fromStore.getErrorsComponenteDigital));

        this._profile = _loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.componenteDigital$.subscribe(
            (componenteDigital) => {
                this.componenteDigital = componenteDigital;
            }
        );

        this.paginationComponenteDigital$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reloadComponentesDigitais(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });
    }

    ngAfterViewInit(): void {
        const path1 = 'app/main/apps/documento/documento-edit/componentes-digitais';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach((c => {
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

    editComponenteDigital(componenteDigital: any): void {
        this.formComponentesDigitais = true;
        this._store.dispatch(new fromStore.DownloadComponenteDigital({componenteDigitalId: componenteDigital.componenteDigital.id}));
    }

    onCompleteComponenteDigital(): void {
        this.reloadComponentesDigitais({});
    }

    uploadComponenteDigital(): void {
        this.cdkUploadComponenteDigital.upload();
    }

    deleteComponenteDigital(componenteDigitalId: number): void {
        this._store.dispatch(new fromStore.DeleteComponenteDigital(componenteDigitalId));
    }

    reloadComponentesDigitais(params): void {
        this._store.dispatch(new fromStore.GetComponentesDigitais({
            ...this.pagination,
            filter: {
                'documento.id': 'eq:' + this.routerState.params.documentoHandle
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: []
        }));
    }

    showGridComponentes(): void {
        this.formComponentesDigitais = !this.formComponentesDigitais;
    }

    submitComponenteDigital(values): void {

        this._store.dispatch(new fromStore.PatchComponenteDigital({
            componenteDigital: this.componenteDigital,
            changes: {
                numeracaoSequencial: values.numeracaoSequencial, fileName: values.fileName,
                softwareCriacao: values.softwareCriacao, versaoSoftwareCriacao: values.versaoSoftwareCriacao
            }
        }));

        this.componenteDigitalIsSaving$.subscribe((next) => {
            if (!next) {
                this.formComponentesDigitais = false;
            }
        });

        this.componenteDigitalErrors$.subscribe((next) => {
            if (next) {
                this.formComponentesDigitais = true;
            }
        });
    }
}
