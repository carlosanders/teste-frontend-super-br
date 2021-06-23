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
import {EspecieSetor, GeneroSetor, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-especie-setor-form',
    templateUrl: './cdk-especie-setor-form.component.html',
    styleUrls: ['./cdk-especie-setor-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieSetorFormComponent implements OnChanges, OnDestroy {

    @Input()
    especieSetor: EspecieSetor;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoSetorPagination: Pagination;

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
            generoSetor: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['especieSetor'] && this.especieSetor && ((!this.especieSetor.id && !this.form.dirty) || (this.especieSetor.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.especieSetor.id,
                nome: this.especieSetor.nome,
                generoSetor: this.especieSetor.generoSetor,
                descricao: this.especieSetor.descricao,
                ativo: this.especieSetor.ativo
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

    showGeneroSetorGrid(): void {
        this.activeCard = 'genero-setor-gridsearch';
    }

    selectGeneroSetor(genero: GeneroSetor): void {
        if (genero) {
            this.form.get('generoSetor').setValue(genero);
        }
        this.activeCard = 'form';
    }

}
