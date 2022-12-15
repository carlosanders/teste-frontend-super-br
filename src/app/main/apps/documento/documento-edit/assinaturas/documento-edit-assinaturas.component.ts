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
import {Assinatura, Documento} from '@cdk/models';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, take, takeUntil} from 'rxjs/operators';
import {getDocumento} from '../../store';
import {
    CdkAssinaturaEletronicaPluginComponent
} from "../../../../../../@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component";
import * as AssinaturaStore from "../../../../../store";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'documento-edit-assinaturas',
    templateUrl: './documento-edit-assinaturas.component.html',
    styleUrls: ['./documento-edit-assinaturas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAssinaturasComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documento$: Observable<Documento>;
    documento: Documento;
    pagination: any;
    formAssinaturas = false;
    assinatura: Assinatura;
    assinaturas$: Observable<Assinatura[]>;
    assinaturaLoading$: Observable<boolean>;
    deletingAssinaturaIds$: Observable<any>;
    deletedAssinaturaIds$: Observable<any>;
    deletingAssinaturaErrors$: Observable<any>;
    paginationAssinatura$: Observable<any>;
    lote: string;

    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     * @param _matDialog
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditAssinaturasAppState>,
        private _location: Location,
        private _router: Router,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef,
        private _matDialog: MatDialog,
    ) {
        this.assinaturas$ = this._store.pipe(select(fromStore.getAssinaturas));
        this.documento$ = this._store.pipe(select(getDocumento));
        this.paginationAssinatura$ = this._store.pipe(select(fromStore.getAssinaturasPagination));
        this.deletingAssinaturaIds$ = this._store.pipe(select(fromStore.getDeletingAssinaturaIds));
        this.deletedAssinaturaIds$ = this._store.pipe(select(fromStore.getDeletedAssinaturaIds));
        this.deletingAssinaturaErrors$ = this._store.pipe(select(fromStore.getDeletingAssinaturaErrors));
        this.assinaturaLoading$ = this._store.pipe(select(fromStore.getAssinaturasIsLoading));
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.paginationAssinatura$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {
                this.pagination = pagination;
                this.reloadAssinaturas(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
            this.documento = documento;
        });
    }

    ngAfterViewInit(): void {
        const path1 = 'app/main/apps/documento/documento-edit/assinaturas';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach(((c) => {
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadAssinaturas());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    reloadAssinaturas(params): void {
        this._store.dispatch(new fromStore.GetAssinaturas({
            ...this.pagination,
            filter: {
                'componenteDigital.id': 'eq:' + this.routerState.params.componenteDigitalHandle
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    delete(assinaturaId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteAssinatura({
            assinaturaId: assinaturaId,
            operacaoId: operacaoId,
            loteId: loteId,
            documentoId: this.documento.id,
            componenteDigitalId: this.routerState.params.componenteDigitalHandle
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    /**
     * Assina um Documento
     */
    doAssinaDocumento(): void {
        const dialogRef = this._matDialog.open(CdkAssinaturaEletronicaPluginComponent, {
            width: '600px'
        });
        const assinaSub = dialogRef.afterClosed().pipe(filter(result => !!result), take(1)).subscribe((result) => {
            assinaSub.unsubscribe();
            if (result.certificadoDigital) {
                this._store.dispatch(new AssinaturaStore.AssinaDocumento([this.documento.id]));
            } else {
                this.documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;
                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: this.documento,
                        componenteDigital: componenteDigital,
                        operacaoId: operacaoId
                    }));
                });
            }
        });
    }

}
