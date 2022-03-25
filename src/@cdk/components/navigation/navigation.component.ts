import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {merge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';
import {CdkNavigation} from '../../types';

@Component({
    selector: 'cdk-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkNavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    navigation: CdkNavigation[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkNavigationService: CdkNavigationService
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
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._cdkNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._cdkNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._cdkNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._cdkNavigationService.onNavigationItemAdded,
            this._cdkNavigationService.onNavigationItemUpdated,
            this._cdkNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
}
