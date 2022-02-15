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
import {Assinatura, ComponenteDigital, Documento, DocumentoAvulso, Pagination, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as AssinaturaStore from 'app/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {DynamicService} from 'modules/dynamic.service';
import {getRouterState} from 'app/store';
import {getDocumentoAvulso, getDocumentosComplementares} from './store';
import {filter, takeUntil} from 'rxjs/operators';
import {modulesConfig} from 'modules/modules-config';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'responder',
    templateUrl: './responder.component.html',
    styleUrls: ['./responder.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ResponderComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;
    documentos$: Observable<Documento[]>;
    documentosComplementares$: Observable<Documento[]>;
    pagination$: Observable<any>;
    pagination: Pagination;

    selectedDocumentos$: Observable<Documento[]>;
    resposta: Documento[] = [];
    oficios: Documento[] = [];
    selectedOficios: Documento[] = [];

    documentoAvulsoOrigem: DocumentoAvulso;

    mode: string;
    chaveAcesso: any;

    routerState: any;

    isSavingDocumentos$: Observable<boolean>;
    isLoadingDocumentos$: Observable<boolean>;
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;

    errors$: Observable<any>;
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
        private _store: Store<fromStore.DocumentoAvulsoResponderAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService
    ) {
        this._profile = this._loginService.getUserProfile();
        this.documentoAvulso$ = this._store.pipe(select(getDocumentoAvulso));
        this.documentosComplementares$ = this._store.pipe(select(getDocumentosComplementares));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.isSavingDocumentos$ = this._store.pipe(select(fromStore.getIsSavingDocumentos));
        this.isLoadingDocumentos$ = this._store.pipe(select(fromStore.getIsLoadingDocumentos));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
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
            this.documentoAvulsoOrigem = routerState.state.params['documentoAvulsoHandle'];
        });

        this.documentoAvulso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentoAvulso) => {
            this.documentoAvulso = documentoAvulso;

            if (this.documentoAvulso.documentoResposta && this.oficios.length < 1) {
                this.resposta = [this.documentoAvulso.documentoResposta];
            }

            this._changeDetectorRef.markForCheck();
        });

        this.documentosComplementares$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentosComplementares) => {
            this.oficios = documentosComplementares;
            this._changeDetectorRef.detectChanges();
        });

        this.pagination$.pipe(
            filter(pagination => !!pagination),
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.pagination = pagination);

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedOficios = selectedDocumentos;
        });
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/processo/processo-edit/documentos-avulsos/responder';
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    responderDocumento(): void {
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

    doAssinaturaBloco(result): void {
        if (result.certificadoDigital) {
            const documentosId = [];
            result.documentos.forEach((documento) => {
                documentosId.push(documento.id);
            });
            this._store.dispatch(new AssinaturaStore.AssinaDocumento(documentosId));
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
                    this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                        assinatura: assinatura,
                        documento: documento,
                        operacaoId: operacaoId,
                        loteId: lote
                    }));
                });
            });
        }
    }

    doAssinatura(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
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
                this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
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
        this._store.dispatch(new fromStore.GetDocumentoResposta({id: `eq:${this.documentoAvulso.id}`}));
    }

    paginaDocumentos(): void {
        if (this.oficios.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetDocumentosComplementares(nparams));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }
}
