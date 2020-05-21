import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewEncapsulation,
    OnInit
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

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
            password: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.form.get('certificadoDigital').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value) {
                        this.form.get('password').reset();
                        this.form.get('password').disable();
                    } else {
                        this.form.get('password').enable();
                    }
                    this._changeDetectorRef.detectChanges();
                    return of([]);
                }
            )
        ).subscribe();
    }
}
