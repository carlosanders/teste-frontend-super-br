import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {of, Subject, switchMap} from 'rxjs';
import {takeUntil, } from 'rxjs/operators';

import {CdkConfigService} from '@cdk/services/config.service';
import {navigation} from 'app/navigation/navigation';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'vertical-layout-1',
    templateUrl: './layout-1.component.html',
    styleUrls: ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy {
    cdkConfig: any;
    navigation: any;
    chatOpen: boolean = false;
    isAutenticated: boolean = false;

    mobileMode: boolean;
    // Private
    private _unsubscribeAll: Subject<any>;
    private innerWidth: any;

    constructor(
        private _cdkConfigService: CdkConfigService,
        private _loginService: LoginService
    ) {
        // Set the defaults
        this.navigation = navigation;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        this.innerWidth = window.innerWidth;
        this.mobileMode = innerWidth <= 600;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.cdkConfig = config;
            });
        this._loginService
            .getUserProfileChanges()
            .pipe(
                switchMap((profile) => of(!!profile)),
            ).subscribe((autenticated)=> this.isAutenticated = autenticated);

        this.innerWidth = window.innerWidth;
        this.mobileMode = innerWidth <= 600;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    toogleChat(isOpen: boolean): void {
        this.chatOpen = isOpen;
    }
}
