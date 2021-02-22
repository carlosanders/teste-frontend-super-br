import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkConfigService } from '@cdk/services/config.service';
import { cdkAnimations } from '@cdk/animations';
import * as fromStore from 'app/main/auth/login/store';
import { getLoginAppState } from 'app/main/auth/login/store';
import {environment} from "../../../../environments/environment";
import {getRouterState} from "../../../store";
import {getConfig, getErrorMessage, getLoadingConfig} from './store/selectors';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    getLoginState: Observable<any>;
    errorMessage$: Observable<any>;
    errorMessage: string | null;
    loadingConfig$: Observable<boolean>;
    loading: boolean;
    certificadoDigital = '';
    routerState: any;

    config$: Observable<any>;

    config: any;

    /**
     * Constructor
     *
     * @param cdkConfigService
     * @param formBuilder
     * @param store
     */
    constructor(
        private cdkConfigService: CdkConfigService,
        private formBuilder: FormBuilder,
        private store: Store<fromStore.LoginState>
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

        this.store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.getLoginState = this.store.pipe(select(getLoginAppState));
        this.config$ = this.store.pipe(select(getConfig));
        this.errorMessage$ = this.store.pipe(select(getErrorMessage));
        this.loadingConfig$ = this.store.pipe(select(getLoadingConfig));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.store.dispatch(new fromStore.Unload());

        this.loading = false;

        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.errorMessage$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
        });

        this.getLoginState.subscribe((state) => {
            this.loading = false;
        });

        this.config$.subscribe((config) => {
            this.config = config;
        });

        if (environment.base_url_x509) {
            this.certificadoDigital = environment.base_url_x509;
        }

        if (this.routerState.params['token'] &&
            this.routerState.params['exp'] &&
            this.routerState.params['timestamp']) {
            this.store.dispatch(new fromStore.LoginSuccess({
                token: this.routerState.params['token'],
                exp: this.routerState.params['exp'],
                timestamp: this.routerState.params['timestamp']
            }));
        }
    }

    reloadConfig(): void {
        this.store.dispatch(new fromStore.GetConfig());
    }

    onSubmit(): void {
        const payload = {
            username: this.loginForm.controls.username.value.replace(/\D/g,''),
            password: this.loginForm.controls.password.value
        };
        this.loading = true;
        this.store.dispatch(new fromStore.Login(payload));
    }
}
