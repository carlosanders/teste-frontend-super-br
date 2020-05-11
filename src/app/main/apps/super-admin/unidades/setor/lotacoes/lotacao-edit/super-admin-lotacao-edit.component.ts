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
import {Usuario, Setor, Lotacao} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from "@angular/router";
import {Back} from '../../../../../../../store/actions';
import {getRouterState} from '../../../../../../../store/reducers';

@Component({
    selector: 'root-lotacao-edit',
    templateUrl: './super-admin-lotacao-edit.component.html',
    styleUrls: ['./super-admin-lotacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SuperAdminLotacaoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    lotacao$: Observable<Lotacao>;
    lotacao: Lotacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setor$: Observable<Setor>;
    setorPagination: Pagination;
    colaboradorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RootLotacaoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.lotacao$ = this._store.pipe(select(fromStore.getLotacao));
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
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
        this.setorPagination.filter = {
            'id': 'eq:' + this.routerState.params.setorHandle
        };
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const lotacao = new Lotacao();
        Object.entries(values).forEach(
            ([key, value]) => {
                lotacao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveLotacao(lotacao));

    }

}
