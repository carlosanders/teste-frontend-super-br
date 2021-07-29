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

import {DocumentoAvulso, Pagination, Tarefa, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {Back} from '../../../../store/actions';
import {LoginService} from '../../../auth/login/login.service';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'documento-avulso-create',
    templateUrl: './documento-avulso-create-bloco.component.html',
    styleUrls: ['./documento-avulso-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    documentoAvulso: DocumentoAvulso;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Usuario;

    especieDocumentoAvulsoPagination: Pagination;
    setorDestinoPagination: Pagination;
    modeloPagination: Pagination;
    modeloPaginationAndx: any;

    operacoes: any[] = [];

    routerState: any;

    /**
     * @param _store
     * @param _router
     * @param _loginService
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoCreateBlocoAppState>,
        private _router: Router,
        public _loginService: LoginService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._profile = _loginService.getUserProfile();

        this.especieDocumentoAvulsoPagination = new Pagination();
        this.especieDocumentoAvulsoPagination.populate = ['generoDocumentoAvulso'];

        this.setorDestinoPagination = new Pagination();
        this.setorDestinoPagination.filter = {parent: 'isNull'};

        this.modeloPagination = new Pagination();
        this.modeloPagination.populate = ['modalidadeModelo'];
        this.modeloPaginationAndx = [{'documento.tipoDocumento.nome': 'eq:OFÍCIO'}];
        this.modeloPagination.filter = {
            orX: [
                {
                    'modalidadeModelo.valor': 'eq:EM BRANCO',
                },
                {
                    // Modelos individuais
                    'modalidadeModelo.valor': 'eq:INDIVIDUAL',
                    'vinculacoesModelos.usuario.id': 'eq:' + this._loginService.getUserProfile().id
                },
            ]
        };
        if (this._loginService.isGranted('ROLE_COLABORADOR')) {
            this.modeloPagination.filter.orX = [
                ...this.modeloPagination.filter.orX,
                {
                    // Modelos do setor
                    'modalidadeModelo.valor': 'eq:LOCAL',
                    'vinculacoesModelos.setor.id': 'in:' + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')
                },
                {
                    // Modelos da unidade por especie de setor
                    'modalidadeModelo.valor': 'eq:LOCAL',
                    'vinculacoesModelos.unidade.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                },
                {
                    // Modelos nacionais
                    'modalidadeModelo.valor': 'eq:NACIONAL',
                    'vinculacoesModelos.modalidadeOrgaoCentral.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.modalidadeOrgaoCentral.id).join(','),
                    'vinculacoesModelos.especieSetor.id': 'in:'
                        + this._loginService.getUserProfile().colaborador.lotacoes.map(lotacao => lotacao.setor.especieSetor.id).join(',')
                }

            ];
        }

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => this.tarefas = tarefas);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'documento_avulso')
            )
            .subscribe(
                (operacao) => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });

        this.documentoAvulso = new DocumentoAvulso();
        this.documentoAvulso.mecanismoRemessa = 'interna';
        this.documentoAvulso.dataHoraInicioPrazo = moment();
        this.documentoAvulso.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        this.operacoes = [];

        this.tarefas.forEach((tarefaBloco) => {
            const documentoAvulso = new DocumentoAvulso();

            Object.entries(values).forEach(
                ([key, value]) => {
                    documentoAvulso[key] = value;
                }
            );

            documentoAvulso.processo = tarefaBloco.processo;
            documentoAvulso.tarefaOrigem = tarefaBloco;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveDocumentoAvulso({
                documentoAvulso: documentoAvulso,
                operacaoId: operacaoId
            }));
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
