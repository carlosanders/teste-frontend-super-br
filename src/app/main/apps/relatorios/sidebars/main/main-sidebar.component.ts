import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import * as fromStore from 'app/main/apps/relatorios/store';
import {Folder} from '@cdk/models';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {CdkSidebarService} from '../../../../../../@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'relatorios-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatoriosMainSidebarComponent implements OnInit, OnDestroy {

    folders$: Observable<Folder[]>;
    mode = 'Relatorios';
    links: any;
    routerState: any;
    generoHandle = '';
    typeHandle = '';
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _loginService
     * @param _cdkSidebarService
     */
    constructor(
        private _store: Store<fromStore.RelatoriosAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.folders$ = this._store.pipe(select(fromStore.getFolders));
        const path = 'app/main/apps/relatorios/sidebars/main';

        modulesConfig.forEach((module) => {
            if (module.sidebars.hasOwnProperty(path)) {
                module.sidebars[path].forEach((s => this.links.push(s)));
            }
        });
    }

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
            this.generoHandle = routerState.state.params['generoHandle'];
            this.typeHandle = routerState.state.params['typeHandle'];
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Compose dialog
     */
    create(): void {
        this._store.dispatch(new fromStore.CreateRelatorio());
    }

    onDrop($event): void {
        if (this.mode === 'Relatorios') {
            this._store.dispatch(new fromStore.SetFolderOnSelectedRelatorios({
                relatorio: $event[0].data,
                folder: $event[1]
            }));
        }
    }

    fecharSidebar(): void {
        if (!this._cdkSidebarService.getSidebar('relatorios-main-sidebar').isLockedOpen) {
            this._cdkSidebarService.getSidebar('relatorios-main-sidebar').close();
        }
    }
}
