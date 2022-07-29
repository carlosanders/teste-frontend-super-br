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
import {Observable, of, Subject} from 'rxjs';
import * as fromStore from './store';
import {Assinatura, ComponenteDigital, Documento, DocumentoAvulso, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {CdkUtils} from '@cdk/utils';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Back, getRouterState} from '../../../../../store';
import {ActivatedRoute, Router} from '@angular/router';
import * as AssinaturaStore from '../../../../../store';
import {CriadoAnexoDocumento} from '../../store';

@Component({
    selector: 'documento-avulso-edit-dados-basicos',
    templateUrl: './documento-avulso-edit-dados-basicos.component.html',
    styleUrls: ['./documento-avulso-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    /**
     * Criando ponto de entrada para extensões do componente de edição de documento avulso, permitindo
     * informar status da remessa oriundos de módulos diferentes da remessa manual
     */
    @ViewChild('dynamicStatus', {static: false, read: ViewContainerRef}) containerStatus: ViewContainerRef;

    @ViewChild('cdkUpload', {static: false})
    cdkUpload;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    documento$: Observable<Documento>;
    documento: Documento;

    isSaving$: Observable<boolean>;
    isRemetendo$: Observable<boolean>;
    remetendo: boolean = false;
    errors$: Observable<any>;
    errorsRemetendo$: Observable<any>;
    errorsRemetendo: any;

    remeterDocAvulso = false;

    documentos$: Observable<Documento[]>;
    oficios: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedOficios: Documento[] = [];
    selectedIds$: Observable<number[]>;
    disabledIds: number[] = [];
    assinandoDocumentosId$: Observable<number[]>;
    alterandoDocumentosId$: Observable<number[]>;

    documentosVinculados$: Observable<Documento[]>;
    documentosVinculados: Documento[];
    pagination$: Observable<any>;
    pagination: Pagination;
    actions = ['delete', 'alterarTipo', 'removerAssinatura', 'converterPDF', 'converterHTML', 'downloadP7S', 'verResposta', 'select'];
    isSavingDocumentosVinculados$: Observable<boolean>;
    isLoadingDocumentosVinculados$: Observable<boolean>;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    alterandoDocumentosVinculadosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    assinaturaErrors$: Observable<any>;
    assinaturaErrosDocumentosId$: Observable<number[]>;
    errorsAssinatura: string = null;
    lote: string;

    routerState: any;

    loadingDocumentos$: Observable<boolean>;

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _dynamicService
     * @param _componenteDigitalService
     * @param _ref
     * @param _router
     * @param _activatedRoute
     * @param _matDialog
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoEditDadosBasicosAppState>,
        private _location: Location,
        private _dynamicService: DynamicService,
        private _componenteDigitalService: ComponenteDigitalService,
        private _ref: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.isRemetendo$ = this._store.pipe(select(fromStore.getIsRemetendo));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.errorsRemetendo$ = this._store.pipe(select(fromStore.getErrorsRemetendo));

        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.alterandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosVinculadosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosVinculadosP7SId));
        this.isSavingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsSavingDocumentosVinculados));
        this.isLoadingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsLoadingDocumentosVinculados));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getDocumentosVinculadosPagination));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoIds));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosVinculadosId));
        this.assinaturaErrors$ = this._store.pipe(select(AssinaturaStore.getAssinaturaErrors));
        this.assinaturaErrosDocumentosId$ = this._store.pipe(select(AssinaturaStore.getAssinaturaErrosDocumentosId));
        this.loadingDocumentos$ = this._store.pipe(select(fromStore.getDocumentosLoading));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.pipe(
            filter(documento => !!documento),
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => {
            this.documento = documento;
            if (!documento.minuta && documento.vinculacoesDocumentos?.length > 0) {
                // permitir desvincular
                this.actions = ['delete', 'desvincular', 'alterarTipo', 'removerAssinatura', 'converterPDF', 'converterHTML', 'downloadP7S', 'verResposta', 'select'];
            }
        });

        this.pagination$.pipe(
            filter(pagination => !!pagination),
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.pagination = pagination);

        this.isRemetendo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((remetendo) => {
            this.remetendo = remetendo;
            this._ref.detectChanges();
        })

        this._componenteDigitalService.completedEditorSave.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((value) => {
            this._componenteDigitalService.saving.next(false);
            if (value === this.documento.id && this.remeterDocAvulso) {
                this._store.dispatch(new fromStore.RemeterDocumentoAvulso({
                    documentoAvulsoRemessa: this.documento.documentoAvulsoRemessa,
                    documentoId: this.documento.id,
                    uuid: this.documento.uuid
                }));
                this._ref.detectChanges();
            }
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedOficios = selectedDocumentos.filter(documento => documento.minuta && !!documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documentos) => {
            this.oficios = documentos.filter(documento =>
                (!!documento.documentoAvulsoRemessa && documento.minuta && !documento.apagadoEm));
            this._ref.markForCheck();
        });

        this.documentosVinculados$.pipe(
            filter(documentos => !!documentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentos => this.documentosVinculados = documentos);

        this.errorsRemetendo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(err => this.errorsRemetendo = CdkUtils.errorsToString(err));

        this.assinaturaErrors$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((err) => {
            if (err) {
                this.errorsAssinatura = CdkUtils.errorsToString(err);
            } else {
                this.errorsAssinatura = null;
            }
        })
    }

    ngAfterViewInit(): void {
    }

    iniciaModulos(): void {
        const path2 = 'app/main/apps/documento/documento-avulso-edit#status';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path2)) {
                module.components[path2].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            this.containerStatus.createComponent(componentFactory);
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
        this.remeterDocAvulso = false;
        this._store.dispatch(new fromStore.UnloadDocumentos());
        this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
        this._store.dispatch(new fromStore.UnloadDocumentoAvulso());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    remeterDocumentoAvulso(): void {
        this.confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'Esta operação não pode ser desfeita. Deseja realmente remeter o ofício?'
            },
            disableClose: false
        });

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (!this.documento.assinado) {
                    this.remeterDocAvulso = true;
                    this._componenteDigitalService.doEditorSave.next(this.documento.id);
                } else {
                    this.remeterDocAvulso = true;
                    this._store.dispatch(new fromStore.RemeterDocumentoAvulso({
                        documentoAvulsoRemessa: this.documento.documentoAvulsoRemessa,
                        documentoId: this.documento.id,
                        uuid: this.documento.uuid
                    }));
                }
            }
            this.confirmDialogRef = null;
        });
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    hasChanges(): boolean {
        const editor = window['CKEDITOR'];
        if (editor && editor.instances) {
            for (const editorInstance in editor.instances) {
                if (editor.instances.hasOwnProperty(editorInstance) && editor.instances[editorInstance]) {
                    if (editor.instances[editorInstance].checkDirty()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    podeNavegarDoEditor(): Observable<boolean> {
        if (this.hasChanges()) {
            this._componenteDigitalService.doEditorSave.next(true);
            return this._componenteDigitalService.completedEditorSave.asObservable();
        } else {
            return of(true);
        }
    }

    onClicked(event): void {
        const documento = event.documento;
        this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
            if (result) {
                const sidebar = 'oficio/dados-basicos';
                if (event.event.ctrlKey) {
                    const extras = {
                        queryParams: {
                            novaAba: true
                        }
                    };
                    const url = this._router.createUrlTree([
                        this.routerState.url.split('/documento/' + this.routerState.params.documentoHandle)[0] +
                        '/documento/' + documento.id,
                        {
                            outlets: {
                                sidebar: sidebar
                            }
                        }
                    ], extras);
                    window.open(url.toString(), '_blank');
                } else {
                    // this._componenteDigitalService.trocandoDocumento.next(true);
                    this._router.navigate([
                            this.routerState.url.split('/documento/' + this.routerState.params.documentoHandle)[0] +
                            '/documento/' + documento.id,
                            {
                                outlets: {
                                    sidebar: sidebar
                                }
                            }],
                        {
                            relativeTo: this._activatedRoute.parent,
                            queryParams: {lixeira: null}
                        }).then();
                }
            }
        });
    }

    onClickedDocumentoVinculado(documento): void {
        if (this.documento.estaVinculada) {
            return this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
        }
        this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
            if (result) {
                return this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
            }
        });
    }

    toggleEncerramento(): void {
        this._store.dispatch(new fromStore.ToggleEncerramentoDocumentoAvulso(this.documento.documentoAvulsoRemessa));
    }

    submit(values): void {

        if (!this.documento.assinado && this.documento.componentesDigitais[0].editavel) {
            this.remeterDocAvulso = false;
            this._componenteDigitalService.doEditorSave.next(this.documento.id);
        }

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveDocumentoAvulso({
            documentoAvulso: documentoAvulso,
            documentoId: this.documento.id,
            operacaoId: operacaoId
        }));
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

    doAssinaturaDocumentoVinculado(result): void {
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

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumentoVinculado(values));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadP7SVinculado(componenteDigital));
        });
    }

    onCompleteDocumentoVinculado(): void {
        this._store.dispatch(new fromStore.SetSavingComponentesDigitais());
    }

    onCompleteAllDocumentosVinculados(): void {
        this._store.dispatch(new CriadoAnexoDocumento(this.documento.id));
        this._store.dispatch(new fromStore.ReloadDocumentosVinculados());
    }

    paginaDocumentosVinculados(): void {
        if (this.documentosVinculados.length >= this.pagination.total) {
            return;
        }

        const nparams = {
            ...this.pagination,
            offset: this.pagination.offset + this.pagination.limit
        };

        this._store.dispatch(new fromStore.GetDocumentosVinculados(nparams));
    }

    doRemoveAssinatura(documentoId: number): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    doDeleteDocumentoVinculado(documentoId, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado({
            documentoVinculadoId: documentoId,
            documentoId: this.documento.id,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doDeleteBloco(documentosId: number[]): void {
        this.lote = CdkUtils.makeId();
        documentosId.forEach((documentoId: number) => this.doDeleteDocumentoVinculado(documentoId, this.lote));
    }

    anexarCopia(): void {
        if (this.documento.estaVinculada) {
            const rota = 'anexar-copia/' + this.documento.processoOrigem.id;
            this._router.navigate(
                [
                    this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                    {outlets: {primary: rota}}
                ],
                {relativeTo: this._activatedRoute.parent}
            ).then(() => {
            });
            return;
        }
        this.podeNavegarDoEditor().pipe(take(1)).subscribe((result) => {
            if (result) {
                const rota = 'anexar-copia/' + this.documento.processoOrigem.id;
                this._router.navigate(
                    [
                        this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                        {outlets: {primary: rota}}
                    ],
                    {relativeTo: this._activatedRoute.parent}
                ).then(() => {
                });
            }
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
