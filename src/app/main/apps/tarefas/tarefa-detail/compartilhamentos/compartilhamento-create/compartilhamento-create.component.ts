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
import {Back} from '../../../../../../store';
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

    routerState: any;

    usuarioPagination: Pagination;

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
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveCompartilhamento({
            compartilhamento: compartilhamento,
            operacaoId: operacaoId
        }));
    }
}
