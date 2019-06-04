import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import * as fromStore from 'app/main/auth/login/store';
import { getLoginAppState } from 'app/main/auth/login/store';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    getLoginState: Observable<any>;
    errorMessage: string | null;
    loading: boolean;

    /**
     * Constructor
     *
     * @param fuseConfigService
     * @param formBuilder
     * @param store
     */
    constructor(
        private fuseConfigService: FuseConfigService,
        private formBuilder: FormBuilder,
        private store: Store<fromStore.LoginState>
    )
    {
        // Configure the layout
        this.fuseConfigService.config = {
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

        this.getLoginState = this.store.pipe(select(getLoginAppState));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loading = false;

        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.getLoginState.subscribe((state) => {
            this.loading = false;
            this.errorMessage = state.login.errorMessage;
        });
    }

    onSubmit(): void {
        const payload = {
            username: this.loginForm.controls.username.value,
            password: this.loginForm.controls.password.value
        };
        this.loading = true;
        this.store.dispatch(new fromStore.Login(payload));
    }
}
