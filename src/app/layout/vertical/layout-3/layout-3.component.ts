import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import { CdkConfigService } from '@cdk/services/config.service';
import { navigation } from 'app/navigation/navigation';

@Component({
    selector     : 'vertical-layout-3',
    templateUrl  : './layout-3.component.html',
    styleUrls    : ['./layout-3.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout3Component implements OnInit, OnDestroy
{
    cdkConfig: any;
    navigation: any;
    chatOpen: boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    private innerWidth: any;
    mobileMode: boolean;

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        this.mobileMode = innerWidth <= 600;
    }

    /**
     * @param _cdkConfigService
     */
    constructor(
        private _cdkConfigService: CdkConfigService
    )
    {
        // Set the defaults
        this.navigation = navigation;
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
            .subscribe((config) => {
                this.cdkConfig = config;
            });

        this.innerWidth = window.innerWidth;
        this.mobileMode = innerWidth <= 600;
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

    toogleChat(isOpen:boolean) : void
    {
        this.chatOpen = isOpen;
    }
}
