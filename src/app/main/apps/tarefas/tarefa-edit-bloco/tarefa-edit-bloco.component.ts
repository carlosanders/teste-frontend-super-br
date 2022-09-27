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

import {Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedTarefas} from '../store';
import {getOperacoes, getRouterState} from 'app/store';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'tarefa-edit-bloco',
    templateUrl: './tarefa-edit-bloco.component.html',
    styleUrls: ['./tarefa-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaEditBlocoComponent implements OnInit, OnDestroy {

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];
    operacoesPendentes: any[] = [];

    routerState: any;

    blocoEditEspecie = false;
    blocoEditInicioPrazo = false;
    blocoEditFinalPrazo = false;
    blocoEditUrgente = false;
    blocoEditDistribuicao = false;
    blocoEditObservacao = false;
    prazoDesabilitado = false;

    lote: string = '';
    private _profile: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.TarefaEditBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.operacoes = [];

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
            this.prazoDesabilitado = tarefas.filter(tarefa => !tarefa.dataHoraFinalPrazo).length > 0;
        });

        this._store.pipe(
            select(getOperacoes),
            takeUntil(this._unsubscribeAll)
        ).subscribe((operacoes) => {
            this.operacoes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tarefa' && operacao.lote === this.lote);
            this.operacoesPendentes = Object.values(operacoes).filter((operacao: any) => operacao.type === 'tarefa' && operacao.lote === this.lote && operacao.status === 0);
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

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
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
        this.tarefas.forEach((tarefaBloco) => {
            const tarefa = new Tarefa();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.id = tarefaBloco.id;

            const changes = {};

            if (this.blocoEditEspecie) {
                changes['especieTarefa'] = tarefa.especieTarefa.id;
            }

            if (this.blocoEditDistribuicao) {
                if (!values.distribuicaoAutomatica) {
                    changes['setorResponsavel'] = tarefa.setorResponsavel.id;
                    changes['usuarioResponsavel'] = tarefa.usuarioResponsavel.id;

                } else {
                    changes['distribuicaoAutomatica'] = true;
                    changes['setorResponsavel'] = tarefa.setorResponsavel.id;
                }
            }

            if (this.blocoEditInicioPrazo) {
                changes['dataHoraInicioPrazo'] = tarefa.dataHoraInicioPrazo;
            }

            if (this.blocoEditFinalPrazo) {
                changes['dataHoraFinalPrazo'] = tarefa.dataHoraFinalPrazo;
            }

            if (this.blocoEditUrgente) {
                changes['urgente'] = tarefa.urgente;
            }

            if (this.blocoEditObservacao) {
                changes['observacao'] = tarefa.observacao;
            }

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveTarefa({
                tarefa: tarefa,
                changes: changes,
                operacaoId: operacaoId,
                loteId: this.lote
            }));
        });
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.split('/tarefa-editar-bloco')[0] + '/operacoes-bloco']).then();
    }
}
