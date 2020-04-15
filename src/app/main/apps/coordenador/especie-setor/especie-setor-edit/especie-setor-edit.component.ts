import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {EspecieSetor, Modelo, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'especie-setor-edit',
    templateUrl: './especie-setor-edit.component.html',
    styleUrls: ['./especie-setor-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieSetorEditComponent implements OnInit, OnDestroy {

    routerState: any;
    especieSetor$: Observable<EspecieSetor>;
    especieSetor: EspecieSetor;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    modelo$: Observable<Modelo>;
    especieSetorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.EspecieSetorEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.especieSetor$ = this._store.pipe(select(fromStore.getEspecieSetor));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.especieSetorPagination = new Pagination();

        this.especieSetorPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.especieSetor$.subscribe(
            especieSetor => this.especieSetor = especieSetor
        );

        if (!this.especieSetor) {
            this.especieSetor = new EspecieSetor();
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

        const especieSetor = new EspecieSetor();
        Object.entries(values).forEach(
            ([key, value]) => {
                especieSetor[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveEspecieSetor(especieSetor));

    }

}
