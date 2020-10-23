import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Setor} from '@cdk/models/setor.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'unidade-edit',
    templateUrl: './unidade-edit.component.html',
    styleUrls: ['./unidade-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UnidadeEditComponent implements OnInit, OnDestroy {

    routerState: any;
    unidade$: Observable<Setor>;
    unidade: Setor;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    generoSetorPagination: Pagination;
    setorPagination: Pagination;


    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.UnidadeEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            parent: 'isNull'
        };
        this.generoSetorPagination = new Pagination();
        this.generoSetorPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.unidade$.subscribe(
            setor => this.unidade = setor
        );

        if (!this.unidade) {
            this.unidade = new Setor();
            this.unidade.ativo = true;
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
        console.log(values);
        const unidade = new Setor();
        Object.entries(values).forEach(
            ([key, value]) => {
                unidade[key] = value;
            }
        );

        if (!unidade.sequenciaInicialNUP) {
            unidade.sequenciaInicialNUP = 0;
        }

        if (!unidade.unidade) {
            const unid = new Setor();
            unid.id = values.id;
            unidade.unidade = unid;
        }

        this._store.dispatch(new fromStore.SaveUnidade(unidade));
    }
}
