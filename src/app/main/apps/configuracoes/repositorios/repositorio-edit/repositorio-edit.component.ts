import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Repositorio, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'repositorio-edit',
    templateUrl: './repositorio-edit.component.html',
    styleUrls: ['./repositorio-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositorioEditComponent implements OnInit, OnDestroy {
    routerState: any;
    repositorio$: Observable<Repositorio>;
    repositorio: Repositorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    modalidadeRepositorioPagination: Pagination;
    logEntryPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RepositorioEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.repositorio$ = this._store.pipe(select(fromStore.getRepositorio));
        this.usuario = this._loginService.getUserProfile();

        this.modalidadeRepositorioPagination = new Pagination();
        this.logEntryPagination = new Pagination();

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
        this.repositorio$.pipe(
            filter(repositorio => !!repositorio),
            takeUntil(this._unsubscribeAll)
        ).subscribe(repositorio => this.repositorio = repositorio);

        if (!this.repositorio) {
            this.repositorio = new Repositorio();
            this.repositorio.ativo = true;
        }
        this.logEntryPagination.filter = {
            entity: 'SuppCore\\AdministrativoBackend\\Entity\\Repositorio',
            id: +this.repositorio.id
        };
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

        const repositorio = new Repositorio();

        Object.entries(values).forEach(
            ([key, value]) => {
                repositorio[key] = value;
            }
        );

        repositorio.usuario = this.usuario;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveRepositorio({
            repositorio: repositorio,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
