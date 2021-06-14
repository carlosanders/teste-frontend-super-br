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
import {Cargo, Colaborador, ModalidadeColaborador, Pagination, Usuario} from '@cdk/models';

@Component({
    selector: 'cdk-colaborador-form',
    templateUrl: './cdk-colaborador-form.component.html',
    styleUrls: ['./cdk-colaborador-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkColaboradorFormComponent implements OnChanges, OnDestroy {

    @Input()
    colaborador: Colaborador;

    @Input()
    usuario: Usuario;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeColaboradorPagination: Pagination;

    @Input()
    cargoPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<Colaborador>();

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
            modalidadeColaborador: [null, [Validators.required]],
            usuario: [null],
            cargo: [null, [Validators.required]],
            ativo: [null]
        });
        this.modalidadeColaboradorPagination = new Pagination();
        this.cargoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['colaborador'] && this.colaborador && ((!this.colaborador.id && !this.form.dirty) || (this.colaborador.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.colaborador});
        }

        this.form.get('usuario').setValue(this.usuario);

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

    checkModalidadeColaborador(): void {
        const value = this.form.get('modalidadeColaborador').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeColaborador').setValue(null);
        }
    }

    checkCargo(): void {
        const value = this.form.get('cargo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('cargo').setValue(null);
        }
    }

    selectModalidadeColaborador(modalidadeColaborador: ModalidadeColaborador): void {
        if (modalidadeColaborador) {
            this.form.get('modalidadeColaborador').setValue(modalidadeColaborador);
        }
        this.activeCard = 'form';
    }

    showModalidadeColaboradorGrid(): void {
        this.activeCard = 'modalidade-colaborador-gridsearch';
    }

    selectCargo(cargo: Cargo): void {
        if (cargo) {
            this.form.get('cargo').setValue(cargo);
        }
        this.activeCard = 'form';
    }

    showCargoGrid(): void {
        this.activeCard = 'cargo-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    showLogEntryGrid(target: string): void {

        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);

        this.activeCard = 'logentry-gridsearch';
    }
}
