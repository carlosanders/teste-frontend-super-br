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
import {Interessado, ModalidadeInteressado, Pagination, Pessoa} from '@cdk/models';

@Component({
    selector: 'cdk-interessado-form',
    templateUrl: './cdk-interessado-form.component.html',
    styleUrls: ['./cdk-interessado-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkInteressadoFormComponent implements OnChanges, OnDestroy {

    @Input()
    interessado: Interessado;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    pessoaPagination: Pagination;

    @Input()
    modalidadeInteressadoPagination: Pagination;

    @Output()
    save = new EventEmitter<Interessado>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    @Output()
    gerirPessoa = new EventEmitter();

    @Output()
    editPessoa = new EventEmitter<number>();

    @Input()
    pessoa: Pessoa;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            processo: [null],
            pessoa: [null, [Validators.required]],
            modalidadeInteressado: [null, [Validators.required]]
        });
        this.pessoaPagination = new Pagination();
        this.modalidadeInteressadoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['interessado'] && this.interessado && ((!this.interessado.id && !this.form.dirty) || (this.interessado.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.interessado});
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

        if (changes['pessoa'] && this.pessoa) {
            this.form.get('pessoa').setValue(this.pessoa);
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

    checkPessoa(): void {
        const value = this.form.get('pessoa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pessoa').setValue(null);
        }
    }

    doGerirPessoa(): void {
        this.gerirPessoa.emit();
    }

    doEditPessoa(): void {
        this.editPessoa.emit(this.form.get('pessoa').value.id);
    }

    checkModalidadeInteressado(): void {
        const value = this.form.get('modalidadeInteressado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeInteressado').setValue(null);
        }
    }

    selectModalidadeInteressado(modalidadeInteressado: ModalidadeInteressado): void {
        if (modalidadeInteressado) {
            this.form.get('modalidadeInteressado').setValue(modalidadeInteressado);
        }
        this.activeCard = 'form';
    }

    showModalidadeInteressadoGrid(): void {
        this.activeCard = 'modalidade-interessado-gridsearch';
    }

    selectPessoa(pessoa: Pessoa): void {
        if (pessoa) {
            this.form.get('pessoa').setValue(pessoa);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
