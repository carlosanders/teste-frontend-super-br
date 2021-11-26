import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Setor} from '@cdk/models/setor.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../../store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'admin-setor-edit',
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
    logEntryPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

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

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'unidade.id': 'eq:' + this.routerState.params.unidadeHandle
        };
        this.especieSetorPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        this.especieSetorPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.setor$.pipe(
            filter(setor => !!setor),
            takeUntil(this._unsubscribeAll)
        ).subscribe(setor => this.setor = setor);
        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Setor', id: +this.setor.id};

        if (!this.setor) {
            this.setor = new Setor();
            this.setor.ativo = true;
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

        const setor = new Setor();
        Object.entries(values).forEach(
            ([key, value]) => {
                setor[key] = value;
            }
        );

        if (!setor.sequenciaInicialNUP) {
            setor.sequenciaInicialNUP = 1;
        }

        if (!setor.parent) {
            const parent = new Setor();
            parent.id = parseInt(this.routerState.params.unidadeHandle, 10);
            setor.parent = parent;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveSetor({
            setor: setor,
            operacaoId: operacaoId
        }));
    }

}
