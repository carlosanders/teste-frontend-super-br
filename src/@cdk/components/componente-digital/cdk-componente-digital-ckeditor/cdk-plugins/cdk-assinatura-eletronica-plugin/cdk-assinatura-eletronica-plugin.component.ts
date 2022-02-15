import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {LoginService} from "../../../../../../app/main/auth/login/login.service";
import {CdkConfigService} from "../../../../../services/config.service";

@Component({
    selector: 'cdk-assinatura-eletronica-plugin',
    templateUrl: './cdk-assinatura-eletronica-plugin.component.html',
    styleUrls: ['./cdk-assinatura-eletronica-plugin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssinaturaEletronicaPluginComponent implements OnInit {

    form: FormGroup;
    temAssinador: boolean = false;
    urlAssinadorLinux = environment.base_url + 'AssinadorSUPP.deb';
    urlAssinadorWindows = environment.base_url + 'AssinadorSUPP.exe';
    labelLdap = '';

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param _loginService
     * @param dialogRef
     */
    constructor(
        private cdkConfigService: CdkConfigService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        public dialogRef: MatDialogRef<CdkAssinaturaEletronicaPluginComponent>,
    ) {
        this.form = this._formBuilder.group({
            certificadoDigital: [null],
            plainPassword: [null, [Validators.required]]
        });
    }

    close(): void {
        if (this.form.valid) {
            this.dialogRef.close({
                certificadoDigital: this.form.get('certificadoDigital').value,
                plainPassword: this.form.get('plainPassword').value
            });
        }
    }

    ngOnInit(): void {
        this.temAssinador = !!localStorage.getItem('assinador');
        if (this._loginService.getLoginType() === 'ldap') {
            this.labelLdap = this.cdkConfigService.ldap;
        } else {
            this.labelLdap = '';
        }
        this.form.get('certificadoDigital').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value) {
                        this.form.get('plainPassword').reset();
                        this.form.get('plainPassword').disable();
                    } else {
                        this.form.get('plainPassword').enable();
                    }
                    this._changeDetectorRef.detectChanges();
                    return of([]);
                }
            )
        ).subscribe();
    }
}
