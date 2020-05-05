import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination, Pessoa, Usuario, VinculacaoPessoaUsuario} from '../../../models';

@Component({
    selector: 'cdk-vinculacao-pessoa-usuario-form',
    templateUrl: './cdk-vinculacao-pessoa-usuario-form.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-usuario-form.component.scss']
})
export class CdkVinculacaoPessoaUsuarioFormComponent implements OnInit {

    @Input()
    usuarioExterno: number;

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
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            pessoa: [null, Validators.required],
            usuarioVinculado: [null]
        });
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
            this.form.get('usuarioVinculado').setValue(this.getUsuarioExterno());
            this.save.emit(this.form.value);
        }
    }

    getUsuarioExterno(): Usuario {
        const usuario = new  Usuario();
        usuario.id = this.usuarioExterno;
        return usuario;
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
