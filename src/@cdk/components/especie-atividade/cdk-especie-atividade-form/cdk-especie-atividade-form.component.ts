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
import {EspecieAtividade, GeneroAtividade, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-especie-atividade-form',
    templateUrl: './cdk-especie-atividade-form.component.html',
    styleUrls: ['./cdk-especie-atividade-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieAtividadeFormComponent implements OnChanges, OnDestroy {

    @Input()
    especieAtividade: EspecieAtividade;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoAtividadePagination: Pagination;

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
            generoAtividade: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            evento: [null],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['especieAtividade'] && this.especieAtividade && ((!this.especieAtividade.id && !this.form.dirty) || (this.especieAtividade.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.especieAtividade.id,
                nome: this.especieAtividade.nome,
                generoAtividade: this.especieAtividade.generoAtividade,
                descricao: this.especieAtividade.descricao,
                ativo: this.especieAtividade.ativo
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

    showGeneroAtividadeGrid(): void {
        this.activeCard = 'genero-atividade-gridsearch';
    }

    selectGeneroAtividade(genero: GeneroAtividade): void {
        if (genero) {
            this.form.get('generoAtividade').setValue(genero);
        }
        this.activeCard = 'form';
    }

}
