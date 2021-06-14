import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@cdk/angular/material';

@Component({
    selector: 'cdk-seguranca-form',
    templateUrl: './cdk-seguranca-form.component.html',
    styleUrls: ['./cdk-seguranca-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSegurancaFormComponent implements OnChanges, OnDestroy {

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    matcher = new MyErrorStateMatcher();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            senhaAtual: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
            plainPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
            confirmPass: ['']
        }, {validator: this.checkPasswords });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        this.form.patchValue({
            senhaAtual: null,
            plainPassword: null,
            confirmPass: null
        });

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
            this.save.emit({
                    senhaAtual: this.form.value.senhaAtual,
                    plainPassword: this.form.value.plainPassword
                }
            );
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
        const pass = group.controls.plainPassword.value;
        const confirmPass = group.controls.confirmPass.value;

        return pass === confirmPass ? null : { notSame: true };
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}
