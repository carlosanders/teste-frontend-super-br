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
import * as fromStore from '../store';
import {Documento, Etiqueta, Juntada, VinculacaoEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Repositorio} from '@cdk/models';
import {filter} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {ComponenteDigital} from '@cdk/models';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {Atividade} from '@cdk/models';
import * as moment from 'moment';
import {Tarefa} from '@cdk/models';
import {getTarefa} from '../../tarefas/tarefa-detail/store/selectors';
import {Visibilidade} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {LoginService} from '../../../auth/login/login.service';
import {Sigilo} from '@cdk/models';
import {Assinatura} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {DocumentoEditService} from './shared/documento-edit.service';
import {JuntadaService} from '@cdk/services/juntada.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Back} from '../../../../store/actions';

@Component({
    selector: 'documento-edit',
    templateUrl: './documento-edit.component.html',
    styleUrls: ['./documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;
    documentosVinculados$: Observable<Documento[]>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    atividadeIsSaving$: Observable<boolean>;
    atividadeErrors$: Observable<any>;

    repositorioIdLoadind$: Observable<boolean>;
    repositorioIdLoaded$: Observable<number>;

    componenteDigital$: Observable<ComponenteDigital>;

    repositorios$: Observable<Repositorio[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    javaWebStartOK = false;

    documentoPrincipal: Documento;

    documento: Documento;

    activeCard: string;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    @ViewChild('ckdUploadComponenteDigital', {static: false})
    cdkUploadComponenteDigital;

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('dynamicForm', {read: ViewContainerRef}) containerForm: ViewContainerRef;

    routerState: any;

    atividade: Atividade;

    visibilidades$: Observable<Visibilidade[]>;
    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;

    deletingVisibilidadeIds$: Observable<any>;
    deletedVisibilidadeIds$: Observable<any>;
    visibilidadeIsSaving$: Observable<boolean>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    _profile: Usuario;

    formAcessoRestrito = false;
    loadingAcessoRestrito$: Observable<boolean>;

    sigilo$: Observable<Sigilo>;
    sigilo: Sigilo;
    sigilos$: Observable<Sigilo[]>;
    formSigilos = false;
    sigiloIsSaving$: Observable<boolean>;
    sigiloErrors$: Observable<any>;
    sigiloLoading$: Observable<boolean>;
    deletingSigiloIds$: Observable<any>;
    deletedSigiloIds$: Observable<any>;
    paginationSigilo$: Observable<any>;

    juntadaRoute = false;

    formComponentesDigitais = false;
    componenteDigital: ComponenteDigital;
    componentesDigitais$: Observable<ComponenteDigital[]>;
    componenteDigitalLoading$: Observable<boolean>;
    deletingComponenteDigitalIds$: Observable<any>;
    deletedComponenteDigitalIds$: Observable<any>;
    paginationComponenteDigital$: Observable<any>;

    formAssinaturas = false;
    assinatura: Assinatura;
    assinaturas$: Observable<Assinatura[]>;
    assinaturaLoading$: Observable<boolean>;
    deletingAssinaturaIds$: Observable<any>;
    deletedAssinaturaIds$: Observable<any>;
    paginationAssinatura$: Observable<any>;

    vinculacaoEtiquetaPagination: Pagination;
    savingVinculacaoEtiquetaId$: Observable<any>;
    vinculacaoEtiquetaErrors$: Observable<any>;

    juntada$: Observable<Juntada>;
    juntada: Juntada;
    juntadaIsSaving$: Observable<boolean>;
    juntadaErrors$: Observable<any>;
    formJuntada: FormGroup;

    logEntryPagination: Pagination;

    especieAtividadePagination: Pagination;

    /**
     *
     * @param _store
     * @param _location
     * @param _router
     * @param _repositorioService
     * @param _sanitizer
     * @param _loginService
     * @param _dynamicService
     * @param _ref
     * @param _documentoEditService
     * @param _juntadaService
     * @param _formBuilder
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location,
        private _router: Router,
        private _repositorioService: RepositorioService,
        private _sanitizer: DomSanitizer,
        public _loginService: LoginService,
        private _dynamicService: DynamicService,
        private _ref: ChangeDetectorRef,
        private _documentoEditService: DocumentoEditService,
        private _juntadaService: JuntadaService,
        private _formBuilder: FormBuilder
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosVinculadosId));

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.tarefa$ = this._store.pipe(select(getTarefa));
            this.atividadeIsSaving$ = this._store.pipe(select(fromStore.getAtividadeIsSaving));
            this.atividadeErrors$ = this._store.pipe(select(fromStore.getAtividadeErrors));
        } else {
            this.juntadaRoute = true;
        }

        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeList));
        this.visibilidade$ = this._store.pipe(select(fromStore.getVisibilidade));
        this.deletingVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletingVisibilidadeIds));
        this.deletedVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletedVisibilidadeIds));
        this.loadingAcessoRestrito$ = this._store.pipe(select(fromStore.getVisibilidadeIsLoading));
        this.visibilidadeIsSaving$ = this._store.pipe(select(fromStore.getIsSavingVisibilidade));

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.id}`};

        this.repositorios$ = this._store.pipe(select(fromStore.getRepositorios));
        this.pagination$ = this._store.pipe(select(fromStore.getRepositoriosPagination));
        this.loading$ = this._store.pipe(select(fromStore.getRepositoriosIsLoading));

        this.repositorioIdLoadind$ = this._store.pipe(select(fromStore.getComponenteDigitalLoading));
        this.repositorioIdLoaded$ = this._store.pipe(select(fromStore.getComponenteDigitalLoaded));

        this.sigilos$ = this._store.pipe(select(fromStore.getSigilos));
        this.sigiloIsSaving$ = this._store.pipe(select(fromStore.getIsSavingSigilos));
        this.sigiloErrors$ = this._store.pipe(select(fromStore.getErrorsSigilos));
        this.deletingSigiloIds$ = this._store.pipe(select(fromStore.getDeletingSigiloIds));
        this.deletedSigiloIds$ = this._store.pipe(select(fromStore.getDeletedSigiloIds));
        this.sigiloLoading$ = this._store.pipe(select(fromStore.getSigilosIsLoading));
        this.paginationSigilo$ = this._store.pipe(select(fromStore.getSigilosPagination));
        this.sigilo$ = this._store.pipe(select(fromStore.getSigilo));

        this.assinaturas$ = this._store.pipe(select(fromStore.getAssinaturas));
        this.paginationAssinatura$ = this._store.pipe(select(fromStore.getAssinaturasPagination));
        this.deletingAssinaturaIds$ = this._store.pipe(select(fromStore.getDeletingAssinaturaIds));
        this.deletedAssinaturaIds$ = this._store.pipe(select(fromStore.getDeletedAssinaturaIds));
        this.assinaturaLoading$ = this._store.pipe(select(fromStore.getAssinaturasIsLoading));

        this.componentesDigitais$ = this._store.pipe(select(fromStore.getComponentesDigitais));
        this.paginationComponenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigitalPagination));
        this.deletingComponenteDigitalIds$ = this._store.pipe(select(fromStore.getDeletingComponenteDigitalIds));
        this.deletedComponenteDigitalIds$ = this._store.pipe(select(fromStore.getDeletedComponenteDigitalIds));
        this.componenteDigitalLoading$ = this._store.pipe(select(fromStore.getComponenteDigitalLoading));

        this.vinculacaoEtiquetaPagination = new Pagination();
        this.vinculacaoEtiquetaPagination.filter = {
            'vinculacoesEtiquetas.usuario.id': 'eq:' + this._profile.id,
            'modalidadeEtiqueta.valor': 'eq:DOCUMENTO'
        };
        this.savingVinculacaoEtiquetaId$ = this._store.pipe(select(fromStore.getSavingVinculacaoEtiquetaId));
        this.vinculacaoEtiquetaErrors$ = this._store.pipe(select(fromStore.getVinculacaoEtiquetaErrors));

        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));
        this.juntadaIsSaving$ = this._store.pipe(select(fromStore.getJuntadaIsSaving));
        this.juntadaErrors$ = this._store.pipe(select(fromStore.getJuntadaErrors));

        this.logEntryPagination = new Pagination();

        this._store
            .pipe(
                select(getMercureState),
            ).subscribe(message => {
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

        this.formJuntada = this._formBuilder.group({
            id: [null],
            ativo: [null],
            numeracaoSequencial: [null],
            documento: [null],
            descricao: [null, [Validators.required , Validators.minLength(3), Validators.maxLength(4000)]],
            origemDados: [null],
            volume: [null],
            documentoAvulso: [null],
            atividade: [null],
            tarefa: [null]
        });

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.atividade = new Atividade();
            this.atividade.encerraTarefa = true;
            this.atividade.dataHoraConclusao = moment();

            this.tarefa$.subscribe(tarefa => {
                this.tarefa = tarefa;
                this.atividade.tarefa = tarefa;
                this.atividade.usuario = tarefa.usuarioResponsavel;
                this.atividade.setor = tarefa.setorResponsavel;

                if (tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                    this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
                } else {
                    this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
                }
            });
        }

        this.visibilidade$.subscribe(
            visibilidade => this.visibilidade = visibilidade
        );

        this.sigilo$.subscribe(
            (sigilo) => {
                this.sigilo = sigilo;
            }
        );

        if (!this.visibilidade) {
            this.visibilidade = new Visibilidade();
        }

        this.assinandoDocumentosVinculadosId$.subscribe(assinandoDocumentosVinculadosId => {
            if (assinandoDocumentosVinculadosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosVinculadosId.length > 0)) {
                        assinandoDocumentosVinculadosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosVinculadosId = assinandoDocumentosVinculadosId;
        });

        this.documento$.pipe(
            filter(documento => !this.documento || (documento && (documento.id !== this.documento.id)))
        ).subscribe(documento => {
            this.documento = documento;
            if (documento && documento.vinculacaoDocumentoPrincipal) {
                this.documentoPrincipal = documento.vinculacaoDocumentoPrincipal.documento;
                this.activeCard = 'form';
            } else {
                this.activeCard = 'atividade';
            }
        });

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.pagination$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter) {

                this.pagination = pagination;

                if (this.activeCard === 'inteligencia') {
                    this.reload(this.pagination);
                }

                if (this.activeCard === 'sigilos') {
                    this.reloadSigilos(this.pagination);
                }

            } else {
                this.pagination = pagination;
            }
        });

        this.componenteDigital$.subscribe(componenteDigital => {
            if (componenteDigital && componenteDigital.conteudo) {
                const html = this.b64DecodeUnicode(componenteDigital.conteudo.split(';base64,')[1]);
                this._store.dispatch(new fromStore.SetRepositorioComponenteDigital(html));
            }

        });

        this.juntada$.subscribe(juntada => {
            this.juntada = juntada;

            if (this.juntada) {
                this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Juntada', id: this.juntada.id};
            }
        });

        if (this.juntadaRoute) {
            this.activeCard = 'form';
        }

        if (!this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.activeCard = 'anexos';
        }

        this._documentoEditService.activeCard.subscribe(activeCard => this.activeCard = activeCard);
    }

    ngAfterViewInit(): void {
        const path = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then(componentFactory => this.container.createComponent(componentFactory));
                }));
            }
        });

        const path1 = 'app/main/apps/documento/documento-edit#form';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path1)) {
                module.components[path1].forEach((c => {
                    this._dynamicService.loadComponent(c)
                        .then( componentFactory  => {
                            this.containerForm.createComponent(componentFactory);
                            this._ref.markForCheck();
                        });
                }));
            }
        });
    }

    b64DecodeUnicode(str): any {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        // tslint:disable-next-line:only-arrow-functions
        return decodeURIComponent(atob(str).split('').map(function(c): any {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    upload(): void {
        this.cdkUpload.upload();
    }

    uploadComponenteDigital(): void {
        this.cdkUploadComponenteDigital.upload();
    }

    anexarCopia(): void {
        this._router.navigate([
                this.routerState.url.split(this.routerState.params.documentoHandle + '/editar')[0] +
                this.routerState.params.documentoHandle + '/editar/anexar-copia/' + this.documento.processoOrigem.id + '/visualizar'
            ]
        ).then();
    }

    aprovar(): void {
        this._store.dispatch(new fromStore.ApproveComponenteDigital({
            documentoOrigem: this.documento
        }));

    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    doDeleteDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado(documentoId));
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

                this._store.dispatch(new fromStore.AssinaDocumentoVinculadoEletronicamente({assinatura: assinatura, password: result.password}));
            });
        }
    }

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
    }

    onCompleteDocumentoVinculado(): void {
        this._store.dispatch(new fromStore.GetDocumentosVinculados());
    }

    onCompleteComponenteDigital(): void {
        this.reloadComponentesDigitais({});
    }

    back(): void {
        this._location.back();
    }

    showAtividade(): void {
        this._documentoEditService.doChangeCard('atividade');
    }

    showAnexos(): void {
        this._documentoEditService.doChangeCard('anexos');
    }

    showInteligencia(): void {
        this._documentoEditService.doChangeCard('inteligencia');
    }

    showAcessoRestrito(): void {
        this._documentoEditService.doChangeCard('acesso-restrito');
    }

    showSigilo(): void {
        this._documentoEditService.doChangeCard('sigilos');
        this.reloadSigilos({});
    }

    showAssinaturas(): void {
        this._documentoEditService.doChangeCard('assinaturas');
        this.reloadAssinaturas({});
    }

    showComponentesDigitais(): void {
        this._documentoEditService.doChangeCard('componentesDigitais');
        this.reloadComponentesDigitais({});
    }

    showJuntadas(): void {
        this._documentoEditService.doChangeCard('juntadas');
    }

    showForm(): void {
        this._documentoEditService.doChangeCard('form');
    }

    showFormAcessoRestrito(): void {
        this.formAcessoRestrito = !this.formAcessoRestrito;
    }

    showFormSigilos(): void {
        this.formSigilos = !this.formSigilos;
    }

    submitVisibilidade(visibilidade): void {
        this._store.dispatch(new fromStore.SaveVisibilidadeDocumento({documentoId: this.documento.id, visibilidade: visibilidade}));
        this.visibilidadeIsSaving$.subscribe((next) => {
            if (!next) {
                this.formAcessoRestrito = false;
            }
        });
   }

    submitSigilo(values): void {

        const sigilo = new Sigilo();

        Object.entries(values).forEach(
            ([key, value]) => {
                sigilo[key] = value;
            }
        );

        sigilo.documento = this.documento;
        this._store.dispatch(new fromStore.SaveSigiloDocumento({documentoId: this.documento.id, sigilo: sigilo}));

        this.sigiloIsSaving$.subscribe((next) => {
            if (!next) {
                this.formSigilos = false;
            }
        });

        this.sigiloErrors$.subscribe((next) => {
            if (next) {
                this.formSigilos = true;
            }
        });
    }

    deleteSigilo(sigiloId: number): void {
        this._store.dispatch(new fromStore.DeleteSigilo({documentoId: this.documento.id, sigiloId: sigiloId}));
    }

    editSigilo(sigiloId: number): void {
        this.formSigilos = true;
        this._store.dispatch(new fromStore.GetSigilo({sigiloId: sigiloId}));
    }

    deleteAssinatura(assinaturaId: number): void {
        this._store.dispatch(new fromStore.DeleteAssinatura({componenteDigitalId: this.routerState.params.componenteDigitalHandle, assinaturaId: assinaturaId}));
    }

    deleteComponenteDigital(componenteDigitalId: number): void {
        this._store.dispatch(new fromStore.DeleteComponenteDigital(componenteDigitalId));
    }

    submit(values): void {

        const documento = new Documento();

        Object.entries(values).forEach(
            ([key, value]) => {
                documento[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumento(documento));
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetRepositorios({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...this.pagination.ckeditorFilter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
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
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

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

    reloadComponentesDigitais(params): void {
        this._store.dispatch(new fromStore.GetComponentesDigitais({
            ...this.pagination,
            filter: {
                'documento.id': 'eq:' + this.routerState.params.documentoHandle
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    doDownload(repositorio: Repositorio): void {
        this._store.dispatch(new fromStore.DownloadComponenteDigital({
            componenteDigitalId: repositorio.documento.componentesDigitais[0].id,
            repositorioId: repositorio.id
        }));
    }

    submitAtividade(values): void {

        delete values.unidadeAprovacao;

        const atividade = new Atividade();

        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        atividade.documentos = [this.documento];

        this._store.dispatch(new fromStore.SaveAtividade(atividade));
    }

    deleteVisibilidade(visibilidadeId: number): void {
        this._store.dispatch(new fromStore.DeleteVisibilidade({documentoId: this.routerState.params.documentoHandle, visibilidadeId: visibilidadeId}));
    }

    onEtiquetaCreate(etiqueta: Etiqueta): void {
        this._store.dispatch(new fromStore.CreateVinculacaoEtiqueta({documento: this.documento, etiqueta: etiqueta}));
    }

    onEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this._store.dispatch(new fromStore.SaveConteudoVinculacaoEtiqueta({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo}
        }));
    }

    onEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoEtiqueta({
            documentoId: this.documento.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        }));
    }

    submitJuntada(values): void {

        const juntada = new Juntada();

        Object.entries(values).forEach(
            ([key, value]) => {
                juntada[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveJuntada(juntada));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}

