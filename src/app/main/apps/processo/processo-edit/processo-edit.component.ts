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
import * as fromStore from '../store';
import {getRouterState} from '../../../../store/reducers';
import {getSteps} from '../store';

@Component({
    selector: 'processo-edit',
    templateUrl: './processo-edit.component.html',
    styleUrls: ['./processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    steps: any;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.ProcessoAppState>
    ) {
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
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.refresh();
            }
        });

        this._store
            .pipe(
                select(getSteps)
            ).subscribe(steps => {
                if (steps) {
                    this.steps = steps;
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
}
