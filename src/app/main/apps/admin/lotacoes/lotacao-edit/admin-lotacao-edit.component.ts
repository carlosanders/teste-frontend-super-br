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
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {Lotacao} from "@cdk/models/lotacao.model";
import {Router} from "@angular/router";
import {getRouterState} from "../../../../../store/reducers";

@Component({
    selector: 'admin-lotacao-edit',
    templateUrl: './admin-lotacao-edit.component.html',
    styleUrls: ['./admin-lotacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminLotacaoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    lotacao$: Observable<Lotacao>;
    lotacao: Lotacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setorPagination: Pagination;
    colaboradorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.LotacaoEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.lotacao$ = this._store.pipe(select(fromStore.getLotacao));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination = new Pagination();
        this.colaboradorPagination = new Pagination();

        this.setorPagination.populate = ['populateAll'];
        this.colaboradorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {'unidade.id':'eq:' + this.routerState.params.unidadeHandle};

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.lotacao$.subscribe(
            lotacao => this.lotacao = lotacao
        );

        if (!this.lotacao) {
            this.lotacao = new Lotacao();
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

        const lotacao = new Lotacao();
        //localizador.id = null;
        Object.entries(values).forEach(
            ([key, value]) => {
                lotacao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveLotacao(lotacao));

    }

}