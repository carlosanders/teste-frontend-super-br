import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '../../../animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'cdk-chave-acesso-plugin',
    templateUrl: './cdk-chave-acesso-plugin.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations
})

export class CdkChaveAcessoPluginComponent implements OnInit {

    @Output()
    cancel = new EventEmitter();

    form: FormGroup;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CdkChaveAcessoPluginComponent>
    ) {
        this.form = this._formBuilder.group({
            chaveAcesso: [null, [Validators.required]]
        });
    }

    ngOnInit(): void {

    }

    doCancel(): void {
        this.cancel.emit();
    }

    checkChaveAcesso(): void {
        const value = this.form.get('chaveAcesso').value;
        if (!value) {
            this.form.get('chaveAcesso').setValue(null);
        }
    }
}
