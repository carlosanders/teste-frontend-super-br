import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {environment} from "../../../../../../environments/environment";

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

    /**
     * @param _changeDetectorRef
     * @param _formBuilder
     * @param dialogRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
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
