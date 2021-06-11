import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';
import {Pagination, Setor} from '@cdk/models';
import {distinctUntilChanged, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'cdk-tipo-validacao-unidade',
    templateUrl: './cdk-tipo-validacao-unidade.component.html',
    styleUrls: ['./cdk-tipo-validacao-unidade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoValidacaoUnidadeComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    validacao: ValidacaoTransicaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<ValidacaoTransicaoWorkflow>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    unidadeRecebidoPagination: Pagination;

    @Input()
    setorRecebidoPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    form: FormGroup;

    activeCard = 'form';

    selected = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            transicaoWorkflow: [null],
            contexto: [null],
            unidade: [null, [Validators.required]],
            nome: ['nome', [Validators.required]],
            descricao: ['descricao', [Validators.required]]
        });

        this.unidadeRecebidoPagination = new Pagination();
        this.unidadeRecebidoPagination.filter = {parent: 'isNull'};
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnInit(): void {
        if (this.form.get('unidade').value) {
            this.selected = true;
        }

        this.form.get('unidade').valueChanges.pipe(
            distinctUntilChanged(),
            switchMap((value) => {
                    if (value && typeof value === 'object') {
                        this.selected = true;

                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.selected = false;
                    }
                    return of([]);
                }
            )
        ).subscribe();
    }

    /**
     * On change
     */

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['validacao'] && this.validacao && ((!this.validacao.id && !this.form.dirty) || (this.validacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.validacao});
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

    doAbort(): void {
        this.abort.emit();
    }


    checkUnidadeRecebido(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    showUnidadeRecebidoGrid(): void {
        this.activeCard = 'unidade-recebido-gridsearch';
    }

    selectUnidadeRecebido(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }


    checkUnidadeOrigem(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    showUnidadeOrigemGrid(): void {
        this.activeCard = 'unidade-origem-gridsearch';
    }

    selectUnidadeOrigem(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
