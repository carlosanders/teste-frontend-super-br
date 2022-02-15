import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {CdkConfigService} from '@cdk/services/config.service';
import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';

@Component({
    selector: 'navbar-horizontal-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarHorizontalStyle1Component implements OnInit, OnDestroy {
    cdkConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     *
     * @param _cdkConfigService
     * @param _cdkNavigationService
     * @param _cdkSidebarService
     */
    constructor(
        private _cdkConfigService: CdkConfigService,
        private _cdkNavigationService: CdkNavigationService,
        private _cdkSidebarService: CdkSidebarService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get current navigation
        this._cdkNavigationService.onNavigationChanged.pipe(
            filter(value => value !== null),
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
            this.navigation = this._cdkNavigationService.getCurrentNavigation();
        });

        // Subscribe to the config changes
        this._cdkConfigService.config.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((config) => {
            this.cdkConfig = config;
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
}
