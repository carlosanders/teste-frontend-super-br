import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Relatorio} from '@cdk/models/relatorio.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from 'app/main/apps/relatorios/relatorio-detail/store';
import {SaveRelatorio} from 'app/main/apps/relatorios/relatorio-detail/store';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from '../../../../auth/login/login.service';
import {Colaborador} from '@cdk/models';

@Component({
    selector: 'relatorio-edit',
    templateUrl: './relatorio-edit.component.html',
    styleUrls: ['./relatorio-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    relatorio$: Observable<Relatorio>;
    relatorio: Relatorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RelatorioDetailAppState>,
        public _loginService: LoginService
    ) {
        this.relatorio$ = this._store.pipe(select(fromStore.getRelatorio));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._profile = _loginService.getUserProfile().colaborador;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.relatorio$.pipe(
            filter(relatorio => !this.relatorio || (relatorio.id !== this.relatorio.id)),
            takeUntil(this._unsubscribeAll)
        ).subscribe((relatorio) => {
            this.relatorio = relatorio;
        });
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

    submit(values): void {

        const relatorio = new Relatorio();

        Object.entries(values).forEach(
            ([key, value]) => {
                relatorio[key] = value;
            }
        );

        relatorio.vinculacoesEtiquetas = this.relatorio.vinculacoesEtiquetas;

        this._store.dispatch(new SaveRelatorio(relatorio));

    }
}
