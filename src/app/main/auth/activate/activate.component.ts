import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';

import * as fromStore from './store';
import {getActivateAppState} from './store';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ActivateComponent implements OnInit, OnDestroy {
    getActivateState: Observable<any>;
    errorMessage: string | null;
    loading: boolean;
    isActivated$: Observable<boolean>;
    isActivated: boolean;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param cdkConfigService
     * @param _router
     * @param _store
     */
    constructor(
        public cdkConfigService: CdkConfigService,
        private _router: Router,
        private _store: Store<fromStore.ActivateAppState>
    ) {
        // Configure the layout
        this.cdkConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.getActivateState = this._store.pipe(select(getActivateAppState));
        this.isActivated$ = this._store.pipe(select(fromStore.getIsActivated));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loading = false;

        this.isActivated$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((isActivated) => {
            this.isActivated = isActivated;
            this.loading = true;
        });

        this.getActivateState.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
            this.loading = false;
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
