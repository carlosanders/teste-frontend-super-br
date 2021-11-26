import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Afastamento, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'afastamento-edit',
    templateUrl: './afastamento-edit.component.html',
    styleUrls: ['./afastamento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AfastamentoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    afastamento$: Observable<Afastamento>;
    afastamento: Afastamento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    modalidadeAfastamentoPagination: Pagination;
    modulo: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AfastamentoEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.afastamento$ = this._store.pipe(select(fromStore.getAfastamento));
        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
        this.usuario = this._loginService.getUserProfile();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.includes('unidades')) {
                this.modulo = 'unidades';
            } else if (this.routerState.url.includes('usuarios')) {
                this.modulo = 'usuarios';
            } else {
                this.modulo = 'lotacoes';
            }
        });

        this.modalidadeAfastamentoPagination = new Pagination();

        this.modalidadeAfastamentoPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.afastamento$.pipe(
            filter(repositorio => !!repositorio),
            takeUntil(this._unsubscribeAll)
        ).subscribe(afastamento => this.afastamento = afastamento);

        if (!this.afastamento) {
            this.afastamento = new Afastamento();
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {
        const afastamento = new Afastamento();
        Object.entries(values).forEach(
            ([key, value]) => {
                afastamento[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAfastamento({
            afastamento: afastamento,
            operacaoId: operacaoId
        }));
    }

}
