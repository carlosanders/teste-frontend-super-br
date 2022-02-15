import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {
    AcaoTransicaoWorkflow,
    Criteria,
    DocumentoAvulso,
    Pagination,
    Pessoa,
    Setor,
    TipoAcaoWorkflow,
    TransicaoWorkflow
} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from '../../../../../../../../../store';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {LoginService} from '../../../../../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'acao-transicao-workflow-edit',
    templateUrl: './acao-transicao-workflow-edit.component.html',
    styleUrls: ['./acao-transicao-workflow-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoTransicaoWorkflowEditComponent implements OnInit, OnDestroy {
    routerState: any;
    action: string;
    componentUrl: string;
    acao$: Observable<AcaoTransicaoWorkflow>;
    acao: AcaoTransicaoWorkflow;

    tipoAcaoWorkflowList: TipoAcaoWorkflow[];
    tipoAcaoWorkflowList$: Observable<TipoAcaoWorkflow[]>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    modeloPagination: Pagination;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    usuarioCompartilhamentoPagination: Pagination;

    destinatariosSave = [];
    destinatarios = [];
    destinos: any[] = [];
    pessoaDestino: Pessoa;
    mecanismoRemessa: string = 'interna';

    prazoCriteriaList: any[] = [];
    criteriasTemplate: any[] = [
        {
            descricao: '5 dias',
            value: 5
        },
        {
            descricao: '10 dias',
            value: 10
        },
        {
            descricao: '15 dias',
            value: 15
        }
    ];
    documentoAvulso: DocumentoAvulso;
    logEntryPagination: Pagination;

    tipoAcaoControl: FormControl = new FormControl();
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _changeDetector
     */
    constructor(
        private _store: Store<fromStore.AcaoTransicaoWorkflowEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _changeDetector: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));
        this.tipoAcaoWorkflowList$ = this._store.pipe(select(fromStore.getTipoAcaoWorkflowList));

        this.modeloPagination = new Pagination();
        this.modeloPagination.populate = [
            'documento',
            'documento.componentesDigitais'
        ];
        this.modeloPagination.filter = {
            'modalidadeModelo.valor': 'eq:EM BRANCO'
        };

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._loginService.getUserProfile().id}`};

        this.usuarioCompartilhamentoPagination = new Pagination();
        this.usuarioCompartilhamentoPagination.filter = {
            'id': `neq:${this._loginService.getUserProfile().id}`,
            'colaborador.id': 'isNotNull'
        };

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.action = '';
            this.routerState = routerState.state;
            this.componentUrl = 'acoes/editar/' + this.routerState.params.acaoTransicaoWorkflowHandle;
        });

        this.criteriasTemplate.forEach((criteria) => {
            const newCriteria = new Criteria();
            newCriteria.descricao = criteria.descricao;
            newCriteria.valor = criteria.value;
            this.prazoCriteriaList.push(newCriteria);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.acao$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            acao => this.acao = acao
        );
        this.tipoAcaoWorkflowList$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            tipoAcaoWorkflowList => this.tipoAcaoWorkflowList = tipoAcaoWorkflowList
        );

        this.documentoAvulso = new DocumentoAvulso();
        this.documentoAvulso.mecanismoRemessa = 'interna';

        if (!this.acao) {
            this.acao = new AcaoTransicaoWorkflow();
        }
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

    goBack(): void {
        this._router.navigate([this.routerState.url.replace(this.componentUrl, 'acoes/listar')]).then();
    }

    displayFn(): string {
        const tipoAcao = this.tipoAcaoWorkflowList.find(tipo => tipo.valor === this.tipoAcaoControl.value);
        return tipoAcao ? tipoAcao.valor + ' - ' + tipoAcao.descricao : '';
    }

    getTipoAcaoSelecionada(): TipoAcaoWorkflow {
        return this.tipoAcaoWorkflowList.find(tipo => tipo.valor === this.tipoAcaoControl.value);
    }

    gerirPessoaDestino(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa']).then();
    }

    editPessoaDestino(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    onActivate(componentReference): void {
        const tipoAcaoValue = this.tipoAcaoControl.value;
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then(() => {
                    if (pessoa) {
                        this.mecanismoRemessa = 'externa';
                        this.pessoaDestino = pessoa;
                        this.tipoAcaoControl.setValue(tipoAcaoValue);
                        this._changeDetector.detectChanges();
                    }
                });
            });
        }
    }

    onDeactivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    submitTrigger1(values): void {
        values.contexto = JSON.stringify({modeloId: values.modelo.id});
        const acaoTransicaoWorkflow = new AcaoTransicaoWorkflow();

        Object.entries(values).forEach(
            ([key, value]) => {
                acaoTransicaoWorkflow[key] = value;
            }
        );

        acaoTransicaoWorkflow.transicaoWorkflow = new TransicaoWorkflow();
        acaoTransicaoWorkflow.transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAcao({
            acao: acaoTransicaoWorkflow,
            operacaoId: operacaoId
        }));
    }

    submitTrigger2(values): void {
        if (!values.usuarioResponsavel) {
            values.contexto = JSON.stringify(
                {
                    setorResponsavelId: values.setorResponsavel.id,
                    unidadeResponsavelId: values.unidadeResponsavel.id
                });
        } else {
            values.contexto = JSON.stringify(
                {
                    setorResponsavelId: values.setorResponsavel.id,
                    unidadeResponsavelId: values.unidadeResponsavel.id,
                    usuarioId: values.usuarioResponsavel.id,
                });
        }
        const acao = new AcaoTransicaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        const transicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;
        acao.transicaoWorkflow = transicaoWorkflow;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAcao({
            acao: acao,
            operacaoId: operacaoId
        }));
    }

    submitTrigger3(values): void {
        values.contexto = JSON.stringify({usuarioId: values.usuario.id});
        const acao = new AcaoTransicaoWorkflow();
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );
        const transicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;
        acao.transicaoWorkflow = transicaoWorkflow;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAcao({
            acao: acao,
            operacaoId: operacaoId
        }));
    }

    submitTrigger4(values): void {
        const contexto = {};

        contexto['especieDocumentoAvulsoId'] = values.especieDocumentoAvulso.id;
        contexto['prazoFinal'] = values.prazoFinal;
        contexto['modeloId'] = values.modelo.id;
        contexto['mecanismoRemessa'] = values.mecanismoRemessa;
        contexto['tipoAcaoWorkflow'] = values.tipoAcaoWorkflow;

        if (values.setorDestino && !values.blocoDestinatarios) {
            contexto['setorDestinoId'] = values.setorDestino.id;
        }

        if (values.pessoaDestino && !values.blocoDestinatarios) {
            contexto['pessoaDestinoId'] = values.pessoaDestino.id;
        }

        if (values.observacao) {
            contexto['observacao'] = values.observacao;
        }
        if ((this.destinatariosSave.length < this.destinatarios.length) && (values.blocoDestinatarios)) {
            this.destinatariosSave.push(values);
        }

        if (this.destinatariosSave.length === this.destinatarios.length && values.blocoDestinatarios) {
            this.destinos = [];
            this.destinatarios.forEach((destinatario) => {
                const destino = {};
                if (destinatario instanceof Setor) {
                    destino['id'] = destinatario.id;
                    destino['tipo'] = 'setor';
                }
                if (destinatario instanceof Pessoa) {
                    destino['id'] = destinatario.id;
                    destino['tipo'] = 'pessoa';
                }
                this.destinos.push(destino);
            });
            contexto['blocoResponsaveis'] = this.destinos;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveAcao({
                acao: this.tratarValores(contexto),
                operacaoId: operacaoId
            }));
        } else if (!values.blocoDestinatarios) {
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveAcao({
                acao: this.tratarValores(contexto),
                operacaoId: operacaoId
            }));
        }
    }

    tratarValores(values): any {
        const acao = new AcaoTransicaoWorkflow();
        const transicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;
        acao.transicaoWorkflow = transicaoWorkflow;
        values.contexto = JSON.stringify(values);
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );
        return acao;
    }
}
