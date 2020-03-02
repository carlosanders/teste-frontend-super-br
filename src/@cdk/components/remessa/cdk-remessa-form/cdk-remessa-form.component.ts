import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Tramitacao} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {Processo} from '@cdk/models';
import {Setor} from '@cdk/models';
import {Pessoa} from '@cdk/models';

@Component({
    selector: 'cdk-remessa-form',
    templateUrl: './cdk-remessa-form.component.html',
    styleUrls: ['./cdk-remessa-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkRemessaFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    tramitacao: Tramitacao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Tramitacao>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    setorDestinoPagination: Pagination;

    setorOrigemListIsLoading: boolean;

    @Input()
    pessoaDestinoPagination: Pagination;

    @Output()
    gerirPessoaDestino = new EventEmitter();

    @Output()
    editPessoaDestino = new EventEmitter<number>();

    @Input()
    pessoaDestino: Pessoa;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            externa: [null],
            processo: [null],
            urgente: [null],
            setorOrigem: [null, [Validators.required]],
            pessoaDestino: [null, [Validators.required]],
            observacao: [null]
        });

        this.processoPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
        this.pessoaDestinoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['tramitacao'] && this.tramitacao && ((!this.tramitacao.id && !this.form.dirty) || (this.tramitacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.tramitacao});
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

        if (changes['pessoaDestino'] && this.pessoaDestino) {
            this.form.get('pessoaDestino').setValue(this.pessoaDestino);
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

    checkProcesso(): void {
        const value = this.form.get('processo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processo').setValue(null);
        }
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processo').setValue(processo);
        }
        this.activeCard = 'form';
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
    }

    selectSetorOrigem(setor: Setor): void {
        if (setor) {
            this.form.get('setorOrigem').setValue(setor);
        }
        this.activeCard = 'form';
    }

    checkPessoaDestino(): void {
        const value = this.form.get('pessoaDestino').value;
        if (!value || typeof value !== 'object') {
            this.form.get('pessoaDestino').setValue(null);
        }
    }

    selectPessoaDestino(pessoaDestino: Pessoa): void {
        if (pessoaDestino) {
            this.form.get('pessoaDestino').setValue(pessoaDestino);
        }
        this.activeCard = 'form';
    }

    doGerirPessoaDestino(): void {
        this.gerirPessoaDestino.emit();
    }

    doEditPessoaDestino(): void {
        this.editPessoaDestino.emit(this.form.get('pessoaDestino').value.id);
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
