import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';
import {getRouterState} from '../../../store/reducers';
import {Router} from '@angular/router';

import * as fromStore from './store';
import {getActivateAppState} from './store';

@Component({
    selector: 'activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ActivateComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject();

    getActivateState: Observable<any>;
    errorMessage: string | null;
    loading: boolean;
    isActivated$: Observable<boolean>;
    isActivated: boolean;
    routerState: any;
    routerState$: Observable<any>;

    /**
     *
     * @param cdkConfigService
     * @param _router
     * @param _store
     */
    constructor(
        private cdkConfigService: CdkConfigService,
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

        this.routerState$ = this._store.pipe(select(getRouterState));
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

        this.isActivated$.subscribe((isActivated) => {
            this.isActivated = isActivated;
            this.loading = false;
        });

        this.getActivateState.subscribe((state) => {
            this.loading = false;
            this.errorMessage = state.active.errorMessage;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
