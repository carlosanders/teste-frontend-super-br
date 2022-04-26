import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../../../app/main/auth/login/login.service';

@Component({
    selector: 'cdk-login-dialog',
    templateUrl: './cdk-login-dialog.component.html',
    styleUrls: ['./cdk-login-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLoginDialogComponent implements OnInit {

    loading$: Subject<boolean>;
    loading: boolean;

    loadingConfig$: Observable<boolean>;
    loadingConfig: boolean;

    config$: Observable<any>;
    config: any;

    errorMessage$: Observable<any>;
    errorMessage: any;

    tipoLogin: string;

    form: FormGroup;

    /**
     *
     * @param _changeDetectorRef
     * @param dialogRef
     * @param data
     * @param _formBuilder
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        public dialogRef: MatDialogRef<CdkLoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        public _loginService: LoginService
    ) {
        this.loading$ = data.loading$;
        this.config$ = data.config$;
        this.loadingConfig$ = data.loadingConfig$;
        this.errorMessage$ = data.errorMessage$;

        this.tipoLogin = this._loginService.getLoginType()?? 'interno';

        this.form = this._formBuilder.group({
            tipoLogin: [this.tipoLogin, [Validators.required]],
            username: [data.username, [Validators.required]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loading$.subscribe((value) => {
            this.loading = value;
        });
        this.config$.subscribe((value) => {
            this.config = value;
            this.initByAtivos();
        });
        this.loadingConfig$.subscribe((value) => {
            this.loadingConfig = value;
            this.initByAtivos();
        });
        this.errorMessage$.subscribe((value) => {
            this.errorMessage = value;
        });
    }

    initByAtivos() {
        if(this.config.tiposLogin.includes('login_interno_ativo')) {
            this.tipoLogin = this._loginService.getLoginType()?? 'interno';
        } else if(this.config.tiposLogin.includes('login_ldap_ativo')) {
            this.tipoLogin = this._loginService.getLoginType()?? 'ldap';
        } else if(this.config.tiposLogin.includes('login_govbr_ativo')) {
            this.tipoLogin = this._loginService.getLoginType()?? 'govBr';
        }
    }

    onSubmit(values): void {
        this.dialogRef.close(values);
    }

    onChangeTipoLogin(event): void {
        this._loginService.setLoginType(event.value);
    }
}
