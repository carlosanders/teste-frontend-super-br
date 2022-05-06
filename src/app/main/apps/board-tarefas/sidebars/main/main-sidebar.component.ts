import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/calendario/store';
import {getRouterState} from 'app/store/reducers';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {ViewMode} from '../../../../../../@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list.service';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'board-tarefas-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class BoardTarefasMainSidebarComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    generoHandle: string = '';
    isXSmallScreen: boolean = false;
    routerState: any;

    constructor(
        private _store: Store<fromStore.CalendarioAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        public _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
        private _breakpointObserver: BreakpointObserver
    ) {
        this._breakpointObserver
            .observe([Breakpoints.XSmall])
            .pipe(
                takeUntil(this._unsubscribeAll),
                distinctUntilChanged()
            )
            .subscribe((state: BreakpointState) => this.isXSmallScreen = state.matches);
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState),
            takeUntil(this._unsubscribeAll)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            this.generoHandle = routerState.state.params['generoHandle'];
        });
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

    fecharSidebar() {
        if(!this._cdkSidebarService.getSidebar('boar-tarefas-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('boar-tarefas-main-sidebar').close();
        }
    }

    navigateToTarefas(viewMode: ViewMode): void {
        this._router.navigate(['/apps/tarefas/' + this.generoHandle + '/minhas-tarefas/entrada'], {state: {'viewMode': viewMode}})
    }
}
