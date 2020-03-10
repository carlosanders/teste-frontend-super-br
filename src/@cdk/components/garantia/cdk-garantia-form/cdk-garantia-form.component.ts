import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Garantia} from '@cdk/models';
import {ModalidadeGarantia} from '@cdk/models';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-garantia-form',
    templateUrl: './cdk-garantia-form.component.html',
    styleUrls: ['./cdk-garantia-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkGarantiaFormComponent implements OnChanges, OnDestroy {

    @Input()
    garantia: Garantia;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Garantia>();

    @Input()
    modalidadeGarantiaPagination: Pagination;

    form: FormGroup;

    activeCard = 'form';

    valorRegex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(\d{3})*)|\d+)?(\,\d{1,2})?$/;

     /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            processo: [null, [Validators.required]],
            modalidadeGarantia: [null, [Validators.required]],
            descricao: [null, [Validators.maxLength(255)]],
            valor: [null, [Validators.required, Validators.pattern(this.valorRegex),Validators.maxLength(10)]],
            dataValor: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]]
        });
        this.modalidadeGarantiaPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['garantia'] && this.garantia && ((!this.garantia.id && !this.form.dirty) || (this.garantia.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.garantia});
            if (this.garantia.valor){
                this.form.patchValue({'valor':this.garantia.valor.toString().replace('.',',')});
            }
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
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

    checkModalidadeGarantia(): void {
        const value = this.form.get('modalidadeGarantia').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeGarantia').setValue(null);
        }
    }
    
    selectModalidadeGarantia(modalidadeGarantia: ModalidadeGarantia): void {
        if (modalidadeGarantia) {
            this.form.get('modalidadeGarantia').setValue(modalidadeGarantia);
        }
        this.activeCard = 'form';
    }

    showModalidadeGarantiaGrid(): void {
        this.activeCard = 'modalidade-garantia-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
