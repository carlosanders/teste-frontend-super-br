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
import {Criteria, Etiqueta, ModalidadeEtiqueta, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-etiqueta-form',
    templateUrl: './cdk-etiqueta-form.component.html',
    styleUrls: ['./cdk-etiqueta-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEtiquetaFormComponent implements OnChanges, OnDestroy {

    @Input()
    etiqueta: Etiqueta;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Etiqueta>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    modalidadeEtiquetaPagination: Pagination;

    colors: string[] = [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFEB3B',
        '#FFC107',
        '#FF9800',
        '#FF5722',
        '#795548',
        '#9E9E9E',
        '#607D8B'
    ];

    tipoAcoesSugestao: Criteria[] = Etiqueta.TIPO_EXECUCAO_LIST;

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
            privada: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            corHexadecimal: [null, [Validators.required]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeEtiqueta: [null, [Validators.required]],
            tipoExecucaoAcaoSugestao: [null],
        });

        this.modalidadeEtiquetaPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['etiqueta'] && this.etiqueta && (!this.etiqueta.id || (this.etiqueta.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.etiqueta});
            // this.form.get('corHexadecimal').setValue('#F44336');
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

    checkModalidadeEtiqueta(): void {
        const value = this.form.get('modalidadeEtiqueta').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeEtiqueta').setValue(null);
        }
    }

    selectColor(cor: any): boolean {
        this.form.get('corHexadecimal').setValue(cor);
        this._changeDetectorRef.markForCheck();
        return false;
    }

    selectModalidadeEtiqueta(modalidadeetiqueta: ModalidadeEtiqueta): void {
        if (modalidadeetiqueta) {
            this.form.get('modalidadeEtiqueta').setValue(modalidadeetiqueta);
        }
        this.activeCard = 'form';
    }

    showModalidadeEtiquetaGrid(): void {
        this.activeCard = 'modalidade-etiqueta-gridsearch';
    }

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
