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
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Representante, ModalidadeRepresentante, Pagination, Pessoa, Interessado} from '@cdk/models';

@Component({
    selector: 'cdk-representante-form',
    templateUrl: './cdk-representante-form.component.html',
    styleUrls: ['./cdk-representante-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRepresentanteFormComponent implements OnChanges, OnDestroy {

    @Input() representante: Representante;
    @Input() saving: boolean = false;
    @Input() errors: any;
    @Input() modalidadeRepresentantePagination: Pagination = new Pagination();
    @Input() form: FormGroup;

    @Output() save: EventEmitter<Representante> = new EventEmitter<Representante>();
    @Output() abort: EventEmitter<void> = new EventEmitter<void>();

    activeCard: string = 'form';

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: new FormControl<number|null>(null),
            interessado: new FormControl<Interessado>(null),
            modalidadeRepresentante: new FormControl<ModalidadeRepresentante>(null, [Validators.required]),
            nome: new FormControl<string>(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            inscricao: new FormControl<string>(null, [Validators.pattern('[A-Z]{2}\\d{7}[A-Z]{1}')])
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['representante'] && this.representante && ((!this.representante.id && !this.form.dirty) || (this.representante.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.representante});
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

    doCheckModalidadeRepresentante(): void {
        const value = this.form.get('modalidadeRepresentante').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeRepresentante').setValue(null);
        }
    }

    doSelectModalidadeRepresentante(modalidadeRepresentante: ModalidadeRepresentante): void {
        if (modalidadeRepresentante) {
            this.form.get('modalidadeRepresentante').setValue(modalidadeRepresentante);
        }
        this.activeCard = 'form';
    }

    doShowModalidadeRepresentanteGrid(): void {
        this.activeCard = 'modalidade-representante-gridsearch';
    }

    doCancel(): void {
        this.activeCard = 'form';
    }

}
