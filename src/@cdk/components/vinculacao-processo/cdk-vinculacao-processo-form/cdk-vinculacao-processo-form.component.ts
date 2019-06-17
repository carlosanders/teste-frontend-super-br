import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VinculacaoProcesso} from '@cdk/models/vinculacao-processo.model';
import {Pagination} from '../../../models/pagination';
import {Processo} from '@cdk/models/processo.model';
import {ModalidadeVinculacaoProcesso} from '../../../models/modalidade-vinculacao-processo.model';

@Component({
    selector: 'cdkvinculacao-processo-form',
    templateUrl: './cdk-vinculacao-processo-form.component.html',
    styleUrls: ['./cdk-vinculacao-processo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoProcessoFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    vinculacaoProcesso: VinculacaoProcesso;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoProcesso>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    processoVinculadoPagination: Pagination;

    @Input()
    modalidadeVinculacaoProcessoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            'id': [null],
            'processo': [null],
            'processoVinculado': [null],
            'modalidadeVinculacaoProcesso': [null],
            'observacao': [null]
        });

        this.processoPagination = new Pagination();
        this.processoVinculadoPagination = new Pagination();
        this.modalidadeVinculacaoProcessoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['vinculacaoProcesso'] && this.vinculacaoProcesso && ((!this.vinculacaoProcesso.id && !this.form.dirty)
            || (this.vinculacaoProcesso.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoProcesso});
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({'formError': data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({'rulesError': this.errors.error.message});
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

    checkProcesso(): void {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processo').setValue(processo);
        }
        this.activeCard = 'form';
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    checkProcessoVinculado(): void {
        const value = this.form.get('processoVinculado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processoVinculado').setValue(null);
        }
    }

    selectProcessoVinculado(processoVinculado: Processo): void {
        if (processoVinculado) {
            this.form.get('processoVinculado').setValue(processoVinculado);
        }
        this.activeCard = 'form';
    }

    showProcessoVinculadoGrid(): void {
        this.activeCard = 'processo-vinculado-gridsearch';
    }

    checkModalidadeVinculacaoProcesso(): void {
        const value = this.form.get('modalidadeVinculacaoProcesso').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeVinculacaoProcesso').setValue(null);
        }
    }

    selectModalidadeVinculacaoProcesso(modalidadeVinculacaoProcesso: ModalidadeVinculacaoProcesso): void {
        if (modalidadeVinculacaoProcesso) {
            this.form.get('modalidadeVinculacaoProcesso').setValue(modalidadeVinculacaoProcesso);
        }
        this.activeCard = 'form';
    }

    showModalidadeVinculacaoProcessoGrid(): void {
        this.activeCard = 'modalidade-vinculacao-processo-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
