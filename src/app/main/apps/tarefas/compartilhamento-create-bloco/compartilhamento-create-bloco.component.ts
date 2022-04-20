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

import {Compartilhamento, Pagination, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedTarefas} from '../store';
import {getOperacoes, getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {Usuario} from '@cdk/models/usuario.model';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'compartilhamento-create',
    templateUrl: './compartilhamento-create-bloco.component.html',
    styleUrls: ['./compartilhamento-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CompartilhamentoCreateBlocoComponent implements OnInit, OnDestroy {

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];
    compartilhamento: Compartilhamento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    routerState: any;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

    usuarioPagination: Pagination;
    setorPagination: Pagination;
    grupoContatoPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.CompartilhamentoCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {
            'id': `neq:${this._loginService.getUserProfile().id}`,
            'colaborador.id': 'isNotNull'
        };

        this.setorPagination = new Pagination();
        this.setorPagination.filter['parent'] = 'isNotNull';
        this.setorPagination.populate = ['unidade', 'parent'];

        this.grupoContatoPagination = new Pagination();
        this.grupoContatoPagination.populate = [
            'contatos',
            'contatos.tipoContato',
            'contatos.setor',
            'contatos.setor.unidade',
            'contatos.usuario',
            'contatos.usuario.colaborador',
            'contatos.usuario.colaborador.lotacoes',
            'contatos.usuario.colaborador.lotacoes.setor',
            'contatos.usuario.colaborador.lotacoes.setor.unidade',
        ];
        this.grupoContatoPagination.filter = {'usuario.id': 'eq:' + this._loginService.getUserProfile().id};
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

    ngOnInit(): void {
        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => this.tarefas = tarefas);

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'compartilhamento' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'compartilhamento' && operacao.lote === this.lote && operacao.status === 0);
            this._changeDetectorRef.markForCheck();
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.operacoes = [];
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        this.operacoes = [];
        this.lote = CdkUtils.makeId();

        this.tarefas.forEach((tarefa) => {
            const compartilhamento = new Compartilhamento();

            Object.entries(values).forEach(
                ([key, value]) => {
                    compartilhamento[key] = value;
                }
            );

            compartilhamento.tarefa = tarefa;

            switch (values.modalidadeCompartilhamento){
                case "usuario":
                    const operacaoId = CdkUtils.makeId();
                    this._store.dispatch(new fromStore.SaveCompartilhamento({
                        compartilhamento: compartilhamento,
                        operacaoId: operacaoId,
                        loteId: this.lote
                    }));
                    break;
                case "setor":
                    const params = {
                        filter: {
                            'setor.id': 'eq:' + compartilhamento.setor.id
                        },
                        gridFilter: {},
                        limit: 10,
                        offset: 0,
                        sort: {id: 'DESC'},
                        populate: [
                            'populateAll',
                            'setor.unidade'
                        ]
                    };
                    this._store.dispatch(new fromStore.GetLotacoesCompartilhamentoBloco({
                        compartilhamento,
                        params,
                        loteId: this.lote
                    }));
                    break;
                case "grupoContato":
                    compartilhamento.grupoContato.contatos.forEach(contato =>{
                        const operacaoIdGrupo = CdkUtils.makeId();
                        if(contato.usuario){
                            const compartilhamentoGrupo  = new Compartilhamento();
                            Object.entries(values).forEach(
                                ([key, value]) => {
                                    compartilhamentoGrupo[key] = value;
                                }
                            );
                            compartilhamentoGrupo['usuario'] = contato.usuario;
                            compartilhamentoGrupo['tarefa'] = tarefa;
                            this._store.dispatch(new fromStore.SaveCompartilhamentoSetorBloco({
                                compartilhamento: compartilhamentoGrupo,
                                operacaoId: operacaoIdGrupo,
                                loteId: this.lote
                            }));
                        }
                    });
                    break;
            }
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
