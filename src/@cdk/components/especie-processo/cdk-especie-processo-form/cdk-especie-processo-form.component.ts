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
import {Classificacao, EspecieProcesso, GeneroProcesso, ModalidadeMeio, Pagination} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-especie-processo-form',
    templateUrl: './cdk-especie-processo-form.component.html',
    styleUrls: ['./cdk-especie-processo-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieProcessoFormComponent implements OnChanges, OnDestroy {

    @Input()
    especieProcesso: EspecieProcesso;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    generoProcessoPagination: Pagination;

    @Input()
    classificacaoPagination: Pagination;

    @Input()
    modalidadeMeioPagination: Pagination;

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
            generoProcesso: [null, [Validators.required]],
            descricao: [null, [Validators.required]],
            classificacao: [null],
            modalidadeMeio: [null],
            titulo: [null],
            ativo: [null],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['especieProcesso'] && this.especieProcesso &&
            ((!this.especieProcesso.id && !this.form.dirty)
            || (this.especieProcesso.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.especieProcesso.id,
                nome: this.especieProcesso.nome,
                generoProcesso: this.especieProcesso.generoProcesso,
                descricao: this.especieProcesso.descricao,
                classificacao: this.especieProcesso.classificacao,
                modalidadeMeio: this.especieProcesso.modalidadeMeio,
                titulo: this.especieProcesso.titulo,
                ativo: this.especieProcesso.ativo
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

    showGeneroProcessoGrid(): void {
        this.activeCard = 'genero-processo-gridsearch';
    }

    selectGeneroProcesso(genero: GeneroProcesso): void {
        if (genero) {
            this.form.get('generoProcesso').setValue(genero);
        }
        this.activeCard = 'form';
    }

    showClassificacaoGrid(): void {
        this.activeCard = 'classificacao-gridsearch';
    }

    selectClassificacao(classificacao: Classificacao): void {
        if (classificacao) {
            this.form.get('classificacao').setValue(classificacao);
        }
        this.activeCard = 'form';
    }

    showModalidadeMeioGrid(): void {
        this.activeCard = 'modalidade-meio-gridsearch';
    }

    selectModalidadeMeio(modalidadeMeio: ModalidadeMeio): void {
        if (modalidadeMeio) {
            this.form.get('modalidadeMeio').setValue(modalidadeMeio);
        }
        this.activeCard = 'form';
    }

}
