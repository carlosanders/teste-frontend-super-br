import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Contato, GrupoContato, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'contato-edit',
    templateUrl: './contato-edit.component.html',
    styleUrls: ['./contato-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ContatoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    contato$: Observable<Contato>;
    contato: Contato;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    templatePagination: Pagination;
    unidadePagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ContatoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.contato$ = this._store.pipe(select(fromStore.getContato));

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

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
        this.contato$.pipe(
            filter(contato => !!contato),
            takeUntil(this._unsubscribeAll)
        ).subscribe(contato => this.contato = contato);

        if (!this.contato) {
            this.contato = new Contato();
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
        const contato = new Contato();

        Object.entries(values).forEach(
            ([key, value]) => {
                contato[key] = value;
            }
        );

        const grupoContato = new GrupoContato();
        grupoContato.id = this.routerState.params.grupoContatoHandle;
        contato.grupoContato = grupoContato;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveContato({
            contato: contato,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
