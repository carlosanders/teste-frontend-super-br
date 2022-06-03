import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Relatorio} from '@cdk/models/relatorio.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {Back, getRouterState} from '../../../../store';
import {GeneroRelatorio} from '@cdk/models/genero-relatorio.model';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'relatorio-create',
    templateUrl: './relatorio-create.component.html',
    styleUrls: ['./relatorio-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioCreateComponent implements OnInit, OnDestroy {

    relatorio: Relatorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    _profile: Colaborador;
    generoRelatorio$: Observable<GeneroRelatorio[]>;
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _loginService
     * @param dialog
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.RelatorioCreateAppState>,
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

        this.generoRelatorio$ = this._store.pipe(select(fromStore.getGeneroRelatorios));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.relatorio = new Relatorio();
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
        const relatorio = new Relatorio();
        const arrayParams: any = {};
        let parametros: any;

        Object.entries(values).forEach(([key, value]) => {
            relatorio[key] = value;
        });

        if (relatorio.tipoRelatorio.parametros) {
            parametros = relatorio.tipoRelatorio.parametros.split(',');
        }

        if (parametros && parametros.length > 0) {
            parametros.forEach((campo) => {
                if (values[campo]) {
                    if (campo === 'dataHoraInicio' || campo === 'dataHoraFim') {
                        arrayParams[campo] = {
                            name: campo,
                            value: relatorio[campo].format('YYYY-MM-DDTHH:mm:ss'),
                            type: 'dateTime'
                        };
                    } else if (campo === 'prazoGuardaFaseCorrenteAno') {
                        arrayParams[campo] = {
                            name: campo,
                            value: relatorio[campo],
                            type: 'int'
                        };
                    } else {
                        const className = campo.replace(/^./, str => str.toUpperCase());
                        let nClass = 'SuppCore\\AdministrativoBackend\\Entity\\' +
                            className;
                        if (campo === 'unidade') {
                            nClass = 'SuppCore\\AdministrativoBackend\\Entity\\Setor';
                        }

                        arrayParams[campo] = {
                            name: campo,
                            value: relatorio[campo].id,
                            type: 'entity',
                            class: nClass,
                            getter: 'getNome'
                        };
                    }

                    relatorio[campo] = null;
                }
            });
        }

        relatorio.parametros = JSON.stringify(arrayParams);

        relatorio.vinculacoesEtiquetas = this.relatorio.vinculacoesEtiquetas;
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveRelatorio({
            relatorio: relatorio,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
