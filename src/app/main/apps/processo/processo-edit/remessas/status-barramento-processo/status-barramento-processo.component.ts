import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation, ChangeDetectorRef
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Observable, of, Subject} from 'rxjs';

import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {StatusBarramento} from '@cdk/models/status-barramento';
import {filter, takeUntil} from 'rxjs/operators';
import {getRouterState} from '../../../../../../store';

@Component({
    selector: 'status-barramento-processo',
    templateUrl: './status-barramento-processo.component.html',
    styleUrls: ['./status-barramento-processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})

export class StatusBarramentoProcessoComponent implements OnInit, OnDestroy {
    statusBarramento$: Observable<StatusBarramento>;
    statusBarramento: StatusBarramento;
    errors$: Observable<any>;
    routerState: any;
    loading$: Observable<boolean> = of(false);
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.StatusBarramentoAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _ref: ChangeDetectorRef
    ) {
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.statusBarramento$ = this._store.pipe(select(fromStore.getStatusBarramento));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.statusBarramento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((statusBarramento) => {
            this.statusBarramento = statusBarramento;
            this._ref.detectChanges();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    doBack(): void {
        this._router.navigate([this.routerState.url.replace('status-barramento-processo', 'listar')]).then();
    }
}
