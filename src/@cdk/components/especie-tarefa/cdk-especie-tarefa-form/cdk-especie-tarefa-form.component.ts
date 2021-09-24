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
import {EspecieTarefa, GeneroTarefa, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-especie-tarefa-form',
    templateUrl: './cdk-especie-tarefa-form.component.html',
    styleUrls: ['./cdk-especie-tarefa-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieTarefaFormComponent implements OnChanges, OnDestroy {

    @Input()
    especieTarefa: EspecieTarefa;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoTarefaPagination: Pagination;

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
            generoTarefa: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            evento: [null],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['especieTarefa'] && this.especieTarefa && ((!this.especieTarefa.id && !this.form.dirty) || (this.especieTarefa.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.especieTarefa.id,
                nome: this.especieTarefa.nome,
                generoTarefa: this.especieTarefa.generoTarefa,
                descricao: this.especieTarefa.descricao,
                ativo: this.especieTarefa.ativo,
                evento: this.especieTarefa.evento
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

    showGeneroTarefaGrid(): void {
        this.activeCard = 'genero-tarefa-gridsearch';
    }

    selectGeneroTarefa(genero: GeneroTarefa): void {
        if (genero) {
            this.form.get('generoTarefa').setValue(genero);
        }
        this.activeCard = 'form';
    }

}
