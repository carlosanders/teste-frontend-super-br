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
import * as AssinaturaStore from 'app/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models/documento.model';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Assinatura, ComponenteDigital, DocumentoAvulso, Pagination, Usuario} from '@cdk/models';
import {getDocumentoAvulso} from '../store';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {CdkUtils} from '@cdk/utils';

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
    documentos: Documento[];
    pagination$: Observable<any>;
    pagination: Pagination;

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
    removendoAssinaturaDocumentosId$: Observable<number[]>;

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
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.isSavingDocumentos$ = this._store.pipe(select(fromStore.getIsSavingDocumentos));
        this.isLoadingDocumentos$ = this._store.pipe(select(fromStore.getIsLoadingDocumentos));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getDocumentosPagination));
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
            const documentoAvulso = new DocumentoAvulso();
            documentoAvulso.id = parseInt(routerState.state.params['documentoAvulsoHandle']);
            this.documentoAvulsoOrigem = documentoAvulso;
            this.chaveAcesso = routerState.state.params['chaveAcessoHandle'];
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
        this._unsubscribeAll.next(true);
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
        this._store.dispatch(new fromStore.ReloadDocumentos());
    }

    paginaDocumentos(): void {
        if (this.documentos.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetDocumentos(nparams));
    }

    doRemoveAssinatura(documentoId: number): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }
}
