import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Relatorio} from '@cdk/models/relatorio.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {GeneroRelatorio} from '../../../../../@cdk/models/genero-relatorio.model';

@Component({
    selector: 'relatorio-create',
    templateUrl: './relatorio-create.component.html',
    styleUrls: ['./relatorio-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    relatorio: Relatorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    generoRelatorio$: Observable<GeneroRelatorio[]>;

    routerState: any;

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

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.relatorio = new Relatorio();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const relatorio = new Relatorio();

        Object.entries(values).forEach(
            ([key, value]) => {
                if (key === 'dataHoraInicio' || key === 'dataHoraFim')
                {
                    relatorio[key] = value.format('YYYY-MM-DDTHH:mm:ss');
                }
                if (key === 'usuario')
                {
                    relatorio[key] = value.id;
                }
                else {
                    relatorio[key] = value;
                }
            }
        );

        const parametros = relatorio.tipoRelatorio.parametros.split(',');

        if (parametros.length > 0) {
            parametros.forEach((campo) => {
                relatorio.parametros.push(relatorio[campo]);
                relatorio[campo] = '';
            });
        }
        console.log(relatorio);
        relatorio.vinculacoesEtiquetas = this.relatorio.vinculacoesEtiquetas;

        this._store.dispatch(new fromStore.SaveRelatorio(relatorio));

    }

}
