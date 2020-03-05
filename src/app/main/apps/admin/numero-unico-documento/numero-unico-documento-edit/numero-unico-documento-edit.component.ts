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
import {Usuario, NumeroUnicoDocumento, Pagination} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from "@angular/router";
import {getRouterState} from "../../../../../store/reducers";

@Component({
    selector: 'numero-unico-documento-edit',
    templateUrl: './numero-unico-documento-edit.component.html',
    styleUrls: ['./numero-unico-documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class NumeroUnicoDocumentoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    numeroUnicoDocumento$: Observable<NumeroUnicoDocumento>;
    numeroUnicoDocumento: NumeroUnicoDocumento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setorPagination: Pagination;
    tipoDocumentoPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.NumeroUnicoDocumentoEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.numeroUnicoDocumento$ = this._store.pipe(select(fromStore.getNumeroUnicoDocumento));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination = new Pagination();
        this.tipoDocumentoPagination = new Pagination();

        this.setorPagination.populate = ['populateAll', 'unidade'];
        this.tipoDocumentoPagination.populate = ['populateAll'];
        this.setorPagination.filter = {'unidade.id':'eq:' + this.routerState.params.unidadeHandle};

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.numeroUnicoDocumento$.subscribe(
            numeroUnicoDocumento => this.numeroUnicoDocumento = numeroUnicoDocumento
        );

        if (!this.numeroUnicoDocumento) {
            this.numeroUnicoDocumento = new NumeroUnicoDocumento();
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

        const numeroUnicoDocumento = new NumeroUnicoDocumento();
        Object.entries(values).forEach(
            ([key, value]) => {
                numeroUnicoDocumento[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveNumeroUnicoDocumento(numeroUnicoDocumento));

    }

}
