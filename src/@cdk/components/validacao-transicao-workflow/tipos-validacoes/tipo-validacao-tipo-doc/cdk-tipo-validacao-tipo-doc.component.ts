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
import {Pagination, TipoDocumento} from '@cdk/models';
import {distinctUntilChanged, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'cdk-tipo-validacao-tipo-doc',
    templateUrl: './cdk-tipo-validacao-tipo-doc.component.html',
    styleUrls: ['./cdk-tipo-validacao-tipo-doc.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoValidacaoTipoDocComponent implements OnInit, OnChanges, OnDestroy {

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
    tipoDocumentoPagination: Pagination;

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
            tipoDocumento: [null, [Validators.required]],
            nome: ['nome', [Validators.required]],
            descricao: ['descricao', [Validators.required]],
        });

        this.tipoDocumentoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnInit(): void {
        if (this.form.get('tipoDocumento').value) {
            this.selected = true;
        }

        this.form.get('tipoDocumento').valueChanges.pipe(
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

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
