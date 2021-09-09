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
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models/documento.model';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Assinatura, ComponenteDigital, DocumentoAvulso, Usuario} from '@cdk/models';
import {getDocumentoAvulso} from '../store';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'complementar',
    templateUrl: './complementar.component.html',
    styleUrls: ['./complementar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComplementarComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;
    documentos$: Observable<Documento[]>;

    selectedDocumentos$: Observable<Documento[]>;
    oficios: Documento[] = [];
    selectedOficios: Documento[] = [];

    documentoAvulsoOrigem: DocumentoAvulso;

    mode: string;
    tipo = 'responder-complementar';
    chaveAcesso: any;

    routerState: any;

    isSavingDocumentos$: Observable<boolean>;
    isLoadingDocumentos$: Observable<boolean>;
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    javaWebStartOK = false;

    assinaturaInterval = null;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.ComplementarAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService
    ) {
        this._profile = this._loginService.getUserProfile();
        this.documentoAvulso$ = this._store.pipe(select(getDocumentoAvulso));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));

        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.isSavingDocumentos$ = this._store.pipe(select(fromStore.getIsSavingDocumentos));
        this.isLoadingDocumentos$ = this._store.pipe(select(fromStore.getIsLoadingDocumentos));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.mode = routerState.state.params['oficioTargetHandle'];
            this.documentoAvulsoOrigem = routerState.state.params['documentoAvulsoHandle'];
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
        });

        this._store.pipe(
            select(getMercureState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((message) => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({
                            id: message.content.documentoId,
                            schema: documentoSchema,
                            changes: {assinado: true}
                        }));
                        break;
                }
            }
        });

        this.documentoAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentoAvulso) => {
            this.documentoAvulso = documentoAvulso;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (documentos) => {
                this.oficios = documentos;
                this._changeDetectorRef.markForCheck();
                this.oficios = this.oficios.concat(this.documentoAvulso.documentoResposta);
            }
        );

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedOficios = selectedDocumentos;
        });

        this.assinandoDocumentosId$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((assinandoDocumentosId) => {
            if (assinandoDocumentosId.length > 0) {
                if (this.assinaturaInterval) {
                    clearInterval(this.assinaturaInterval);
                }
                this.assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this.assinaturaInterval);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/oficios/oficio-detail/complementar';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.container.createComponent(componentFactory);
                            this._changeDetectorRef.markForCheck();
                        });
                }));
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    complementarDocumento(): void {
        this.cdkUpload.upload();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDelete(documentoId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumento({
            documentoId: documentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.doDelete(id, this.lote));
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAssinatura(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumento([result.documento.id]));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    doAssinaturaBloco(result): void {
        if (result.certificadoDigital) {
            const documentosId = [];
            result.documentos.forEach((documento) => {
                documentosId.push(documento.id);
            });
            this._store.dispatch(new fromStore.AssinaDocumento(documentosId));
        } else {
            const lote = CdkUtils.makeId();
            result.documentos.forEach((documento) => {
                documento.componentesDigitais.forEach((componenteDigital) => {
                    const assinatura = new Assinatura();
                    assinatura.componenteDigital = componenteDigital;
                    assinatura.algoritmoHash = 'A1';
                    assinatura.cadeiaCertificadoPEM = 'A1';
                    assinatura.cadeiaCertificadoPkiPath = 'A1';
                    assinatura.assinatura = 'A1';
                    assinatura.plainPassword = result.plainPassword;

                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: documento,
                        operacaoId: operacaoId,
                        loteId: lote
                    }));
                });
            });
        }
    }

    onClicked(documento): void {
        const chaveAcesso = this.routerState.params.chaveAcessoHandle ? '/' + this.routerState.params.chaveAcessoHandle : '';

        this._router.navigate([
            this.routerState.url.split('/detalhe/')[0] + '/documento/' + documento.componentesDigitais[0].id + '/visualizar' + chaveAcesso
        ]).then();
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadP7S(componenteDigital));
        });
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.SetSavingComponentesDigitais());
    }

    onCompleteAllDocumentos(): void {
        this._store.dispatch(new fromStore.GetDocumentos({
            id: `eq:${this.documentoAvulso.documentoResposta.id}`
        }));
    }

    doRemoveAssinatura(documentoId: number): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }
}
