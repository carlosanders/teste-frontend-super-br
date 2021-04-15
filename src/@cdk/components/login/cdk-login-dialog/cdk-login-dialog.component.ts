import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewEncapsulation,
    OnInit, Inject
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@cdk/angular/material';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../../../app/main/auth/login/login.service";

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

    certificadoDigital = '';

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
        this.certificadoDigital = data.certificadoDigital;
        this.loadingConfig$ = data.loadingConfig$;
        this.errorMessage$ = data.errorMessage$;

        this.tipoLogin = this._loginService.getLoginType()?? 'externo';

        this.form = this._formBuilder.group({
            tipoLogin: [this.tipoLogin, [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loading$.subscribe(value => {
            this.loading = value;
        });
        this.config$.subscribe(value => {
            this.config = value;
        });
        this.loadingConfig$.subscribe(value => {
            this.loadingConfig = value;
        });
        this.errorMessage$.subscribe(value => {
            this.errorMessage = value;
        });
    }

    onSubmit(values): void {
        this.dialogRef.close(values);
    }

    onChangeTipoLogin(event): void {
        this._loginService.setLoginType(event.value);
    }
}
