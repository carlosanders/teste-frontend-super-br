import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit, Renderer2, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {
    Processo,
    Pessoa,
    Usuario,
    Assunto,
    Interessado,
    VinculacaoProcesso,
    Tarefa,
    Juntada
} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SaveAssunto} from './store';
import {SaveInteressado} from './store';
import {SaveVinculacaoProcesso} from './store';
import {SaveTarefa} from './store/actions';
import {filter, takeUntil} from 'rxjs/operators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper} from '@angular/material/stepper';
import * as moment from 'moment';
import {getAssuntoIsSaving as getIsSavingAssunto} from './store/selectors/assunto.selectors';
import {getInteressadoIsSaving as getIsSavingInteressado} from './store/selectors/interessado.selectors';
import {getVinculacaoProcessoIsSaving} from './store/selectors';
import {getTarefaIsSaving} from './store/selectors';
import {SetSteps} from '../../store/actions';
import {getProcesso} from '../../store/selectors';

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

    routerState: any;
    procedencia: Pessoa;
    _profile: Usuario;

    processo$: Observable<Processo>;
    processo: Processo;
    isSavingProcesso$: Observable<boolean>;
    errors$: Observable<any>;

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
    assuntosDeletingIds$: Observable<any>;
    assuntosDeletedIds$: Observable<any>;
    assuntosLoading$: Observable<boolean>;
    assuntosPagination$: Observable<any>;
    assuntosPagination: any;
    assuntoActivated = 'from';

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
    interessadoActivated = 'from';

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];
    juntadasLoading$: Observable<boolean>;
    juntadasPagination$: Observable<any>;
    juntadasPagination: any;

    vinculacoesProcessos$: Observable<VinculacaoProcesso[]>;
    vinculacoesProcessos: VinculacaoProcesso[] = [];
    isSavingVinculacao$: Observable<boolean>;
    vinculacaoProcesso: VinculacaoProcesso;
    formVinculacaoProcesso: FormGroup;
    vinculacoesProcessosDeletingIds$: Observable<any>;
    vinculacoesProcessosDeletedIds$: Observable<any>;
    vinculacoesProcessosLoading$: Observable<boolean>;
    vinculacoesProcessosPagination$: Observable<any>;
    vinculacoesProcessosPagination: any;
    vinculacaoProcessoActivated = 'from';

    tarefa: Tarefa;
    isSavingTarefa$: Observable<boolean>;
    formTarefa: FormGroup;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;

    selectedIndex: number;
    isLinear: boolean;

    private _unsubscribeAll: Subject<any>;

    @ViewChild('stepper') stepper: MatStepper;
    @ViewChild('ckdUpload', {static: false}) cdkUpload;

    genero = 'administrativo';

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _formBuilder
     * @param renderer
     */
    constructor(
        private _store: Store<fromStore.DadosBasicosAppState>,
        private _router: Router,
        public _loginService: LoginService,
        private _formBuilder: FormBuilder,
        private renderer: Renderer2,
    ) {
        this.isSavingProcesso$ = this._store.pipe(select(fromStore.getProcessoIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getProcessoErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = this._loginService.getUserProfile();

        this.isSavingAssunto$ = this._store.pipe(select(getIsSavingAssunto));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntos));
        this.assuntosDeletingIds$ = this._store.pipe(select(fromStore.getAssuntosDeletingIds));
        this.assuntosDeletedIds$ = this._store.pipe(select(fromStore.getAssuntosDeletedIds));
        this.assuntosLoading$ = this._store.pipe(select(fromStore.getAssuntosIsLoading));
        this.assuntosPagination$ = this._store.pipe(select(fromStore.getAssuntosPagination));

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

        this.especieProcessoPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
        this._unsubscribeAll = new Subject();
        this.especieTarefaPagination = new Pagination();
        this.especieTarefaPagination.populate = ['generoTarefa'];
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};

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
            modalidadeFase: [null],
            dataHoraAbertura: [null, [Validators.required]]
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

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.genero = this.routerState.params.generoHandle;
                }
            });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe(
            processo => {
                this.processo = processo;
                this.isLinear = false;

                this.tarefa = new Tarefa();
                this.tarefa.processo = this.processo;
                this.tarefa.unidadeResponsavel = this._profile.colaborador.lotacoes[0].setor.unidade;
                this.tarefa.dataHoraInicioPrazo = moment();
                this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ hour : 20, minute : 0, second : 0 });
                this.tarefa.setorOrigem = this._profile.colaborador.lotacoes[0].setor;

                setTimeout(() => {
                    this.selectedIndex = 1;
                }, 1000);
            }
        );

        if (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 1;
            this.processo.tipoProtocolo = 1;
            this.selectedIndex = 0;
        }

        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Processo', id: this.processo.id};
        this.especieProcessoPagination.populate = ['generoProcesso'];
        this.especieProcessoPagination.filter = {'generoProcesso.nome': 'eq:' + this.genero.toUpperCase()};

        this.especieTarefaPagination.populate = ['generoTarefa'];
        if (this.genero === 'administrativo') {
            this.especieTarefaPagination.filter = {'generoTarefa.nome': 'eq:ADMINISTRATIVO'};
        } else {
            this.especieTarefaPagination.filter = {'generoTarefa.nome': 'in:ADMINISTRATIVO,' + this.genero.toUpperCase()};
        }

        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.classificacaoPagination.populate = ['parent'];

        this.assunto = new Assunto();
        this.interessado = new Interessado();
        this.vinculacaoProcesso = new VinculacaoProcesso();
        this.vinculacaoProcesso.processo = this.processo;

        this.assuntos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(assuntos => !!assuntos)
        ).subscribe(
            assuntos => {
                this.assuntos = assuntos;

                if (this.assuntos) {
                    this.assuntoActivated = 'grid';
                }
            }
        );
        this.assuntosPagination$.subscribe(pagination => {
            this.assuntosPagination = pagination;
        });

        this.interessados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(interessados => !!interessados)
        ).subscribe(
            interessados => {
                this.interessados = interessados;

                if (this.interessados) {
                    this.interessadoActivated = 'grid';
                }
            }
        );
        this.interessadosPagination$.subscribe(pagination => {
            this.interessadosPagination = pagination;
        });

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas)
        ).subscribe(
            juntadas => this.juntadas = juntadas
        );
        this.juntadasPagination$.subscribe(pagination => {
            this.juntadasPagination = pagination;
        });

        this.vinculacoesProcessos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(vinculacoesProcessos => !!vinculacoesProcessos)
        ).subscribe(
            vinculacoesProcessos => {
                this.vinculacoesProcessos = vinculacoesProcessos;

                if (this.vinculacoesProcessos) {
                    this.vinculacaoProcessoActivated = 'grid';
                }
            }
        );
        this.vinculacoesProcessosPagination$.subscribe(pagination => {
            this.vinculacoesProcessosPagination = pagination;
        });

        this.tarefa = new Tarefa();

        this.isLinear = true;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
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
            }
        );

        if (this.processo && this.processo.id) {
            processo.setorInicial = this.processo.setorInicial ? this.processo.setorInicial : null;
            processo.NUP = this.processo.NUP
                .replace(/[^\w\-]+/g, '')
                .replace(/-+/g, '');
        }

        this._store.dispatch(new fromStore.SaveProcesso(processo));
    }

    post(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.PostProcesso(processo));
    }

    put(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.PutProcesso(processo));
    }

    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.procedencia = pessoa;
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
        this._router.navigate([this.routerState.url + '/pessoa/listar']).then();
    }

    editProcedencia(pessoaId: number): void {
        this._router.navigate([this.routerState.url + '/pessoa/editar/' + pessoaId]).then();
    }

    doAbort(): void {
        this.stepper.previous();
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
                ...this.juntadasPagination.filter,
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
                ...this.juntadasPagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.juntadasPagination.populate,
            context: params.context
        }));
    }

    onCompleteAssunto(): void {
        this.assuntoActivated = 'grid';
        this._store.dispatch(new fromStore.GetAssuntos(this.assuntosPagination));
    }

    reloadAssuntos(params): void {
        this._store.dispatch(new fromStore.GetAssuntos({
            ...this.assuntosPagination,
            filter: {
                ...this.assuntosPagination.filter,
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

    onCompleteInteressado(): void {
        this.interessadoActivated = 'grid';
        this._store.dispatch(new fromStore.GetInteressados(this.interessadosPagination));
    }

    reloadInteressados(params): void {
        this._store.dispatch(new fromStore.GetInteressados({
            ...this.interessadosPagination,
            filter: {
                ...this.interessadosPagination.filter,
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
                ...this.interessadosPagination.filter,
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

    onCompleteVinculacaoProcesso(): void {
        this.vinculacaoProcessoActivated = 'grid';
        this._store.dispatch(new fromStore.GetVinculacoesProcessos(this.vinculacoesProcessosPagination));
    }

    reloadVinculacoesProcessos(params): void {
        this._store.dispatch(new fromStore.GetVinculacoesProcessos({
            ...this.vinculacoesProcessosPagination,
            filter: {
                ...this.vinculacoesProcessosPagination.filter,
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
                ...this.vinculacoesProcessosPagination.filter,
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

    onCompleteTarefa(): void {
        this._store.dispatch(new SetSteps({steps: false}));
        this._router.navigate([this.routerState.url.replace('dados-basicos-steps', 'tarefas/listar')]).then();
    }

    create(form): void {
        switch (form) {
            case 'assunto':
                this.assuntoActivated = 'form';
                break;
            case 'interessado':
                this.interessadoActivated = 'form';
                break;
            case 'vinculacao-processo':
                this.vinculacaoProcessoActivated = 'form';
                break;
        }
    }
}
