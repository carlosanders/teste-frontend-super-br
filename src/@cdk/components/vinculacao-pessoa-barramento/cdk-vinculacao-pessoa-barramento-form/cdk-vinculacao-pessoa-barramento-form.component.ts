import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import { cdkAnimations } from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Municipio, Pagination} from '@cdk/models';
import {Pessoa} from '@cdk/models';
import {VinculacaoPessoaBarramento} from "../../../models/vinculacao-pessoa-barramento";

@Component({
    selector: 'cdk-vinculacao-pessoa-barramento-form',
    templateUrl: './cdk-vinculacao-pessoa-barramento-form.component.html',
    styleUrls: ['./cdk-vinculacao-pessoa-barramento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoPessoaBarramentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    vinculacaoPessoaBarramento: VinculacaoPessoaBarramento;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeVinculacaoPessoaBarramentoPagination: Pagination;

    estruturaBarramentoPagination: Pagination;

    @Input()
    pessoaPagination: Pagination;

    @Output()
    save = new EventEmitter<VinculacaoPessoaBarramento>();

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
            repositorio: [null],
            nomeRepositorio: [null],
            estrutura: [null],
            nomeEstrutura: [null],
        });
        this.modalidadeVinculacaoPessoaBarramentoPagination = new Pagination();
        this.estruturaBarramentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['vinculacaoPessoaBarramento'] && this.vinculacaoPessoaBarramento &&
            ((!this.vinculacaoPessoaBarramento.id && !this.form.dirty) || (this.vinculacaoPessoaBarramento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoPessoaBarramento});
            this.estruturaBarramentoPagination.filter = {idRepositorio: this.vinculacaoPessoaBarramento.repositorio};
            let nomeRepositorio = {}
            if (this.form.get('nomeRepositorio').value) {
                nomeRepositorio = {
                    nome: this.form.get('nomeRepositorio').value,
                    id: this.form.get('repositorio').value
                };
                this.form.get('nomeRepositorio').setValue(nomeRepositorio);
            }

            let nomeEstrutura = {}
            if (this.form.get('nomeEstrutura').value) {
                nomeEstrutura = {
                    nome: this.form.get('nomeEstrutura').value,
                    numeroDeIdentificacaoDaEstrutura: this.form.get('estrutura').value
                };
                this.form.get('nomeEstrutura').setValue(nomeEstrutura);
            }

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
            Object.keys(this.form.controls).forEach(key => {
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

    cancel(): void {
        this.activeCard = 'form';
    }

    selectRepositorio(repositorio): void {
        if (repositorio) {
            this.form.get('repositorio').setValue(repositorio.id);
            this.form.get('nomeRepositorio').setValue(repositorio);
            this.estruturaBarramentoPagination.filter = {idRepositorio: repositorio.id};
        }
        this.activeCard = 'form';
    }

    showRepositorioGrid(): void {
        this.activeCard = 'repositorio-barramento-gridsearch';
    }

    checkNomeRepositorio(): void {
        const value = this.form.get('nomeRepositorio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('nomeRepositorio').setValue(null);
            this.form.get('repositorio').setValue(null);
        } else {
            this.form.get('repositorio').setValue(value['id']);
            this.estruturaBarramentoPagination.filter = {idRepositorio: value['id']};
        }
    }

    selectEstrutura(estrutura): void {
        if (estrutura) {
            this.form.get('estrutura').setValue(estrutura.numeroDeIdentificacaoDaEstrutura);
            this.form.get('nomeEstrutura').setValue(estrutura);
        }
        this.activeCard = 'form';
    }

    showEstruturaGrid(): void {
        if (this.form.get('repositorio').value) {
            const repositorio = this.form.get('repositorio').value;
            this.estruturaBarramentoPagination.filter = {idRepositorio: repositorio};
        }
        this.activeCard = 'estrutura-barramento-gridsearch';
    }

    checkNomeEstrutura(): void {
        const value = this.form.get('nomeEstrutura').value;
        if (!value || typeof value !== 'object') {
            this.form.get('nomeEstrutura').setValue(null);
            this.form.get('estrutura').setValue(null);
        } else {
            this.form.get('estrutura').setValue(value['numeroDeIdentificacaoDaEstrutura']);
        }
    }

}
