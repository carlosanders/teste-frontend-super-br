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
    Acao,
    Criteria,
    DocumentoAvulso,
    Etiqueta,
    ModalidadeAcaoEtiqueta,
    Pagination,
    Pessoa,
    Setor
} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getEtiqueta} from '../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../../store';
import {LoginService} from '../../../../../../auth/login/login.service';
import {FormControl} from '@angular/forms';
import {CdkUtils} from '../../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'acao-edit',
    templateUrl: './acao-edit.component.html',
    styleUrls: ['./acao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    action: string;
    componentUrl: string;
    acao$: Observable<Acao>;
    acao: Acao;

    modalidadeAcaoEtiquetaList: ModalidadeAcaoEtiqueta[] = [];
    modalidadeAcaoEtiquetaList$: Observable<ModalidadeAcaoEtiqueta[]>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

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

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;

    documentoAvulso: DocumentoAvulso;

    modeloPagination: Pagination;
    gridsearchModeloPagination: Pagination;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    usuarioCompartilhamentoPagination: Pagination;

    modalidadeControl: FormControl = new FormControl();
    selected: ModalidadeAcaoEtiqueta = null;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _changeDetector
     */
    constructor(
        private _store: Store<fromStore.AcaoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _changeDetector: ChangeDetectorRef
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.modalidadeAcaoEtiquetaList$ = this._store.pipe(select(fromStore.getModalidadeAcaoEtiquetaList));

        this.modeloPagination = new Pagination();
        this.modeloPagination.populate = [
            'documento',
            'documento.componentesDigitais'
        ];
        // Alterando filtro para só trazer modelos em branco e individuais
        this.modeloPagination.filter = {
            orX: [
                {
                    'modalidadeModelo.valor': 'eq:EM BRANCO'
                },
                {
                    // Modelos individuais
                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                },
            ]
        };
        this.gridsearchModeloPagination = new Pagination();
        this.gridsearchModeloPagination.populate = [
            'populateAll',
            'documento',
            'documento.componentesDigitais'
        ];
        // Implementando paginação padrão do gridsearch como nacional
        this.gridsearchModeloPagination.filter = {
            andX: [
                {
                    // Modelos nacionais
                    'modalidadeModelo.valor': 'eq:NACIONAL',
                    'vinculacoesModelos.modalidadeOrgaoCentral.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                }
            ]
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
            this.componentUrl = 'acoes/editar/' + this.routerState.params.acaoHandle;
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
        this.etiqueta$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(etiqueta => !!etiqueta)
        ).subscribe((etiqueta) => {
            this.etiqueta = etiqueta;
        });

        this.acao$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(acao => !!acao)
        ).subscribe(acao => this.acao = acao);

        this.modalidadeAcaoEtiquetaList$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(modalidadeAcaoEtiquetaList => !!modalidadeAcaoEtiquetaList)
        ).subscribe(modalidadeAcaoEtiquetaList => this.modalidadeAcaoEtiquetaList = modalidadeAcaoEtiquetaList);

        this.documentoAvulso = new DocumentoAvulso();
        this.documentoAvulso.mecanismoRemessa = 'interna';

        if (!this.acao) {
            this.acao = new Acao();
            this.acao.etiqueta = this.etiqueta;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    goBack(): void {
        this._router.navigate([this.routerState.url.replace(this.componentUrl, 'acoes/listar')]).then();
    }

    submitTrigger1(values): void {
        values.contexto = JSON.stringify({modeloId: values.modelo.id});
        const acao = new Acao();

        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAcao({
            acao: acao,
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
        const acao = new Acao();
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );

        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAcao({
            acao: acao,
            operacaoId: operacaoId
        }));
    }

    submitTrigger3(values): void {
        values.contexto = JSON.stringify({usuarioId: values.usuario.id});
        const acao = new Acao();
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );
        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;

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
        contexto['modalidadeAcaoEtiqueta'] = values.modalidadeAcaoEtiqueta;

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
        const acao = new Acao();
        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;
        values.contexto = JSON.stringify(values);
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );
        return acao;
    }

    displayFn(): string {
        const modalidadeAcao = this.modalidadeAcaoEtiquetaList.find(modalidade => modalidade.valor === this.modalidadeControl.value);
        return modalidadeAcao ? modalidadeAcao.valor + ' - ' + modalidadeAcao.descricao : '';
    }

    getModalidadeAcaoEtiquetaSelecionada(): ModalidadeAcaoEtiqueta {
        return this.modalidadeAcaoEtiquetaList.find(modalidade => modalidade.valor === this.modalidadeControl.value);
    }

    gerirPessoaDestino(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa']).then();
    }

    editPessoaDestino(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    onActivate(componentReference): void {
        const modalidadeValue = this.modalidadeControl.value;
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then(() => {
                    if (pessoa) {
                        this.mecanismoRemessa = 'externa';
                        this.pessoaDestino = pessoa;
                        this.modalidadeControl.setValue(modalidadeValue);
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
}
