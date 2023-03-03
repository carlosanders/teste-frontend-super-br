import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy, OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-login-form',
    templateUrl: './cdk-login-form.component.html',
    styleUrls: ['./cdk-login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
})
export class CdkLoginFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    config: any;

    @Input()
    version: any;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    loading: boolean;

    @Input()
    loadingConfig: boolean;

    @Input()
    errorMessage: string | null;

    /**
     *
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        public _loginService: LoginService
    ) {
        const tipoLogin = this._loginService.getLoginType()?? 'interno';

        this.form = this._formBuilder.group({
            tipoLogin: [tipoLogin, [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.onChangeTipoLogin(
            this._loginService.getLoginType()?? 'interno'
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['config'] && this.config) {
            this.initByAtivos();
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({formError: data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({rulesError: this.errors.error.message});
            }
        }

        if (!this.errors) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    initByAtivos() {
        if(this.config.tiposLogin.includes('login_interno_ativo')) {
            this.form.get('tipoLogin').setValue('interno');
        } else if(this.config.tiposLogin.includes('login_ldap_ativo')) {
            this.form.get('tipoLogin').setValue('ldap');
        } else if(this.config.tiposLogin.includes('login_govbr_ativo')) {
            this.form.get('tipoLogin').setValue('govBr');
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    onChangeTipoLogin(tipo): void {
        this._loginService.setLoginType(tipo);
        this.form.get('tipoLogin').setValue(tipo);
        this._changeDetectorRef.markForCheck();
    }
}
