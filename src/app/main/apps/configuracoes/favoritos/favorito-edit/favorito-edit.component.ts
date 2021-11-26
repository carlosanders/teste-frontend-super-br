import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Favorito, Pagination, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'favorito-edit',
    templateUrl: './favorito-edit.component.html',
    styleUrls: ['./favorito-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class FavoritoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    favorito$: Observable<Favorito>;
    favorito: Favorito;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    templatePagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.FavoritoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.favorito$ = this._store.pipe(select(fromStore.getFavorito));
        this.usuario = this._loginService.getUserProfile();

        this.templatePagination = new Pagination();
        this.templatePagination.populate = [];

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

        this.favorito$.pipe(
            filter(favorito => !!favorito),
            takeUntil(this._unsubscribeAll)
        ).subscribe(favorito => this.favorito = favorito);

        if (!this.favorito) {
            this.favorito = new Favorito();
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

    submit(values): void {

        const favorito = new Favorito();

        if (!this.favorito.id) {
            switch (values.campo) {

                case 1:
                    favorito.objectClass = 'SuppCore\\AdministrativoBackend\\Entity\\EspecieAtividade';
                    favorito.objectId = values.especieAtividade.id;
                    break;

                case 2:
                    favorito.objectClass = 'SuppCore\\AdministrativoBackend\\Entity\\EspecieTarefa';
                    favorito.objectId = values.especieTarefa.id;
                    break;

                case 3:
                    favorito.objectClass = 'SuppCore\\AdministrativoBackend\\Entity\\Setor';
                    favorito.objectId = values.setorResponsavel.id;
                    break;
            }
            favorito.qtdUso = 1;
            favorito.usuario = this.usuario;
        }
        else {
            favorito.id = this.favorito.id;
            favorito.usuario = this.usuario;
            favorito.objectClass = this.favorito.objectClass;
            favorito.objectId = this.favorito.objectId;
            favorito.qtdUso = this.favorito.qtdUso;
        }

        favorito.label = values.label;
        favorito.prioritario = values.prioritario ? values.prioritario : false;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveFavorito({
            favorito: favorito,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
