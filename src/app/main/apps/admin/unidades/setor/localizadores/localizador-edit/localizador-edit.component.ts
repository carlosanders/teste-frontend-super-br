import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Localizador} from '@cdk/models/localizador.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination, Setor, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../../../store';
import {getRouterState} from '../../../../../../../store';
import {CdkUtils} from '../../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'admin-localizador-edit',
    templateUrl: './localizador-edit.component.html',
    styleUrls: ['./localizador-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RootLocalizadorEditComponent implements OnInit, OnDestroy {

    routerState: any;
    localizador$: Observable<Localizador>;
    localizador: Localizador;
    setor$: Observable<Setor>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setorPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RootLocalizadorEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.localizador$ = this._store.pipe(select(fromStore.getLocalizador));
        this.usuario = this._loginService.getUserProfile();
        this.setor$ = this._store.pipe(select(fromStore.getSetor));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll', 'unidade'];
        this.setorPagination.filter = {
            id: 'eq:' + this.routerState.params.setorHandle
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.localizador$.pipe(
            filter(localizador => !!localizador),
            takeUntil(this._unsubscribeAll)
        ).subscribe(localizador => this.localizador = localizador);

        if (!this.localizador) {
            this.localizador = new Localizador();
            this.localizador.ativo = true;
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const localizador = new Localizador();
        // localizador.id = null;
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
