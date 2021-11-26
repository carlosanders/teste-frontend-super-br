import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';

import {CdkConfigService} from '@cdk/services/config.service';
import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {Usuario} from '@cdk/models/usuario.model';

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    cdkConfig: any;
    navigation: any;

    userProfile: Usuario;

    // Private
    private _cdkPerfectScrollbar: CdkPerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * @param _cdkConfigService
     * @param _cdkNavigationService
     * @param _cdkSidebarService
     * @param _loginService
     * @param _router
     */
    constructor(
        public _cdkConfigService: CdkConfigService,
        private _cdkNavigationService: CdkNavigationService,
        private _cdkSidebarService: CdkSidebarService,
        public _loginService: LoginService,
        private _router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.userProfile = this._loginService.getUserProfile();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(CdkPerfectScrollbarDirective, {static: true})
    set directive(theDirective: CdkPerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._cdkPerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._cdkNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._cdkPerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if (activeNavItem && activeNavItem.offsetTop && activeNavItem.offsetParent) {
                            const activeItemOffsetTop = activeNavItem.offsetTop;
                                const activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop;
                                const scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

                            this._cdkPerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                    if (this._cdkSidebarService.getSidebar('navbar')) {
                        this._cdkSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Subscribe to the config changes
        this._cdkConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.cdkConfig = config;
            });

        // Get current navigation
        this._cdkNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._cdkNavigationService.getCurrentNavigation();
            });

        this._loginService.getUserProfileChanges()
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(userProfile => !!userProfile)
            )
            .subscribe(userProfile => this.userProfile = userProfile);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._cdkSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._cdkSidebarService.getSidebar('navbar').toggleFold();
    }
}
