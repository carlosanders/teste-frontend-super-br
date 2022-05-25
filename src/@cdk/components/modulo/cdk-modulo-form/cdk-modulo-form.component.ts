import {
    ChangeDetectorRef,
    EventEmitter,
    SimpleChange,
    OnChanges,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Input,
    Output,
    Component,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {cdkAnimations} from '@cdk/animations';
import {Modulo} from '../../../models';

@Component({
    selector: 'cdk-modulo-form',
    templateUrl: './cdk-modulo-form.component.html',
    styleUrls: ['./cdk-modulo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                display: {
                    dateInput: 'L LT',
                    datetimeInput: 'L LT'
                }
            }
        }
    ]
})
export class CdkModuloFormComponent implements OnChanges {

    @Input()
    modulo: Modulo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    form: FormGroup;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            sigla: [null, [Validators.required]],
            ativo: [null, [Validators.required]],
        });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['motivo'] && this.modulo && ((!this.modulo.id && !this.form.dirty) || (this.modulo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.modulo});
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
            Object.keys(this.form.controls).forEach(key => {
                this.form.get(key).setErrors(null);
            });

            this.form.setErrors(null);
        }

        this._changeDetectorRef.markForCheck();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }
}
