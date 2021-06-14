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
import {ModalidadeAcaoEtiqueta, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';
import {ModalidadeEtiqueta} from '@cdk/models';

@Component({
    selector: 'cdk-modalidade-acao-etiqueta-form',
    templateUrl: './cdk-modalidade-acao-etiqueta-form.component.html',
    styleUrls: ['./cdk-modalidade-acao-etiqueta-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeAcaoEtiquetaFormComponent implements OnChanges, OnDestroy {

    @Input()
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    modalidadeEtiquetaPagination: Pagination;

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            id: [null],
            valor: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            trigger: [null, [Validators.required]],
            modalidadeEtiqueta: [null, [Validators.required]],

        });
        this.modalidadeEtiquetaPagination = new Pagination();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['modalidadeAcaoEtiqueta'] && this.modalidadeAcaoEtiqueta &&
            ((!this.modalidadeAcaoEtiqueta.id && !this.form.dirty)
            || (this.modalidadeAcaoEtiqueta.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.modalidadeAcaoEtiqueta.id,
                valor: this.modalidadeAcaoEtiqueta.valor,
                modalidadeEtiqueta: this.modalidadeAcaoEtiqueta.modalidadeEtiqueta,
                descricao: this.modalidadeAcaoEtiqueta.descricao,
                trigger: this.modalidadeAcaoEtiqueta.trigger,
            });
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

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    checkModalidadeEtiqueta(): void {
        const value = this.form.get('modalidadeEtiqueta').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeEtiqueta').setValue(null);
        }
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


}
