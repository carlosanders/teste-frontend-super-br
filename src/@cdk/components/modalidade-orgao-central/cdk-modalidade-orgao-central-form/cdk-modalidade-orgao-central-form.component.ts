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
import {ModalidadeOrgaoCentral, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-modalidade-orgao-central-form',
    templateUrl: './cdk-modalidade-orgao-central-form.component.html',
    styleUrls: ['./cdk-modalidade-orgao-central-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModalidadeOrgaoCentralFormComponent implements OnChanges, OnDestroy {

    @Input()
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    generoAtividadePagination: Pagination;

    @Input()
    form: FormGroup;

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
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['modalidadeOrgaoCentral'] && this.modalidadeOrgaoCentral && ((!this.modalidadeOrgaoCentral.id && !this.form.dirty) || (this.modalidadeOrgaoCentral.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.modalidadeOrgaoCentral.id,
                valor: this.modalidadeOrgaoCentral.valor,
                descricao: this.modalidadeOrgaoCentral.descricao,
                ativo: this.modalidadeOrgaoCentral.ativo
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
}
