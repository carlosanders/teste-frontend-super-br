import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { cdkAnimations } from '@cdk/animations';
import { CdkConfigService } from '@cdk/services/config.service';
import {Router} from '@angular/router';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector   : 'cdk-nav-horizontal-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls  : ['./collapsable.component.scss'],
    animations : cdkAnimations
})
export class CdkNavHorizontalCollapsableComponent implements OnInit, OnDestroy
{
    cdkConfig: any;
    isOpen = false;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @Input()
    item: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _cdkConfigService
     * @param _loginService
     */
    constructor(
        private _cdkConfigService: CdkConfigService,
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
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.cdkConfig = config;
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
