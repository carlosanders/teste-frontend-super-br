import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Etiqueta, Pagination, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {getEtiqueta} from '../store';
import {Back} from '../../../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {
    routerState: any;
    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    modalidadeEtiquetaPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.EtiquetaEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));
        this.usuario = this._loginService.getUserProfile();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.modalidadeEtiquetaPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.etiqueta$.pipe(
            filter(etiqueta => !!etiqueta),
            takeUntil(this._unsubscribeAll)
        ).subscribe(etiqueta => this.etiqueta = etiqueta);

        if (!this.etiqueta) {
            this.etiqueta = new Etiqueta();
            this.etiqueta.ativo = true;
            this.etiqueta.corHexadecimal = '#D9E3F0';
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

        const etiqueta = new Etiqueta();

        Object.entries(values).forEach(
            ([key, value]) => {
                etiqueta[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEtiqueta({
            etiqueta: etiqueta,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
