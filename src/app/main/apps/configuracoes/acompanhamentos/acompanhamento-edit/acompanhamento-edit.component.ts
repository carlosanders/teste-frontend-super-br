import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Compartilhamento, Pagination, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'acompanhamento-edit',
    templateUrl: './acompanhamento-edit.component.html',
    styleUrls: ['./acompanhamento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcompanhamentoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    acompanhamento$: Observable<Compartilhamento>;
    acompanhamento: Compartilhamento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    modalidadeAcompanhamentoPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AcompanhamentoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acompanhamento$ = this._store.pipe(select(fromStore.getAcompanhamento));
        this.usuario = this._loginService.getUserProfile();

        this.modalidadeAcompanhamentoPagination = new Pagination();

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

        this.acompanhamento$.pipe(
            filter(acompanhamento => !!acompanhamento),
            takeUntil(this._unsubscribeAll)
        ).subscribe(acompanhamento => this.acompanhamento = acompanhamento);

        if (!this.acompanhamento) {
            this.acompanhamento = new Compartilhamento();
            this.acompanhamento.usuario = this.usuario;
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

    submit(values): void {

        const acompanhamento = new Compartilhamento();

        Object.entries(values).forEach(
            ([key, value]) => {
                acompanhamento[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAcompanhamento({
            acompanhamento: acompanhamento,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
