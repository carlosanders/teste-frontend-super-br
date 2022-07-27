import {ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {merge, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {CdkNavigationItem} from '@cdk/types';
import {cdkAnimations} from '@cdk/animations';
import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-nav-vertical-collapsable',
    templateUrl: './collapsable.component.html',
    styleUrls: ['./collapsable.component.scss'],
    animations: cdkAnimations
})
export class CdkNavVerticalCollapsableComponent implements OnInit, OnDestroy {
    @Input()
    item: CdkNavigationItem;

    @HostBinding('class')
    classes = 'nav-collapsable nav-item';

    @HostBinding('class.open')
    public isOpen = false;

    isGrantedRole: boolean;
    isCoordenador: boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkNavigationService
     * @param _router
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkNavigationService: CdkNavigationService,
        private _router: Router,
        public _loginService: LoginService
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
        // Listen for router events
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((event: NavigationEnd) => {

                // Check if the url can be found in
                // one of the children of this item
                if (this.isUrlInChildren(this.item, event.urlAfterRedirects) || this.item.startExpanded) {
                    this.expand();
                } else {
                    this.collapse();
                }
            });

        // Listen for collapsing of any navigation item
        this._cdkNavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (clickedItem) => {
                    if (clickedItem && clickedItem.children) {
                        // Check if the clicked item is one
                        // of the children of this item
                        if (this.isChildrenOf(this.item, clickedItem)) {
                            return;
                        }

                        // Check if the url can be found in
                        // one of the children of this item
                        if (this.isUrlInChildren(this.item, this._router.url)) {
                            return;
                        }

                        // If the clicked item is not this item, collapse...
                        if (this.item !== clickedItem && !this.item.startExpanded) {
                            this.collapse();
                        }
                    }
                }
            );

        // Check if the url can be found in
        // one of the children of this item
        if (this.isUrlInChildren(this.item, this._router.url) || this.item.startExpanded) {
            this.expand();
        } else {
            this.collapse();
        }

        // Subscribe to navigation item
        merge(
            this._cdkNavigationService.onNavigationItemAdded,
            this._cdkNavigationService.onNavigationItemUpdated,
            this._cdkNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                const badge = this.item.badge;

                if (badge) {
                    delete this.item['badge'];
                    this._changeDetectorRef.detectChanges();
                    this.item['badge'] = badge;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.isGrantedRole = true;

        if (this.item.role) {
            this.isGrantedRole = false;
            if (Array.isArray(this.item.role)) {
                this.item.role.forEach((role) => {
                    if (!this.isGrantedRole) {
                        this.isGrantedRole = this._loginService.isGranted(role);
                    }
                });
            } else {
                this.isGrantedRole = this._loginService.isGranted(this.item.role);
            }
        }

        this.isCoordenador = this._loginService.isCoordenador();
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
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpen(ev): void {
        ev.preventDefault();

        this.isOpen = !this.isOpen;

        // Navigation collapse toggled...
        this._cdkNavigationService.onItemCollapsed.next(this.item);
        this._cdkNavigationService.onItemCollapseToggled.next(true);
    }

    /**
     * Expand the collapsable navigation
     */
    expand(): void {
        if (this.isOpen) {
            return;
        }

        this.isOpen = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        this._cdkNavigationService.onItemCollapseToggled.next(true);
    }

    /**
     * Collapse the collapsable navigation
     */
    collapse(): void {
        if (!this.isOpen) {
            return;
        }

        this.isOpen = false;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        this._cdkNavigationService.onItemCollapseToggled.next(true);
    }

    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns
     */
    isChildrenOf(parent, item): boolean {
        const children = parent.children;

        if (!children) {
            return false;
        }

        if (children.indexOf(item) > -1) {
            return true;
        }

        for (const child of children) {
            if (child.children) {
                if (this.isChildrenOf(child, item)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns
     */
    isUrlInChildren(parent, url): boolean {
        const children = parent?.children;

        if (!children) {
            return false;
        }

        for (const child of children) {
            if (child.children) {
                if (this.isUrlInChildren(child, url)) {
                    return true;
                }
            }

            if (child.url === url || url.includes(child.url)) {
                return true;
            }
        }

        return false;
    }

}
