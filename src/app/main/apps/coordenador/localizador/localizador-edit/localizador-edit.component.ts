import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Localizador} from '@cdk/models/localizador.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination, Setor, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'localizador-edit',
    templateUrl: './localizador-edit.component.html',
    styleUrls: ['./localizador-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class LocalizadorEditComponent implements OnInit, OnDestroy {

    routerState: any;
    localizador$: Observable<Localizador>;
    localizador: Localizador;
    setor$: Observable<Setor>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.LocalizadorEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.localizador$ = this._store.pipe(select(fromStore.getLocalizador));
        this.usuario = this._loginService.getUserProfile();
        this.setor$ = this._store.pipe(select(fromStore.getSetor));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll', 'unidade'];
        this.setorPagination.filter = {
            'id': 'eq:' + this.routerState.params.setorHandle ? this.routerState.params.setorHandle : this.routerState.params.entidadeHandle,
            'parent.id': 'isNotNull'
        };

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.localizador$.subscribe(
            localizador => this.localizador = localizador
        );

        if (!this.localizador) {
            this.localizador = new Localizador();
            this.localizador.ativo = true;
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

        const localizador = new Localizador();

        Object.entries(values).forEach(
            ([key, value]) => {
                localizador[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveLocalizador({
            localizador: localizador,
            operacaoId: operacaoId
        }));
    }

}
