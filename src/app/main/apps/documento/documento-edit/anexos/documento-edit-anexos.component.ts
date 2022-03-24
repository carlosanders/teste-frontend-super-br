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
import * as AssinaturaStore from 'app/store';
import {Assinatura, ComponenteDigital, Documento, Pagination, VinculacaoDocumento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getRouterState} from 'app/store/reducers';
import {DynamicService} from '../../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SetCurrentStep} from '../../../processo/processo-view/store';

@Component({
    selector: 'documento-edit-anexos',
    templateUrl: './documento-edit-anexos.component.html',
    styleUrls: ['./documento-edit-anexos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAnexosComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    documento$: Observable<Documento>;

    isSaving$: Observable<boolean>;

    documento: Documento;

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
    alterandoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    lote: string;

    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _dynamicService
     * @param _activatedRoute
     * @param _changeDetectorRef
     * @param _matDialog
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditAnexosAppState>,
        private _location: Location,
        private _router: Router,
        private _dynamicService: DynamicService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.isSavingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsSavingDocumentosVinculados));
        this.isLoadingDocumentosVinculados$ = this._store.pipe(select(fromStore.getIsLoadingDocumentosVinculados));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.pagination$ = this._store.pipe(select(fromStore.getDocumentosVinculadosPagination));

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
        this.documento$.pipe(
            filter(documento => !!documento),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
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

        this.documentosVinculados$.pipe(
            filter(documentos => !!documentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(documentos => this.documentosVinculados = documentos);
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit/anexos';
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
        this._store.dispatch(new fromStore.UnloadDocumentosVinculados({reset: true}));
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    aprovar(): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.ApproveComponenteDigital({
            documentoOrigem: this.documento,
            operacaoId: operacaoId
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
            documentoVinculadoId: documentoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    doDeleteBloco(documentosId: number[]): void {
        this.lote = CdkUtils.makeId();
        documentosId.forEach((documentoId: number) => this.doDeleteDocumentoVinculado(documentoId, this.lote));
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
            const confirmDialogRef = this._matDialog.open(CdkConfirmDialogComponent, {
                data: {
                    title: 'Confirmação',
                    confirmLabel: 'Sim',
                    cancelLabel: 'Não',
                    message: 'Existem mudanças não salvas no editor que serão perdidas. Deseja continuar?'
                },
                disableClose: false
            });

            return confirmDialogRef.afterClosed();
        } else {
            return of(true);
        }
    }

    onClickedDocumentoVinculado(documento): void {
        if (this.documento.vinculacaoDocumentoPrincipal) {
            return this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
        }
        this.podeNavegarDoEditor().subscribe((result) => {
            if (result) {
                return this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
            }
        });
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
        this._store.dispatch(new fromStore.SetSavingComponentesDigitais());
    }

    onCompleteAllDocumentosVinculados(): void {
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

    doDesvincularBloco(vinculacoesDocumento: VinculacaoDocumento[]): void {
        this.lote = CdkUtils.makeId();
        vinculacoesDocumento.forEach((vinculacaoDocumento: VinculacaoDocumento) => this.doDesvincular(vinculacaoDocumento, this.lote));
    }

    doDesvincular(vinculacaoDocumento: VinculacaoDocumento, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.RemoveVinculacaoDocumento({
            vinculacaoDocumento: vinculacaoDocumento,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    anexarCopia(): void {
        if (this.documento.vinculacaoDocumentoPrincipal) {
            const rota = 'anexar-copia/' + this.documento.processoOrigem.id + '/visualizar/default';
            this._router.navigate(
                [
                    this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                    {outlets: {primary: rota}}
                ],
                {relativeTo: this._activatedRoute.parent}).then(() => {
                this._store.dispatch(new SetCurrentStep({
                    step: 'default',
                    subStep: 0
                }));
            });
            return;
        }
        this.podeNavegarDoEditor().subscribe((result) => {
            if (result) {
                const rota = 'anexar-copia/' + this.documento.processoOrigem.id + '/visualizar/default';
                this._router.navigate(
                    [
                        this.routerState.url.split('/documento/')[0] + '/documento/' + this.routerState.params['documentoHandle'],
                        {outlets: {primary: rota}}
                    ],
                    {relativeTo: this._activatedRoute.parent}).then(() => {
                    this._store.dispatch(new SetCurrentStep({
                        step: 'default',
                        subStep: 0
                    }));
                });
            }
        });
    }
}
