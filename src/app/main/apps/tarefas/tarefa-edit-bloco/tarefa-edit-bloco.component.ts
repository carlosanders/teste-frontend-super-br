import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Tarefa} from '@cdk/models/tarefa.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector: 'tarefa-edit-bloco',
    templateUrl: './tarefa-edit-bloco.component.html',
    styleUrls: ['./tarefa-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TarefaEditBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    tarefa: Tarefa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    blocoEditEspecie = true;
    blocoEditInicioPrazo = false;
    blocoEditFinalPrazo = false;
    blocoEditUrgente = false;
    blocoEditDistribuicao = false;
    blocoEditObservacao = false;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.TarefaEditBlocoAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();

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
                filter(op => !!op && !!op.content && op.type === 'tarefa')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });

        this.tarefa = new Tarefa();
        this.tarefa.unidadeResponsavel = this._profile.lotacoes[0].setor.unidade;
        this.tarefa.dataHoraInicioPrazo = moment();
        this.tarefa.dataHoraFinalPrazo = moment().add(5, 'days').set({ 'hour' : 20, 'minute' : 0, 'second' : 0 });
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

        this.tarefas.forEach(tarefaBloco => {
            const tarefa = new Tarefa();

            Object.entries(values).forEach(
                ([key, value]) => {
                    tarefa[key] = value;
                }
            );

            tarefa.id = tarefaBloco.id;

            let changes = {};

            if (this.blocoEditEspecie) {
                changes = {
                    'especieTarefa': tarefa.especieTarefa
                };
            }

            if (this.blocoEditDistribuicao) {
                changes = {
                    'setorResponsavel': tarefa.setorResponsavel,
                    'usuarioResponsavel': tarefa.usuarioResponsavel
                };
            }

            if (this.blocoEditInicioPrazo) {
                changes = {
                    'dataHoraInicioPrazo': tarefa.dataHoraInicioPrazo
                };
            }

            if (this.blocoEditFinalPrazo) {
                changes = {
                    'dataHoraFinalPrazo': tarefa.dataHoraFinalPrazo
                };
            }

            if (this.blocoEditUrgente) {
                changes = {
                    'urgente': tarefa.urgente
                };
            }

            if (this.blocoEditObservacao) {
                changes = {
                    'observacao': tarefa.observacao
                };
            }

            this._store.dispatch(new fromStore.SaveTarefa({tarefa: tarefa, changes: changes}));
        });
    }
}