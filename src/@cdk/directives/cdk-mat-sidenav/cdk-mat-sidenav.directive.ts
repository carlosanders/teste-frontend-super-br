import {Directive, HostBinding, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {MatSidenav} from '@cdk/angular/material';
import {MediaObserver} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CdkMatchMediaService} from '@cdk/services/match-media.service';
import {CdkMatSidenavHelperService} from '@cdk/directives/cdk-mat-sidenav/cdk-mat-sidenav.service';

@Directive({
    selector: '[cdkMatSidenavHelper]'
})
export class CdkMatSidenavHelperDirective implements OnInit, OnDestroy
{
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input()
    cdkMatSidenavHelper: string;

    @Input()
    matIsLockedOpen: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param _cdkMatchMediaService
     * @param _cdkMatSidenavHelperService
     * @param _matSidenav
     * @param _mediaObserver
     */
    constructor(
        private _cdkMatchMediaService: CdkMatchMediaService,
        private _cdkMatSidenavHelperService: CdkMatSidenavHelperService,
        private _matSidenav: MatSidenav,
        private _mediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Register the sidenav to the service
        this._cdkMatSidenavHelperService.setSidenav(this.cdkMatSidenavHelper, this._matSidenav);

        if ( this.matIsLockedOpen && this._mediaObserver.isActive(this.matIsLockedOpen) )
        {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }

        this._cdkMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                if ( this.matIsLockedOpen && this._mediaObserver.isActive(this.matIsLockedOpen) )
                {
                    this.isLockedOpen = true;
                    this._matSidenav.mode = 'side';
                    this._matSidenav.toggle(true);
                }
                else
                {
                    this.isLockedOpen = false;
                    this._matSidenav.mode = 'over';
                    this._matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[cdkMatSidenavToggler]'
})
export class CdkMatSidenavTogglerDirective
{
    @Input()
    cdkMatSidenavToggler: string;

    /**
     * Constructor
     *
     * @param _cdkMatSidenavHelperService
     */
    constructor(
        private _cdkMatSidenavHelperService: CdkMatSidenavHelperService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick(): void
    {
        this._cdkMatSidenavHelperService.getSidenav(this.cdkMatSidenavToggler).toggle();
    }
}
