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
import {EspecieRelevancia, GeneroRelevancia, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-especie-relevancia-form',
    templateUrl: './cdk-especie-relevancia-form.component.html',
    styleUrls: ['./cdk-especie-relevancia-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieRelevanciaFormComponent implements OnChanges, OnDestroy {

    @Input()
    especieRelevancia: EspecieRelevancia;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoRelevanciaPagination: Pagination;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();



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
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            generoRelevancia: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }

    getErrorMessage() {
        const nomeForm = this.form.get('nome');
        
        if (nomeForm.hasError('required')) {
            return 'Esse campo é obrigatório.';
        }
        if (nomeForm.hasError('formError')){
            return nomeForm.errors.formError;
        }
        return nomeForm.hasError('minlength') ? 'O tamanho mínimo do campo é ' + nomeForm.errors['minlength'].requiredLength : '';
      }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['especieRelevancia'] && this.especieRelevancia && ((!this.especieRelevancia.id && !this.form.dirty)
            || (this.especieRelevancia.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.especieRelevancia.id,
                nome: this.especieRelevancia.nome,
                generoRelevancia: this.especieRelevancia.generoRelevancia,
                descricao: this.especieRelevancia.descricao,
                ativo: this.especieRelevancia.ativo
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

    showGeneroRelevanciaGrid(): void {
        this.activeCard = 'genero-relevancia-gridsearch';
    }


    selectGeneroRelevancia(genero: GeneroRelevancia): void {
        if (genero) {
            this.form.get('generoRelevancia').setValue(genero);
        }
        this.activeCard = 'form';
    }
}
