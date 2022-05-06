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

import * as fromStore from 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getTarefa} from '../../store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Colaborador} from '@cdk/models/colaborador.model';
import {Back, getOperacoes} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'compartilhamento-create',
    templateUrl: './compartilhamento-create.component.html',
    styleUrls: ['./compartilhamento-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CompartilhamentoCreateComponent implements OnInit, OnDestroy {

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    compartilhamento: Compartilhamento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    operacoes: any[] = [];
    operacoesPendentes: any[] = [];
    lote: string;

    routerState: any;

    usuarioPagination: Pagination;
    setorPagination: Pagination;
    grupoContatoPagination: Pagination;

    private _profile: Colaborador;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.CompartilhamentoCreateAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefa$ = this._store.pipe(select(getTarefa));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

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

    /**
     * On init
     */
    ngOnInit(): void {
        this.compartilhamento = new Compartilhamento();
        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(tarefa => !!tarefa)
        ).subscribe((tarefa) => {
            this.compartilhamento.tarefa = tarefa;
        });

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

    doAbort(): void {
        this._store.dispatch(new Back());
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

    submit(values): void {
        const compartilhamento = new Compartilhamento();

        Object.entries(values).forEach(
            ([key, value]) => {
                compartilhamento[key] = value;
            }
        );


        switch (values.modalidadeCompartilhamento){
            case "usuario":
                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.SaveCompartilhamento({
                    compartilhamento: compartilhamento,
                    operacaoId: operacaoId
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
                this._store.dispatch(new fromStore.GetLotacoesCompartilhamento({
                    compartilhamento,
                    params
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
                        this._store.dispatch(new fromStore.SaveCompartilhamentoSetor({
                            compartilhamento: compartilhamentoGrupo,
                            operacaoId: operacaoIdGrupo,
                        }));
                    }
                });
                break;
        }
    }
}
