import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Assinatura, ComponenteDigital, Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'documento-edit-anexos',
    templateUrl: './documento-edit-anexos.component.html',
    styleUrls: ['./documento-edit-anexos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAnexosComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;

    isSaving$: Observable<boolean>;

    documento: Documento;

    documentosVinculados$: Observable<Documento[]>;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    javaWebStartOK = false;
    lote: string;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    routerState: any;

    assinaturaInterval = null;

        /**
         *
         * @param _store
         * @param _location
         * @param _router
         * @param _dynamicService
         * @param _activatedRoute
         */
    constructor(
        private _store: Store<fromStore.DocumentoEditAnexosAppState>,
        private _location: Location,
        private _router: Router,
        private _dynamicService: DynamicService,
        private _activatedRoute: ActivatedRoute
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosVinculadosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));

        this._store
            .pipe(
                select(getMercureState),
            ).subscribe((message) => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoSuccess(message.content.documentoId));
                        break;
                }
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.subscribe(documento => this.documento = documento);

        this.assinandoDocumentosVinculadosId$.subscribe((assinandoDocumentosVinculadosId) => {
            if (assinandoDocumentosVinculadosId.length > 0) {
                this.assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosVinculadosId.length > 0)) {
                        assinandoDocumentosVinculadosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(documentoId))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this.assinaturaInterval);
            }
            this.assinandoDocumentosVinculadosId = assinandoDocumentosVinculadosId;
        });

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/anexos';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
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

    aprovar(): void {
        this._store.dispatch(new fromStore.ApproveComponenteDigital({
            documentoOrigem: this.documento
        }));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    doDeleteDocumentoVinculado(documentoId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado({
            documentoId: documentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doDeleteBloco(documentos: Documento[]): void {
        this.lote = CdkUtils.makeId();
        documentos.forEach((documento: Documento) => this.doDeleteDocumentoVinculado(documento.id));
    }

    doAssinaturaDocumentoVinculado(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumentoVinculado(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                this._store.dispatch(new fromStore.AssinaDocumentoVinculadoEletronicamente({
                    assinatura: assinatura
                }));
            });
        }
    }

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadP7S(componenteDigital));
        });
    }

    onCompleteDocumentoVinculado(): void {
        this._store.dispatch(new fromStore.GetDocumentosVinculados());
    }

    anexarCopia(): void {
        const rota = 'anexar-copia/' + this.documento.processoOrigem.id + '/visualizar/capa/mostrar';
        this._router.navigate(
            [
                this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                {outlets: {primary: rota}}
            ],
            {relativeTo: this._activatedRoute.parent}).then();
    }
}
