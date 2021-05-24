import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Afastamento} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Colaborador} from '@cdk/models';
import {Back} from '../../../../../store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store/reducers';

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
    colaborador: Colaborador;

    templatePagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AfastamentoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.afastamento$ = this._store.pipe(select(fromStore.getAfastamento));
        this.usuario = this._loginService.getUserProfile();
        this.colaborador = this.usuario.colaborador;

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.templatePagination = new Pagination();
        this.templatePagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.afastamento$.subscribe(
            afastamento => this.afastamento = afastamento
        );

        if (!this.afastamento) {
            this.afastamento = new Afastamento();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const afastamento = new Afastamento();

        Object.entries(values).forEach(
            ([key, value]) => {
                afastamento[key] = value;
            }
        );

        afastamento.colaborador = this.colaborador;

        this._store.dispatch(new fromStore.SaveAfastamento(afastamento));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
