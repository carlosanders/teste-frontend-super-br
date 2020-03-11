import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lembrete, Processo} from '../../../models';

@Component({
    selector: 'cdk-lembrete-form',
    templateUrl: './cdk-lembrete-form.component.html',
    styleUrls: ['./cdk-lembrete-form.component.scss']
})
export class CdkLembreteFormComponent implements OnInit, OnChanges {

    activeCard = 'form';
    form: FormGroup;

    /**
     * Outputs
     */
    @Output()
    save = new EventEmitter<Lembrete>();

    @Input()
    lembrete: Lembrete;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    processo: number;


    constructor(
        private _formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.loadForm();
    }

    ngOnInit(): void {
        this.setProcesso();
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            processo: [null, [Validators.required]],
            conteudo: [null, [Validators.required, Validators.maxLength(255)]],
        });
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    setProcesso(): void {
        const processo = new Processo();
        processo.id = this.processo;
        this.form.get('processo').setValue(processo);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['lembretes'] && this.lembrete && ((!this.lembrete.id && !this.form.dirty) || (this.lembrete.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.lembrete});
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


}
