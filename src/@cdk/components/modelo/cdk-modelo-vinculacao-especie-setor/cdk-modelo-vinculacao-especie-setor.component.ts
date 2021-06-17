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
import {ModalidadeModelo, Modelo, Pagination, Setor, Template} from '@cdk/models';

@Component({
    selector: 'cdk-modelo-form',
    templateUrl: './cdk-modelo-vinculacao-especie-setor.component.html',
    styleUrls: ['./cdk-modelo-vinculacao-especie-setor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModeloVinculacaoEspecieSetorComponent implements OnChanges, OnDestroy {

    @Input()
    modelo: Modelo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    coordenador: boolean;

    @Input()
    setorPagination: Pagination;

    @Input()
    modalidadeModeloPagination: Pagination;

    @Input()
    templatePagination: Pagination;

    @Output()
    save = new EventEmitter<Modelo>();

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
            ativo: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            setor: [null, [Validators.required]],
            modalidadeModelo: [null, [Validators.required]],
            template: [null, [Validators.required]],
        });

        this.setorPagination = new Pagination();
        this.modalidadeModeloPagination = new Pagination();
        this.templatePagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['modelo'] && this.modelo && (!this.modelo.id || (this.modelo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.modelo});
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

    checkSetor(): void {
        const value = this.form.get('setor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setor').setValue(setor);
        }
        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    checkModalidadeModelo(): void {
        const value = this.form.get('modalidade-modelo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidade-modelo').setValue(null);
        }
    }

    selectModalidadeModelo(modalidadeModelo: ModalidadeModelo): void {
        if (modalidadeModelo) {
            this.form.get('modalidadeModelo').setValue(modalidadeModelo);
        }
        this.activeCard = 'form';
    }

    showModalidadeModeloGrid(): void {
        this.activeCard = 'modalidade-modelo-gridsearch';
    }

    checkTemplate(): void {
        const value = this.form.get('template').value;
        if (!value || typeof value !== 'object') {
            this.form.get('template').setValue(null);
        }
    }

    selectTemplate(template: Template): void {
        if (template) {
            this.form.get('template').setValue(template);
        }
        this.activeCard = 'form';
    }

    showTemplateGrid(): void {
        this.activeCard = 'template-gridsearch';
    }

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
