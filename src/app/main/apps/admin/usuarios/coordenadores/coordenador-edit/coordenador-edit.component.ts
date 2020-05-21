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
import {Coordenador, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';

@Component({
    selector: 'coordenador-edit',
    templateUrl: './coordenador-edit.component.html',
    styleUrls: ['./coordenador-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorEditComponent implements OnInit, OnDestroy {

    routerState: any;
    coordenador$: Observable<Coordenador>;
    coordenador: Coordenador;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    orgaoCentralPagination: Pagination;
    unidadePagination: Pagination;
    setorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.CoordenadorEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.coordenador$ = this._store.pipe(select(fromStore.getCoordenador));
        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.orgaoCentralPagination = new Pagination();
        this.unidadePagination = new Pagination();
        this.setorPagination = new Pagination();

        this.orgaoCentralPagination.populate = ['populateAll'];
        this.unidadePagination.filter = {
            'parent': 'isNull'
        };
        this.unidadePagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'parent': 'isNotNull'
        };
        this.setorPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.coordenador$.subscribe(
            coordenador => this.coordenador = coordenador
        );

        if (!this.coordenador) {
            this.coordenador = new Coordenador();
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const coordenador = new Coordenador();
        Object.entries(values).forEach(
            ([key, value]) => {
                coordenador[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveCoordenador(coordenador));

    }

}
