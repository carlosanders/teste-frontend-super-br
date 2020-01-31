import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations'; 
import {Observable} from 'rxjs';

import {Processo} from '@cdk/models/processo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getProcesso} from './store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'aproveitar-dados',
    templateUrl: './aproveitar-dados.component.html',
    styleUrls: ['./aproveitar-dados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AproveitarDadosComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    processoPagination: Pagination;

    _profile: Colaborador;

    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.AproveitarDadosAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));

        this._profile = this._loginService.getUserProfile();
        this.processoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveProcesso(processo));

    }

    onActivate(componentReference): void  {
    }

    onDeactivate(componentReference): void  {
    }
}
