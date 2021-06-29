import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {
    Assinatura,
    Assunto,
    Classificacao,
    ConfiguracaoNup, Desentranhamento, Documento,
    Interessado,
    Juntada,
    Pagination,
    Pessoa,
    Processo,
    Tarefa,
    Usuario,
    VinculacaoProcesso
} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {
    getConfiguracaoNup,
    getTarefaIsSaving,
    getVinculacaoProcessoIsSaving,
    SaveAssunto,
    SaveInteressado,
    SaveTarefa,
    SaveVinculacaoProcesso
} from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getMercureState, getRouterState, getScreenState} from 'app/store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {filter, takeUntil} from 'rxjs/operators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper} from '@angular/material/stepper';
import * as moment from 'moment';
import {getAssuntoIsSaving as getIsSavingAssunto} from './store/selectors/assunto.selectors';
import {getInteressadoIsSaving as getIsSavingInteressado} from './store/selectors/interessado.selectors';
import {getProcesso} from '../../store';
import {configuracaoNup, documento as documentoSchema} from '@cdk/normalizr';
import {CdkProcessoModalClassificacaoRestritaComponent} from '@cdk/components/processo/cdk-processo-modal-classificacao-restrita/cdk-processo-modal-classificacao-restrita.component';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'dados-basicos-create',
    templateUrl: './dados-basicos-create.component.html',
    styleUrls: ['./dados-basicos-create.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosCreateComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('stepper') stepper: MatStepper;
    @ViewChild('ckdUpload', {static: false}) cdkUpload;

    routerState: any;
    procedencia: Pessoa;
    _profile: Usuario;

    confirmDialogRef: MatDialogRef<CdkConfirmDialogComponent>;
    dialogRef: any;

    processo$: Observable<Processo>;
    processo: Processo;
    nupIsValid$: Observable<boolean>;
    nupIsValid: boolean;
    isSavingProcesso$: Observable<boolean>;
    errors$: Observable<any>;
    errorsTarefa$: Observable<any>;
    errorsVinculacoes$: Observable<any>;

    especieProcessoPagination: Pagination;
    setorAtualPagination: Pagination;
    classificacaoPagination: Pagination;
    logEntryPagination: Pagination;

    formProcesso: FormGroup;

    assuntos$: Observable<Assunto[]>;
    assuntos: Assunto[] = [];
    isSavingAssunto$: Observable<boolean>;
    assunto: Assunto;
    formAssunto: FormGroup;
    assuntoAdministrativoPagination: Pagination;
    assuntosDeletingIds$: Observable<any>;
    assuntosDeletedIds$: Observable<any>;
    assuntosLoading$: Observable<boolean>;
    assuntosPagination$: Observable<any>;
    assuntosPagination: any;
    assuntoActivated = 'form';
    temAssuntos = false;

    interessados$: Observable<Interessado[]>;
    interessados: Interessado[] = [];
    isSavingInteressado$: Observable<boolean>;
    interessado: Interessado;
    formInteressado: FormGroup;
    interessadosDeletingIds$: Observable<any>;
    interessadosDeletedIds$: Observable<any>;
    interessadosLoading$: Observable<boolean>;
    interessadosPagination$: Observable<any>;
    interessadosPagination: any;
    interessadoActivated = 'form';
    temInteressados = false;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];
    juntadasLoading$: Observable<boolean>;
    juntadasPagination$: Observable<any>;
    juntadasPagination: any;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    desentranhandoJuntadasId$: Observable<number[]>;
    desentranhadoJuntadasId$: Observable<number[]>;
    javaWebStartOK = false;
    assinaturaInterval = null;

    vinculacoesProcessos$: Observable<VinculacaoProcesso[]>;
    vinculacoesProcessos: VinculacaoProcesso[] = [];
    isSavingVinculacao$: Observable<boolean>;
    vinculacaoProcesso: VinculacaoProcesso;
    formVinculacaoProcesso: FormGroup;
    vinculacoesProcessosDeletingIds$: Observable<any>;
    vinculacoesProcessosDeletedIds$: Observable<any>;
    vinculacoesProcessosLoading$: Observable<boolean>;
    vinculacoesProcessosPagination$: Observable<any>;
    screen$: Observable<any>;
    vinculacoesProcessosPagination: any;
    vinculacaoProcessoActivated = 'form';
    processoVinculadoPagination: Pagination;

    tarefa: Tarefa;
    isSavingTarefa$: Observable<boolean>;
    formTarefa: FormGroup;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;

    configuracaoNupPagination: Pagination;
    configuracaoNupList$: Observable<ConfiguracaoNup[]>;
    configuracaoNupList: ConfiguracaoNup[] = [];

    selectedIndex: number;
    isLinear: boolean;
    mobileMode: boolean = false;

    genero = 'administrativo';

    pessoa: Pessoa;

    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _formBuilder
     * @param renderer
     * @param dialog
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<fromStore.DadosBasicosAppState>,
        private _router: Router,
        public _loginService: LoginService,
        private _formBuilder: FormBuilder,
        private renderer: Renderer2,
        public dialog: MatDialog,
        private _activatedRoute: ActivatedRoute
    ) {
        this.isSavingProcesso$ = this._store.pipe(select(fromStore.getProcessoIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getProcessoErrors));
        this.errorsTarefa$ = this._store.pipe(select(fromStore.getTarefaErrors));
        this.errorsVinculacoes$ = this._store.pipe(select(fromStore.getVinculacaoProcessoErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.configuracaoNupList$ = this._store.pipe(select(getConfiguracaoNup));
        this._profile = this._loginService.getUserProfile();
        this.screen$ = this._store.pipe(select(getScreenState));
        this.nupIsValid$ = this._store.pipe(select(fromStore.getNupValid));

        this.isSavingAssunto$ = this._store.pipe(select(getIsSavingAssunto));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntos));
        this.assuntosDeletingIds$ = this._store.pipe(select(fromStore.getAssuntosDeletingIds));
        this.assuntosDeletedIds$ = this._store.pipe(select(fromStore.getAssuntosDeletedIds));
        this.assuntosLoading$ = this._store.pipe(select(fromStore.getAssuntosIsLoading));
        this.assuntosPagination$ = this._store.pipe(select(fromStore.getAssuntosPagination));
        this.assuntoAdministrativoPagination = new Pagination();

        this.isSavingInteressado$ = this._store.pipe(select(getIsSavingInteressado));
        this.interessados$ = this._store.pipe(select(fromStore.getInteressados));
        this.interessadosDeletingIds$ = this._store.pipe(select(fromStore.getInteressadosDeletingIds));
        this.interessadosDeletedIds$ = this._store.pipe(select(fromStore.getInteressadosDeletedIds));
        this.interessadosPagination$ = this._store.pipe(select(fromStore.getInteressadosPagination));
        this.interessadosLoading$ = this._store.pipe(select(fromStore.getInteressadosIsLoading));

        this.isSavingVinculacao$ = this._store.pipe(select(getVinculacaoProcessoIsSaving));
        this.vinculacoesProcessos$ = this._store.pipe(select(fromStore.getVinculacoesProcessos));
        this.vinculacoesProcessosDeletingIds$ = this._store.pipe(select(fromStore.getVinculacoesProcessosDeletingIds));
        this.vinculacoesProcessosDeletedIds$ = this._store.pipe(select(fromStore.getVinculacoesProcessosDeletedIds));
        this.vinculacoesProcessosPagination$ = this._store.pipe(select(fromStore.getVinculacoesProcessosPagination));
        this.vinculacoesProcessosLoading$ = this._store.pipe(select(fromStore.getVinculacoesProcessosIsLoading));

        this.isSavingTarefa$ = this._store.pipe(select(getTarefaIsSaving));

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntada));
        this.juntadasPagination$ = this._store.pipe(select(fromStore.getJuntadaPagination));
        this.juntadasLoading$ = this._store.pipe(select(fromStore.getJuntadaIsLoading));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.desentranhandoJuntadasId$ = this._store.pipe(select(fromStore.getDesentranhandoIds));
        this.desentranhadoJuntadasId$ = this._store.pipe(select(fromStore.getDesentranhadoIds));

        this.especieProcessoPagination = new Pagination();

        this.logEntryPagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
        this._unsubscribeAll = new Subject();
        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.configuracaoNupPagination = new Pagination();

        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};

        this.processoVinculadoPagination = new Pagination();
        this.processoVinculadoPagination.populate = ['setorAtual', 'setorAtual.unidade'];

        this.formProcesso = this._formBuilder.group({
            id: [null],
            temProcessoOrigem: [null],
            processoOrigem: [null],
            NUP: [null, [Validators.required, Validators.maxLength(21)]],
            tipoProtocolo: [null, [Validators.required]],
            unidadeArquivistica: [null, [Validators.required]],
            especieProcesso: [null, [Validators.required]],
            visibilidadeExterna: [null],
            titulo: [null, [Validators.required, Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.maxLength(255)]],
            outroNumero: [null, [Validators.maxLength(255)]],
            valorEconomico: [null],
            semValorEconomico: [null],
            classificacao: [null, [Validators.required]],
            procedencia: [null, [Validators.required]],
            localizador: [null],
            setorAtual: [null, [Validators.required]],
            modalidadeMeio: [null, [Validators.required]],
            configuracaoNup: [null],
            modalidadeFase: [null],
            dataHoraAbertura: [null, [Validators.required]],
            nupInvalido: [null],
            chaveAcesso: [null],
            alterarChave: [false]
        });

        this.formAssunto = this._formBuilder.group({
            id: [null],
            processo: [null],
            principal: [null],
            assuntoAdministrativo: [null, [Validators.required]]
        });

        this.formInteressado = this._formBuilder.group({
            id: [null],
            processo: [null],
            pessoa: [null, [Validators.required]],
            modalidadeInteressado: [null, [Validators.required]]
        });

        this.formVinculacaoProcesso = this._formBuilder.group({
            id: [null],
            processo: [null],
            processoVinculado: [null, [Validators.required]],
            modalidadeVinculacaoProcesso: [null, [Validators.required]],
            checkAnexacao: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]]
        });

        this.formTarefa = this._formBuilder.group({
            id: [null],
            diasUteis: [null],
            prazoDias: [null],
            blocoProcessos: [null],
            processos: [null],
            processo: [null, [Validators.required]],
            urgente: [null],
            especieTarefa: [null, [Validators.required]],
            distribuicaoAutomatica: [null],
            dataHoraInicioPrazo: [null, [Validators.required]],
            dataHoraFinalPrazo: [null, [Validators.required]],
            unidadeResponsavel: [null, [Validators.required]],
            setorResponsavel: [null, [Validators.required]],
            usuarioResponsavel: [null],
            blocoResponsaveis: [null],
            usuarios: [null],
            setores: [null],
            setorOrigem: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            localEvento: [null, [Validators.maxLength(255)]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.configuracaoNupList$.subscribe((configuracaoNupList) => {
            this.configuracaoNupList = configuracaoNupList;
            if(configuracaoNupList.length === 1)
            {
                this.formProcesso.get('configuracaoNup').setValue(configuracaoNupList[0]);
            }
        });


        this.nupIsValid$.subscribe((isValid) => {
            this.nupIsValid = isValid;
        } );


        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.genero = this.routerState.params.generoHandle;
                }
            });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe(
            (processo) => {
                this.processo = processo;
                this.isLinear = false;

                this.tarefa = new Tarefa();
                this.tarefa.processo = this.processo;
                this.tarefa.unidadeResponsavel = this._profile.colaborador.lotacoes[0].setor.unidade;
                this.tarefa.dataHoraInicioPrazo = moment();
                this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ hour : 20, minute : 0, second : 0 });
                this.tarefa.setorOrigem = processo.setorAtual;

                this.assuntoActivated = 'form';
                this.interessadoActivated = 'form';
                this.vinculacaoProcessoActivated = 'form';
                this.processoVinculadoPagination.filter = {
                    'id':'neq:' + this.processo.id
                };

                this.assunto = new Assunto();
                this.assunto.processo = this.processo;

                setTimeout(() => {
                    this.selectedIndex = 1;
                }, 1000);
            }
        );

        this.configuracaoNupList$.subscribe(configuracaoNupList => this.configuracaoNupList = configuracaoNupList);

        if (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 1;
            this.processo.tipoProtocolo = 1;
            this.selectedIndex = 0;
            this.assuntoActivated = 'form';
            this.temAssuntos = false;
            this.interessadoActivated = 'form';
            this.temInteressados = false;
            this.vinculacaoProcessoActivated = 'form';
        }

        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Processo', id: this.processo.id};
        this.especieProcessoPagination.populate = ['classificacao', 'generoProcesso', 'modalidadeMeio', 'workflow'];
        this.especieProcessoPagination.filter = {'generoProcesso.nome': 'eq:' + this.genero.toUpperCase()};

        this.especieTarefaPagination.populate = ['generoTarefa'];
        if (this.genero === 'administrativo') {
            this.especieTarefaPagination.filter = {'generoTarefa.nome': 'eq:ADMINISTRATIVO'};
        } else {
            this.especieTarefaPagination.filter = {'generoTarefa.nome': 'in:ADMINISTRATIVO,' + this.genero.toUpperCase()};
        }

        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.classificacaoPagination.filter = {permissaoUso: 'eq:true'};
        this.classificacaoPagination.populate = ['parent'];

        this.assunto = new Assunto();
        this.interessado = new Interessado();
        this.vinculacaoProcesso = new VinculacaoProcesso();
        this.vinculacaoProcesso.processo = this.processo;
        if (this.processo.id) {
            this.assunto.processo = this.processo;
        }
        this.assuntoAdministrativoPagination.populate = ['parent'];

        this.assuntos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(assuntos => !!assuntos)
        ).subscribe(
            (assuntos) => {
                this.assuntos = assuntos;

                if (assuntos.length > 0) {
                    this.temAssuntos = true;
                }

                if (this.temAssuntos) {
                    this.assuntoActivated = 'grid';
                    this.formAssunto.reset();
                }
            }
        );
        this.assuntosPagination$.subscribe((pagination) => {
            this.assuntosPagination = pagination;
        });

        this.interessados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(interessados => !!interessados)
        ).subscribe(
            (interessados) => {
                this.interessados = interessados;

                if (interessados.length > 0) {
                    this.temInteressados = true;
                }

                if (this.temInteressados) {
                    this.interessadoActivated = 'grid';
                    this.formInteressado.reset();
                }
            }
        );
        this.interessadosPagination$.subscribe((pagination) => {
            this.interessadosPagination = pagination;
        });

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas)
        ).subscribe(
            juntadas => this.juntadas = juntadas
        );

        this.juntadasPagination$.subscribe((pagination) => {
            this.juntadasPagination = pagination;
        });

        this._store
            .pipe(
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

        this.vinculacoesProcessos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(vinculacoesProcessos => !!vinculacoesProcessos)
        ).subscribe(
            (vinculacoesProcessos) => {
                this.vinculacoesProcessos = vinculacoesProcessos;

                if (this.vinculacoesProcessos) {
                    this.vinculacaoProcessoActivated = 'grid';
                    this.formVinculacaoProcesso.reset();
                }
            }
        );
        this.vinculacoesProcessosPagination$.subscribe((pagination) => {
            this.vinculacoesProcessosPagination = pagination;
        });

        this.tarefa = new Tarefa();

        this.isLinear = true;

        this.screen$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((screen) => {
            this.mobileMode = screen.size !== 'desktop';
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadTarefa());
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
        // this.renderer.selectRootElement('#inputProcedencia').focus();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
                if (key === 'NUP') {
                    processo[key] = values['NUP']
                        .replace(/[^\w\-]+/g, '')
                        .replace(/-+/g, '');
                }
            }
        );

        if (this.processo && this.processo.id) {
            processo.setorInicial = this.processo.setorInicial ? this.processo.setorInicial : this.processo.setorAtual;
            processo.NUP = this.processo.NUP
                .replace(/[^\w\-]+/g, '')
                .replace(/-+/g, '');
        }

        this._store.dispatch(new fromStore.SaveProcesso(processo));
    }

    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                if (!this.processo.id) {
                    this.procedencia = pessoa;
                }
                else {
                    this.pessoa = pessoa;
                    this.interessadoActivated = 'form';
                }
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    gerirProcedencia(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/listar']).then();
    }

    editProcedencia(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    gerirPessoa(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/listar']).then();
    }

    editPessoa(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    doAbort(): void {
        if (this.stepper['_selectedIndex'] === 1) {
            this.assuntoActivated = 'grid';
        }
        if (this.stepper['_selectedIndex'] === 2) {
            this.interessadoActivated = 'grid';
        }
        if (this.stepper['_selectedIndex'] === 4) {
            this.vinculacaoProcessoActivated = 'grid';
        }
    }

    submitAssunto(values): void {
        const assunto = new Assunto();

        Object.entries(values).forEach(
            ([key, value]) => {
                assunto[key] = value;
            }
        );

        assunto.processo = this.processo;

        this._store.dispatch(new SaveAssunto(assunto));
    }

    submitInteressado(values): void {
        const interessado = new Interessado();

        Object.entries(values).forEach(
            ([key, value]) => {
                interessado[key] = value;
            }
        );

        interessado.processo = this.processo;

        this._store.dispatch(new SaveInteressado(interessado));
    }

    submitVinculacaoProcesso(values): void {
        const vinculacaoProcesso = new VinculacaoProcesso();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoProcesso[key] = value;
            }
        );

        vinculacaoProcesso.processo = this.processo;

        this._store.dispatch(new SaveVinculacaoProcesso(vinculacaoProcesso));
    }

    submitTarefa(values): void {
        const tarefa = new Tarefa();

        Object.entries(values).forEach(
            ([key, value]) => {
                tarefa[key] = value;
            }
        );

        if (this.processo && this.processo.especieProcesso?.workflow) {
            tarefa.workflow = this.processo.especieProcesso.workflow;
        }

        this._store.dispatch(new SaveTarefa(tarefa));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onCompleteJuntada(): void {
        this._store.dispatch(new fromStore.GetJuntadas(this.juntadasPagination));
    }

    reloadJuntadas(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.juntadasPagination,
            filter: {
                ...this.juntadasPagination.filter
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.juntadasPagination.populate
        }));
    }

    excludedJuntadas(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.juntadasPagination,
            filter: {
                ...this.juntadasPagination.filter
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.juntadasPagination.populate,
            context: params.context
        }));
    }

    reloadAssuntos(params): void {
        this._store.dispatch(new fromStore.GetAssuntos({
            ...this.assuntosPagination,
            filter: {
                ...this.assuntosPagination.filter
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.assuntosPagination.populate
        }));
    }

    excludedAssuntos(params): void {
        this._store.dispatch(new fromStore.GetAssuntos({
            ...this.assuntosPagination,
            filter: {
                ...this.assuntosPagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.assuntosPagination.populate,
            context: params.context
        }));
    }

    deleteAssunto(assuntoId: number): void {
        this._store.dispatch(new fromStore.DeleteAssunto(assuntoId));
    }

    reloadInteressados(params): void {
        this._store.dispatch(new fromStore.GetInteressados({
            ...this.interessadosPagination,
            filter: {
                ...this.interessadosPagination.filter
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.interessadosPagination.populate
        }));
    }

    excludedInteressados(params): void {
        this._store.dispatch(new fromStore.GetInteressados({
            ...this.interessadosPagination,
            filter: {
                ...this.interessadosPagination.filter
            },
            girdFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.interessadosPagination.populate,
            context: params.context
        }));
    }

    deleteInteressado(interessadoId: number): void {
        this._store.dispatch(new fromStore.DeleteInteressado(interessadoId));
    }

    reloadVinculacoesProcessos(params): void {
        this._store.dispatch(new fromStore.GetVinculacoesProcessos({
            ...this.vinculacoesProcessosPagination,
            filter: {
                ...this.vinculacoesProcessosPagination.filter
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.vinculacoesProcessosPagination.populate
        }));
    }

    excludedVinculacoesProcessos(params): void {
        this._store.dispatch(new fromStore.GetVinculacoesProcessos({
            ...this.vinculacoesProcessosPagination,
            filter: {
                ...this.vinculacoesProcessosPagination.filter
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.vinculacoesProcessosPagination.populate,
            context: params.context
        }));
    }

    deleteVinculacaoProcesso(vinculacaoProcessoId: number): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoProcesso(vinculacaoProcessoId));
    }

    create(form): void {
        switch (form) {
            case 'assunto':
                this.assunto = new Assunto();
                this.assuntoActivated = 'form';
                break;
            case 'interessado':
                this.interessado = new Interessado();
                this.pessoa = new Pessoa();
                this.interessadoActivated = 'form';
                break;
            case 'vinculacao-processo':
                this.vinculacaoProcessoActivated = 'form';
                break;
        }
    }

    validateNup(values: any): void {
       this._store.dispatch(new fromStore.ValidaNup(values));
    }

    doSelectClassificacao(classificacao: Classificacao): void {
        if (classificacao && classificacao.visibilidadeRestrita === true && this.processo.acessoRestrito !== true) {
            this.dialog.open(CdkProcessoModalClassificacaoRestritaComponent, {
                data: {},
                hasBackdrop: false,
                closeOnNavigation: true
            });
        }
    }

    desentranhar(juntada: Juntada): void {
        this.confirmDialogRef = this.dialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Confirmação',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
            },
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'Este procedimento é irreversível. Deseja realmente desentranhar a juntada?';
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const desentranhamento = new Desentranhamento();
                desentranhamento.tipo = 'arquivo';
                desentranhamento.juntada = juntada;
                this._store.dispatch(new fromStore.SaveDesentranhamento(desentranhamento));
            }
            this.confirmDialogRef = null;
        });

    }

    editar(documento: Documento): void {
        let primary: string;
        primary = 'componente-digital/';
        if (documento.componentesDigitais[0]) {
            primary += documento.componentesDigitais[0].id;
        } else {
            primary += '0';
        }
        const sidebar = 'editar/dados-basicos';

        this._router.navigate([
                this.routerState.url +
                '/documento/' + documento.id,
                {
                    outlets: {
                        primary: primary,
                        sidebar: sidebar
                    }
                }],
            {
                relativeTo: this._activatedRoute.parent
            }).then();
    }

    assinar(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumento(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento
                }));
            });
        }
    }
}
