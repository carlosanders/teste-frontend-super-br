import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';

import {CdkConfigService} from '@cdk/services/config.service';
import {cdkAnimations} from '@cdk/animations';

import * as fromStore from './store';
import * as fromLoginStore from '../login/store';
import {Router} from '@angular/router';
import {MustMatch} from '../register/must-match.validator';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector     : 'update-password',
    templateUrl  : './update-password.component.html',
    styleUrls    : ['./update-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

    form: FormGroup;
    token: string;
    saving$: Observable<boolean>;
    success$: Observable<boolean>;
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        public cdkConfigService: CdkConfigService,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.UpdatePasswordState>,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    )
    {
        // Configure the layout
        this.cdkConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.saving$ = this._store.pipe(
            select(fromStore.isSaving)
        )

        this.success$ = this._store.pipe(
            select(fromStore.isSuccess)
        )

        this._store.pipe(
            select(fromLoginStore.getToken),
            takeUntil(this._unsubscribeAll)
        ).subscribe((token: string) => this.token = token);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.form = this._formBuilder.group(
            {
            oldPasword: ['', [Validators.required]],
            plainPassword: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
            },
            {
                validator: MustMatch('plainPassword', 'confirmPassword')
            }
        );

        this._store.pipe(
            select(fromStore.getErrorMessage),
            takeUntil(this._unsubscribeAll)
        ).subscribe((errors) => {
            if (errors && errors.status && (errors.status === 400 || errors.status === 422)) {
                try {
                    const data = JSON.parse(errors.message);

                    console.log(111, data)
                    data.forEach((error) => {
                        const control = this.form.get(error.propertyPath);
                        console.log(222, error.propertyPath, control)
                        control.setErrors({formError: error.message});
                    })
                } catch (e) {
                    this.form.setErrors({rulesError: errors.message});
                }
            }

            if (!errors) {
                Object.keys(this.form.controls).forEach((key) => {
                    this.form.get(key).setErrors(null);
                });

                this.form.setErrors(null);
            }

            this._changeDetectorRef.markForCheck();
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

    onSubmit(): void {
        const payload = {
            token: this.token,
            oldPassword: this.form.controls.oldPasword.value,
            newPassword: this.form.controls.plainPassword.value,
        };
        this._store.dispatch(new fromStore.UpdatePassword(payload));
    }

    onBack(): void {
        this._store.dispatch(new fromStore.Unload());
        this._router.navigate(['app/main/auth/login']).then();
    }
}
