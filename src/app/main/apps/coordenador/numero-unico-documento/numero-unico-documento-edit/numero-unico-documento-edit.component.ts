import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {NumeroUnicoDocumento, Pagination, Setor, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'numero-unico-documento-edit',
    templateUrl: './numero-unico-documento-edit.component.html',
    styleUrls: ['./numero-unico-documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class NumeroUnicoDocumentoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    numeroUnicoDocumento$: Observable<NumeroUnicoDocumento>;
    numeroUnicoDocumento: NumeroUnicoDocumento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    setor$: Observable<Setor>;
    setor: Setor;
    tipoDocumentoPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.NumeroUnicoDocumentoEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.numeroUnicoDocumento$ = this._store.pipe(select(fromStore.getNumeroUnicoDocumento));
        this.usuario = this._loginService.getUserProfile();
        this.setor$ = this._store.pipe(select(fromStore.getSetor));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.tipoDocumentoPagination = new Pagination();
        this.tipoDocumentoPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.numeroUnicoDocumento$.pipe(
            filter(numeroUnicoDocumento => !!numeroUnicoDocumento),
            takeUntil(this._unsubscribeAll)
        ).subscribe(numeroUnicoDocumento => this.numeroUnicoDocumento = numeroUnicoDocumento);

        this.setor$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(setor => this.setor = setor);

        if (!this.numeroUnicoDocumento) {
            this.numeroUnicoDocumento = new NumeroUnicoDocumento();
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const numeroUnicoDocumento = new NumeroUnicoDocumento();
        Object.entries(values).forEach(
            ([key, value]) => {
                numeroUnicoDocumento[key] = value;
            }
        );

        numeroUnicoDocumento.setor = this.setor;

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveNumeroUnicoDocumento({
            numeroUnicoDocumento: numeroUnicoDocumento,
            operacaoId: operacaoId
        }));
    }

}
