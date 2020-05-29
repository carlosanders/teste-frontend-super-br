import {
    ChangeDetectionStrategy, ChangeDetectorRef,
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
import {LoginService} from 'app/main/auth/login/login.service';
import {getSelectedRelatorios} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'relatorio-edit-bloco',
    templateUrl: './relatorio-edit-bloco.component.html',
    styleUrls: ['./relatorio-edit-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioEditBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    relatorios$: Observable<Relatorio[]>;
    relatorios: Relatorio[];

    relatorio: Relatorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.RelatorioEditBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.relatorios$ = this._store.pipe(select(getSelectedRelatorios));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.relatorios$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(relatorios => this.relatorios = relatorios);

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'relatorio')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });

        this.relatorio = new Relatorio();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        this.operacoes = [];

        this.relatorios.forEach(relatorioBloco => {
            const relatorio = new Relatorio();

            Object.entries(values).forEach(
                ([key, value]) => {
                    relatorio[key] = value;
                }
            );

            this._store.dispatch(new fromStore.SaveRelatorio(relatorio));
        });
    }
}
