import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

import {cdkAnimations} from '@cdk/animations';

import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'coordenador-setor',
    templateUrl: './setor.component.html',
    styleUrls: ['./setor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SetorComponent implements OnInit, OnDestroy {

    action = '';
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.State>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router
    ) {
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
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    showSidebar(): boolean {
        return (this.routerState.params.setorHandle && this.routerState.params.setorHandle !== 'default' &&
                this.routerState.params.setorHandle !== 'criar')
            && (this.routerState.url.indexOf('modelos') > -1 || this.routerState.url.indexOf('repositorios') > -1 ||
                this.routerState.url.indexOf('etiquetas') > -1 || this.routerState.url.indexOf('usuarios') > -1 ||
                this.routerState.url.indexOf('numeros-unicos-documentos') > -1);
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }
}
