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

import {Compartilhamento, Tarefa} from '@cdk/models';
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
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();
    private _profile: Usuario;

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
            this.operacoes = [];
            Object.keys(operacoes).forEach((operacaoId) => {
                if (operacoes[operacaoId].type === 'compartilhamento') {
                    this.operacoes.push(operacoes[operacaoId]);
                }
            });
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
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        this.operacoes = [];

        this.tarefas.forEach((tarefa) => {
            const compartilhamento = new Compartilhamento();

            Object.entries(values).forEach(
                ([key, value]) => {
                    compartilhamento[key] = value;
                }
            );

            compartilhamento.tarefa = tarefa;

            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.SaveCompartilhamento({
                compartilhamento: compartilhamento,
                operacaoId: operacaoId
            }));
        });
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
