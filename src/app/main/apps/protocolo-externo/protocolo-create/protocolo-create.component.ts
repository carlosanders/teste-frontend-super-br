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
import * as fromStoreProtocolo from '../store';
import * as AssinaturaStore from 'app/store';
import {Assinatura, ComponenteDigital, Documento, Estado, Pagination, Pessoa, Processo, Usuario} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {getMercureState, getRouterState} from '../../../../store';
import {FormBuilder} from '@angular/forms';
import {getPessoa} from '../store';
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'protocolo-create',
    templateUrl: './protocolo-create.component.html',
    styleUrls: ['./protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloCreateComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('cdkUpload', {static: false})
    cdkUpload;

    @ViewChild('dynamicComponent', {static: true, read: ViewContainerRef})
    container: ViewContainerRef;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    pessoaProcedencia$: Observable<Pessoa>;
    pessoaProcedencia: Pessoa;

    unidadePagination: Pagination;
    procedenciaPagination: Pagination;

    processo$: Observable<Processo>;
    processo: Processo;

    estados: Estado[] = [];

    documentos: Documento[] = [];
    documentos$: Observable<Documento[]>;
    pagination$: Observable<any>;
    pagination: Pagination;
    assinandoDocumentosId$: Observable<number[]>;
    deletingDocumentosId$: Observable<number[]>;
    convertendoDocumentosId$: Observable<number[]>;
    downloadP7SDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    selectedDocumentos$: Observable<Documento[]>;
    selectedDocumentos: Documento[];
    isSavingDocumentos$: Observable<boolean>;
    isLoadingDocumentos$: Observable<boolean>;
    alterandoDocumentosId$: Observable<number[]>;
    routerState: any;
    selectedIndex: number;
    titulo: string;
    paramHandle: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    /**
     * @param _store
     * @param _storeProtocolo
     * @param dialog
     * @param _router
     * @param _formBuilder
     * @param _changeDetectorRef
     * @param _loginService
     * @param _dynamicService
     */
    constructor(
        private _store: Store<fromStore.ProtocoloCreateAppState>,
        private _storeProtocolo: Store<fromStoreProtocolo.ProcessosState>,
        public dialog: MatDialog,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private _dynamicService: DynamicService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoaProcedencia$ = this._store.pipe(select(getPessoa));
        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoAllDocumentosId));
        this.alterandoDocumentosId$ = this._store.pipe(select(fromStore.getAlterandoDocumentosId));
        this.downloadP7SDocumentosId$ = this._store.pipe(select(fromStore.getDownloadDocumentosP7SId));
        this.isSavingDocumentos$ = this._store.pipe(select(fromStore.getIsSavingProtocoloDocumento));
        this.isLoadingDocumentos$ = this._store.pipe(select(fromStore.getIsLoadingProtocoloDocumento));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this._profile = this._loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.populate = ['unidade', 'parent', 'especieSetor'];
        this.unidadePagination.filter = {'especieSetor.nome': 'eq:PROTOCOLO'};

        this.procedenciaPagination = new Pagination();
        this.procedenciaPagination.filter = {id: `in:${this._profile.vinculacoesPessoasUsuarios.map(pessoaConveniada => pessoaConveniada.pessoa.id).join(',')}`};
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
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.pagination$.pipe(
            filter(pagination => !!pagination),
            takeUntil(this._unsubscribeAll)
        ).subscribe(pagination => this.pagination = pagination);

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedDocumentos = selectedDocumentos;
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe((processo) => {
            this.processo = processo;
            this._changeDetectorRef.markForCheck();
        });

        this.pessoaProcedencia$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(pessoa => !!pessoa)
        ).subscribe((pessoa) => {
            this.pessoaProcedencia = pessoa;
        });

        this.documentos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(documentos => !!documentos)
        ).subscribe((documentos) => {
            this.documentos = documentos;
            this._changeDetectorRef.markForCheck();
        });

        if (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 2;
            this.processo.tipoProtocolo = 1;
            this.processo.protocoloEletronico = true;

            if (this._profile.vinculacoesPessoasUsuarios.length === 1) {
                this.processo.procedencia = this.pessoaProcedencia;
            }
        }

        this.getEstados();
        this.unloadProcesso();
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/protocolo-externo/protocolo-create';
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

        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const processo = new Processo();

        delete values.estado;
        delete values.generoSetor;

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        processo.procedencia = this.pessoaProcedencia;
        processo.titulo = values.setorAtual.especieSetor.nome;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveProcesso({
            processo: processo,
            operacaoId: operacaoId
        }));
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    cancel(): void {
        this._router.navigate([
            '/apps/protocolo-externo/' + this.routerState.params.typeHandle + '/' + this.routerState.params.targetHandle
        ]).then();
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.SetSavingComponentesDigitais());
    }

    onCompleteAllDocumentos(): void {

        const params = {
            filter: {
                'processoOrigem.id': `eq:${this.processo.id}`,
                'criadoPor.id': `eq:${this._loginService.getUserProfile().id}`
            },
            limit: 10,
            offset: 0,
            sort: {criadoEm: 'DESC'},
            populate: [
                'populateAll',
                'tipoDocumento',
                'documentoAvulsoRemessa',
                'documentoAvulsoRemessa.documentoResposta',
                'componentesDigitais',
                'juntadaAtual'
            ]
        };

        this._store.dispatch(new fromStore.UnloadDocumentos());
        this._store.dispatch(new fromStore.GetDocumentos(params));
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

    onClicked(documento): void {
        const chaveAcesso = this.routerState.params.chaveAcessoHandle ? '/' + this.routerState.params.chaveAcessoHandle : '';
        this._router.navigate([
            this.routerState.url.split('/criar/')[0] + '/documento/' + documento.componentesDigitais[0].id + '/visualizar' + chaveAcesso
        ]).then();
    }

    getEstados(): void {
        this._store.dispatch(new fromStore.GetEstados({}));
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
                        documento: result.documento,
                        processoId: this.processo.id,
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
                    processoId: this.processo.id,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    doRemoveAssinatura(documentoId): void {
        this._store.dispatch(new AssinaturaStore.RemoveAssinaturaDocumento(documentoId));
    }

    doConverte(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doConverteHtml(documentoId): void {
        this._store.dispatch(new fromStore.ConverteToHtml(documentoId));
    }

    doAlterarTipoDocumento(values): void {
        this._store.dispatch(new fromStore.UpdateDocumento(values));
    }

    doDownloadP7S(documento: Documento): void {
        documento.componentesDigitais.forEach((componenteDigital: ComponenteDigital) => {
            this._store.dispatch(new fromStore.DownloadToP7S(componenteDigital.id));
        });
    }

    unloadProcesso(): void {
        this.selectedIndex = 0;
        this.paramHandle = this.routerState.params.typeHandle;

        if (this.routerState.params.processoHandle) {
            this.selectedIndex = 1;
            this._store.dispatch(new fromStore.UnloadProcesso());
        }
    }

    doConcluir(): void {
        this._store.dispatch(new fromStore.ConcluirProcesso());
    }
}
