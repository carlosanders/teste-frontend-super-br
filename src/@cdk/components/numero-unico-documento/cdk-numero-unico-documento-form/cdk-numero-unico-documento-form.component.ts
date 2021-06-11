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
import {NumeroUnicoDocumento, Pagination, Setor, TipoDocumento} from '@cdk/models';

@Component({
    selector: 'cdk-numero-unico-documento-form',
    templateUrl: './cdk-numero-unico-documento-form.component.html',
    styleUrls: ['./cdk-numero-unico-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkNumeroUnicoDocumentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    numeroUnicoDocumento: NumeroUnicoDocumento;

    @Input()
    setor: Setor;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    tipoDocumentoPagination: Pagination;

    @Output()
    save = new EventEmitter<NumeroUnicoDocumento>();

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
            tipoDocumento: [null, [Validators.required]],
            sequencia: [null, [Validators.required]],
            ano: [null]
        });
       this.tipoDocumentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['numeroUnicoDocumento'] && this.numeroUnicoDocumento && ((!this.numeroUnicoDocumento.id && !this.form.dirty) || (this.numeroUnicoDocumento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.numeroUnicoDocumento});
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

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-list-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
