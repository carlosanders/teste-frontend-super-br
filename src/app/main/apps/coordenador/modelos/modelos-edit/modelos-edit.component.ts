import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Modelo} from '@cdk/models/modelo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';

@Component({
    selector: 'coordenador-modelos-edit',
    templateUrl: './modelos-edit.component.html',
    styleUrls: ['./modelos-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEditComponent implements OnInit, OnDestroy {

    routerState: any;
    modelo$: Observable<Modelo>;
    modelo: Modelo;
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
        private _store: Store<fromStore.ModeloEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));
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
        this.templatePagination.filter = {
            'unidade.id': 'eq:' + this.routerState.params.unidadeHandle
        }
        

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.modelo$.subscribe(
            modelo => this.modelo = modelo
        );

        if (!this.modelo) {
            this.modelo = new Modelo();
            this.modelo.ativo = true;
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

        const modelo = new Modelo();
        // modelo.id = null;
        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveModelo(modelo));

    }

}
