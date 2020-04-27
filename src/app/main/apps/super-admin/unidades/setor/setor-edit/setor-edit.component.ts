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
import {getRouterState} from '../../../../../../store/reducers';
import {Back} from '../../../../../../store/actions';


@Component({
    selector: 'root-setor-edit',
    templateUrl: './setor-edit.component.html',
    styleUrls: ['./setor-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SetorEditComponent implements OnInit, OnDestroy {

    routerState: any;
    setor$: Observable<Setor>;
    setor: Setor;
    unidade$: Observable<Setor>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setorPagination: Pagination;
    especieSetorPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.SetorEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
        this.usuario = this._loginService.getUserProfile();
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));

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
            'unidade.id': 'eq:' + this.routerState.params.unidadeHandle
        }
        this.especieSetorPagination = new Pagination();
        this.especieSetorPagination.populate = ['populateAll'];

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.setor$.subscribe(
            setor => this.setor = setor
        );

        if (!this.setor) {
            this.setor = new Setor();
            this.setor.ativo = true;
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

        const setor = new Setor();
        Object.entries(values).forEach(
            ([key, value]) => {
                setor[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveSetor(setor));

    }

}
