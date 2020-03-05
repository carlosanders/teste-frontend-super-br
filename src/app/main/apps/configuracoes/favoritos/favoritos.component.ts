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
import * as fromStore from './store';
import {Observable, Subject} from 'rxjs';
import {getRouterState} from '../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'favoritos',
    templateUrl: './favoritos.component.html',
    styleUrls: ['./favoritos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class FavoritosComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    action = '';
    routerState: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.FavoritoEditState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
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
                if (this.routerState.url.indexOf('favorito/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('favorito/editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('favorito/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
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

    /**
     * Refresh
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._cdkSidebarService.getSidebar(name).toggleOpen();
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.favoritoHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('criar', 'listar')]).then();
        }
    }
}
