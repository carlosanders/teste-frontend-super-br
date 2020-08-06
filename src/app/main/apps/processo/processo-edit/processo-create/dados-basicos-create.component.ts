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
import {getProcesso} from './store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SaveAssunto} from '../assuntos/assunto-edit/store/actions';
import {SaveInteressado} from '../interessados/interessado-edit/store/actions';
import {SaveVinculacaoProcesso} from '../vinculacoes-processos/vinculacao-processo-edit/store/actions';
import {SaveTarefa} from '../tarefas/tarefa-edit/store/actions';
import {filter, takeUntil} from 'rxjs/operators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatStepper} from '@angular/material/stepper';
import * as moment from 'moment';
import {getIsSaving as getIsSavingAssunto} from '../assuntos/assunto-edit/store/selectors';
import {getIsSaving as getIsSavingInteressado} from '../interessados/interessado-edit/store/selectors';
import {getIsSaving as getIsSavingVinculacao} from '../vinculacoes-processos/vinculacao-processo-edit/store/selectors';
import {getIsSaving as getIsSavingTaarefa} from '../tarefas/tarefa-edit/store/selectors';

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

    interessados$: Observable<Interessado[]>;
    interessados: Interessado[] = [];
    isSavingInteressado$: Observable<boolean>;
    interessado: Interessado;
    formInteressado: FormGroup;

    juntadas$: Observable<Juntada[]>;
    juntadas: Juntada[] = [];
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    vinculacoesProcessos$: Observable<VinculacaoProcesso[]>;
    vinculacoesProcessos: VinculacaoProcesso[] = [];
    isSavingVinculacao$: Observable<boolean>;
    vinculacaoProcesso: VinculacaoProcesso;
    formVinculacaoProcesso: FormGroup;

    tarefa: Tarefa;
    isSavingTarefa$: Observable<boolean>;
    formTarefa: FormGroup;

    especieTarefaPagination: Pagination;
    setorOrigemPagination: Pagination;

    changeStep = 1;

    private _unsubscribeAll: Subject<any>;

    @ViewChild('stepper') private stepper: MatStepper;
    @ViewChild('ckdUpload', {static: false}) cdkUpload;

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
        private renderer: Renderer2
    ) {
        this.isSavingProcesso$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = this._loginService.getUserProfile();

        this.isSavingAssunto$ = this._store.pipe(select(getIsSavingAssunto));
        this.assuntos$ = this._store.pipe(select(fromStore.getAssuntos));

        this.isSavingInteressado$ = this._store.pipe(select(getIsSavingInteressado));
        this.interessados$ = this._store.pipe(select(fromStore.getInteressados));

        this.isSavingVinculacao$ = this._store.pipe(select(getIsSavingVinculacao));
        this.vinculacoesProcessos$ = this._store.pipe(select(fromStore.getVinculacoesProcessos));

        this.isSavingTarefa$ = this._store.pipe(select(getIsSavingTaarefa));

        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

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

        this.processo$.subscribe(
            processo => this.processo = processo
        );

        if (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 1;
            this.processo.tipoProtocolo = 1;
            this.changeStep = 0;
        }

        this.especieProcessoPagination.populate = ['generoProcesso'];
        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.classificacaoPagination.populate = ['parent'];

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    // this.especieProcessoPagination.filter = {'generoProcesso.nome' : 'eq:' + routerState.state.params.generoHandle.toUpperCase()};
                }
            });

        this.logEntryPagination.filter = {
            entity: 'SuppCore\\AdministrativoBackend\\Entity\\Processo',
            id: +this.processo.id
        };

        this.assunto = new Assunto();
        this.interessado = new Interessado();
        this.vinculacaoProcesso = new VinculacaoProcesso();
        this.vinculacaoProcesso.processo = this.processo;

        this.assuntos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(assuntos => !!assuntos)
        ).subscribe(
            assuntos => this.assuntos = assuntos
        );
        this.interessados$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(interessados => !!interessados)
        ).subscribe(
            interessados => this.interessados = interessados
        );
        this.vinculacoesProcessos$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(vinculacoesProcessos => !!vinculacoesProcessos)
        ).subscribe(
            vinculacoesProcessos => this.vinculacoesProcessos = vinculacoesProcessos
        );
        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(juntadas => !!juntadas)
        ).subscribe(
            juntadas => this.juntadas = juntadas
        );
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });

        if (this.assuntos.length > 0) {
            this.assunto = this.assuntos[0];
            this.assunto.processo = this.processo;
            this.changeStep = 2;
        }
        if (this.interessados.length > 0) {
            this.interessado = this.interessados[0];
            this.interessado.processo = this.processo;
            this.changeStep = 3;
        }
        if (this.juntadas.length > 0) {
            this.changeStep = 4;
        }
        if (this.vinculacoesProcessos.length > 0) {
            this.vinculacaoProcesso = this.vinculacoesProcessos[0];
            this.vinculacaoProcesso.processo = this.processo;
            this.changeStep = 5;
        }
        if (!this.tarefa) {
            this.tarefa = new Tarefa();
            this.tarefa.processo = this.processo;
            this.tarefa.unidadeResponsavel = this._profile.colaborador.lotacoes[0].setor.unidade;
            this.tarefa.dataHoraInicioPrazo = moment();
            this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
            this.tarefa.setorOrigem = this._profile.colaborador.lotacoes[0].setor;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
        this.renderer.selectRootElement('#inputProcedencia').focus();
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

    onActivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.procedencia = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void {
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

    onComplete(): void {
        this._store.dispatch(new fromStore.GetJuntadas(this.pagination));
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        }));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }
}
