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
import {ModalidadeRelacionamentoPessoal, Pagination, Pessoa, RelacionamentoPessoal} from '@cdk/models';

@Component({
    selector: 'cdk-relacionamento-pessoal-form',
    templateUrl: './cdk-relacionamento-pessoal-form.component.html',
    styleUrls: ['./cdk-relacionamento-pessoal-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRelacionamentoPessoalFormComponent implements OnChanges, OnDestroy {

    @Input()
    relacionamentoPessoal: RelacionamentoPessoal;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeRelacionamentoPessoalPagination: Pagination;

    @Input()
    pessoaPagination: Pagination;

    @Output()
    save = new EventEmitter<RelacionamentoPessoal>();

    @Output()
    abort = new EventEmitter<any>();

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
            pessoa: [null],
            pessoaRelacionada: [null, [Validators.required]],
            modalidadeRelacionamentoPessoal: [null, [Validators.required]]
        });
        this.modalidadeRelacionamentoPessoalPagination = new Pagination();
        this.pessoaPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['relacionamentoPessoal'] && this.relacionamentoPessoal &&
            ((!this.relacionamentoPessoal.id && !this.form.dirty) || (this.relacionamentoPessoal.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.relacionamentoPessoal});
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

    checkPessoaRelacionada(): void {
        const value = this.form.get('pessoaRelacionada').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pessoaRelacionada').setValue(null);
        }
    }

    checkModalidadeRelacionamentoPessoal(): void {
        const value = this.form.get('modalidadeRelacionamentoPessoal').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeRelacionamentoPessoal').setValue(null);
        }
    }

    selectPessoaRelacionada(pessoa: Pessoa): void {
        this.form.get('pessoaRelacionada').setValue(pessoa);
        this.activeCard = 'form';
    }

    showPessoaRelacionadaGrid(): void {
        this.activeCard = 'pessoa-gridsearch';
    }


    cancel(): void {
        this.activeCard = 'form';
    }

    selectModalidadeRelacionamentoPessoal(relacionamentoPessoal: ModalidadeRelacionamentoPessoal): void {
        this.form.get('modalidadeRelacionamentoPessoal').setValue(relacionamentoPessoal);
        this.activeCard = 'form';
    }

    showModalidadeRelacionamentoPessoalGrid(): void {
        this.activeCard = 'relacionamento-pessoal-gridsearch';
    }

}
