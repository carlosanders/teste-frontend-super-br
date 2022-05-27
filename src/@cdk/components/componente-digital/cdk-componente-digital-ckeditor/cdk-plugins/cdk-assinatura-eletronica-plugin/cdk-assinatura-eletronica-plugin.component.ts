import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, HostListener, OnChanges, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {LoginService} from "../../../../../../app/main/auth/login/login.service";
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkConfigService} from "../../../../../services/config.service";
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import * as AssinaturaStore from 'app/store';

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
    labelLoginType = '';
    popupBloqueado: boolean = false;

    /**
     * @param _store
     * @param cdkConfigService
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param _loginService
     * @param _assinaturaService
     * @param dialogRef
     */
    constructor(
        private _store: Store<AssinaturaStore.State>,
        private cdkConfigService: CdkConfigService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _assinaturaService: AssinaturaService,
        public dialogRef: MatDialogRef<CdkAssinaturaEletronicaPluginComponent>,
    ) {
        this.form = this._formBuilder.group({
            certificadoDigital: [null],
            govBr: [false],
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
            this.labelLoginType = this.cdkConfigService.ldap;
        } else if (this._loginService.getLoginType() === 'govBr') {
            this.labelLoginType = "govBr";
        } else {
            this.labelLoginType = '';
        }

        this._store.pipe(
            select(AssinaturaStore.getAssinaturaRedirectRevalidaGovBr),
            filter(state => !!state)
        ).subscribe((state) => {
            this.redirectRevalidaSenha();
        });

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

    isLoginGovBr() {
        return this._loginService.getLoginType() === 'govBr';
    }

    closeGovBr(){
        this.dialogRef.close({
            certificadoDigital: null,
            plainPassword: localStorage.getItem('tokenRevalidaGovBr'),
            govBr: this.isLoginGovBr()
        });
    }

    /**
     * Após retornar da revalidação de senha o popup aberto faz um postMessage para notificar
     * essa janela com o token
     * @param event
     */
    @HostListener('window:message', ['$event'])
    closePopupMessage(event) {
        if(event.data === 'closeRevalidaGovBrSuccess' && localStorage.getItem('tokenRevalidaGovBr')){
            this.closeGovBr();
        }
    }

    redirectRevalidaSenha() {

        let urlRedirect = this._assinaturaService.geraUrlRedirect();

        var popupWinWidth = 700;
        var popupWinHeight = 700;
        var left = (screen.width - popupWinWidth) / 2;
        var top = (screen.height - popupWinHeight) / 4;

        let popupRevalidaGovBr = window.open(urlRedirect, "popupRevalidaGovBr",
            'toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no,'+
            'width=' + popupWinWidth
            + ', height=' + popupWinHeight + ', top='
            + top + ', left=' + left);

        if(popupRevalidaGovBr === null) {
            this.popupBloqueado = true;
        } else {
            popupRevalidaGovBr.focus();
        }
    }

}
