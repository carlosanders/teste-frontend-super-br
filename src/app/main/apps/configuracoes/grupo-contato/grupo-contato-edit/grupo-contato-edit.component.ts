import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {GrupoContato} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'grupo-contato-edit',
    templateUrl: './grupo-contato-edit.component.html',
    styleUrls: ['./grupo-contato-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class GrupoContatoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    grupoContato$: Observable<GrupoContato>;
    grupoContato: GrupoContato;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    templatePagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.GrupoContatoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.grupoContato$ = this._store.pipe(select(fromStore.getGrupoContato));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
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

        this.grupoContato$.subscribe(
            grupoContato => this.grupoContato = grupoContato
        );

        if (!this.grupoContato) {
            this.grupoContato = new GrupoContato();
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

        const grupoContato = new GrupoContato();

        Object.entries(values).forEach(
            ([key, value]) => {
                grupoContato[key] = value;
            }
        );

        grupoContato.usuario = this.usuario;
        grupoContato.ativo = true;
        this._store.dispatch(new fromStore.SaveGrupoContato(grupoContato));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
