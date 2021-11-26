import {ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {merge, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CdkNavigationItem} from '@cdk/types';
import {CdkNavigationService} from '@cdk/components/navigation/navigation.service';
import {LoginService} from '../../../../../app/main/auth/login/login.service';

@Component({
    selector   : 'cdk-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class CdkNavVerticalGroupComponent implements OnInit, OnDestroy
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: CdkNavigationItem;

    // Private
    private _unsubscribeAll: Subject<any>;

    isGrantedRole: boolean;
    isCoordenador: boolean;

    /**
     * Constructor
     */

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkNavigationService
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkNavigationService: CdkNavigationService,
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
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

}
