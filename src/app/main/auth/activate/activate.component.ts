import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';

import * as fromStore from './store';
import {getActivateAppState} from './store';
import {filter, takeUntil} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

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

    error$: Observable<any>;
    loading$: Observable<any>;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    error: string = '';


    /**
     *
     * @param cdkConfigService
     * @param _router
     * @param _store
     * @param _snackBar
     */
    constructor(
        public cdkConfigService: CdkConfigService,
        private _router: Router,
        private _store: Store<fromStore.ActivateAppState>,
        private _snackBar: MatSnackBar,
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
        this.error$ = this._store.pipe(select(fromStore.getErrors));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.isActivated$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((isActivated) => {
            this.isActivated = isActivated;
        });

        this.getActivateState.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
        });

        this.loading$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((loading) => {
            this.loading = loading;
        });

        this.error$.pipe(
            filter(errors => !!errors),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            const error = 'Erro! ' + (errors?.error?.message || errors?.statusText);
            this._snackBar.open(error, null, {
                duration: 5000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: ['danger-snackbar']
            });
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
