import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination, Pessoa, Usuario, VinculacaoPessoaUsuario} from '../../../models';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-vinculacao-pessoa-usuario-form',
    templateUrl: './cdk-vinculacao-pessoa-usuario-form.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-usuario-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoPessoaUsuarioFormComponent implements OnInit, OnChanges {

    @Input()
    usuarioExterno: Usuario;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    pessoaPagination: Pagination;

    @Output()
    save = new EventEmitter<VinculacaoPessoaUsuario>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';


    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            pessoa: [null, Validators.required],
            usuarioVinculado: [null]
        });

        this.pessoaPagination = new Pagination();
    }

    ngOnInit(): void {
    }

    checkPessoa(): void {
        const value = this.form.get('pessoa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pessoa').setValue(null);
        }
    }

    selectPessoa(pessoa: Pessoa): void {
        if (pessoa) {
            this.form.get('pessoa').setValue(pessoa);
        }
        this.activeCard = 'form';
    }

    showPessoaGrid(): void {
        this.activeCard = 'pessoa-gridsearch';
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

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        this.form.get('usuarioVinculado').setValue(this.usuarioExterno);

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


}
