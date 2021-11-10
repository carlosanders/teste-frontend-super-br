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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Cargo} from '@cdk/models';

@Component({
    selector: 'cdk-cargo-form',
    templateUrl: './cdk-cargo-form.component.html',
    styleUrls: ['./cdk-cargo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCargoFormComponent implements OnChanges, OnDestroy {

    @Input()
    cargo: Cargo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Cargo>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            ativo: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['cargo'] && this.cargo && ((!this.cargo.id && !this.form.dirty) || (this.cargo.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.cargo.id,
                nome: this.cargo.nome,
                descricao: this.cargo.descricao,
                ativo: this.cargo.ativo
            });
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

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
