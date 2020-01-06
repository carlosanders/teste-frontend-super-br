import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import {Router} from '@angular/router';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector   : 'fuse-nav-horizontal-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls  : ['./collapsable.component.scss'],
    animations : fuseAnimations
})
export class FuseNavHorizontalCollapsableComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    isOpen = false;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @Input()
    item: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _fuseConfigService
     * @param _loginService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _loginService: LoginService
    )
    {
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
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.fuseConfig = config;
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open
     */
    @HostListener('mouseenter')
    open(): void
    {
        this.isOpen = true;
    }

    /**
     * Close
     */
    @HostListener('mouseleave')
    close(): void
    {
        this.isOpen = false;
    }
}
