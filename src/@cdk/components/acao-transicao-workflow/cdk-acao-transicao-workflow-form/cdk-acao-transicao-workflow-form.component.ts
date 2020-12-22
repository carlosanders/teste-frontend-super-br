import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';
import {Pagination, Modelo} from '@cdk/models';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'cdk-acao-transicao-workflow-form',
    templateUrl: './cdk-acao-transicao-workflow-form.component.html',
    styleUrls: ['./cdk-acao-transicao-workflow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAcaoTransicaoWorkflowFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    acao: AcaoTransicaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<AcaoTransicaoWorkflow>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    modeloPagination: Pagination;

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
            transicaoWorkflow: [null],
            trigger: [null, [Validators.required]],
            contexto: [null],
            modelo: [null, [Validators.required]]
        });

        this.modeloPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnInit(): void {
        this.form.get('trigger').valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((value) => {
                this.form.get('modelo').disable();
                switch (value) {
                        case 'SuppCore\\AdministrativoBackend\\Api\\V1\\Triggers\\AcaoTransicaoWorkflow\\Trigger0001':
                            this.form.get('modelo').enable();
                            break;
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
        if (changes['acao'] && this.acao && ((!this.acao.id && !this.form.dirty) || (this.acao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.acao});
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

    checkModelo(): void {
        const value = this.form.get('modelo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modelo').setValue(null);
        }
    }

    selectModelo(modelo: Modelo): void {
        if (modelo) {
            this.form.get('modelo').setValue(modelo);
        }
        this.activeCard = 'form';
    }

    showModeloGrid(): void {
        this.activeCard = 'modelo-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
