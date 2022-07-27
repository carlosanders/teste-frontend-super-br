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
import {EspecieDocumento, Pagination, TipoDocumento} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-tipo-documento-form',
    templateUrl: './cdk-tipo-documento-form.component.html',
    styleUrls: ['./cdk-tipo-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoDocumentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    tipoDocumento: TipoDocumento;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    especieDocumentoPagination: Pagination;

    @Input()
    form: FormGroup;

    activeCard = 'form';

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [ Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            sigla: [null, [Validators.required, Validators.minLength(3)]],
            especieDocumento: [null, [Validators.required]],
            descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if(changes['tipoDocumento'] && this.tipoDocumento && (!this.tipoDocumento.id || (this.tipoDocumento.id !== this.form.get('id').value)))  {
            this.form.patchValue({
                id: this.tipoDocumento.id,
                nome: this.tipoDocumento.nome,
                sigla: this.tipoDocumento.sigla,
                especieDocumento: this.tipoDocumento.especieDocumento,
                descricao: this.tipoDocumento.descricao,
                ativo: this.tipoDocumento.ativo,
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
        this._changeDetectorRef.markForCheck();

        // if (!this.errors) {
        //     Object.keys(this.form.controls).forEach((key) => {
        //         this.form.get(key).setErrors(null);
        //     });

        //     this.form.setErrors(null);
        // }

        // this._changeDetectorRef.markForCheck();
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

    showEspecieDocumentoGrid(): void {
        this.activeCard = 'especie-tipo-documento-gridsearch';
    }

    selectEspecieDocumento(especie: EspecieDocumento): void {
        if (especie) {
            this.form.get('especieDocumento').setValue(especie);
        }
        this.activeCard = 'form';
    }
}
