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
import {Pagination, EspecieProcesso, VinculacaoEspecieProcessoWorkflow, Workflow} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-especie-processo-workflow-form',
    templateUrl: './cdk-vinculacao-especie-processo-workflow-form.component.html',
    styleUrls: ['./cdk-vinculacao-especie-processo-workflow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoEspecieProcessoWorkflowFormComponent implements OnChanges, OnDestroy {

    @Input()
    vinculacaoEspecieProcessoWorkflow: VinculacaoEspecieProcessoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoEspecieProcessoWorkflow>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    @Input()
    especieProcessoPagination: Pagination;

    @Input()
    workflowPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            especieProcesso: [null, [Validators.required]],
            workflow: [null, [Validators.required]],
        });

        this.especieProcessoPagination = new Pagination();
        this.especieProcessoPagination.populate = ['populateAll'];
        this.workflowPagination = new Pagination();
        this.workflowPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['vinculacaoEspecieProcessoWorkflow'] && this.vinculacaoEspecieProcessoWorkflow && ((!this.vinculacaoEspecieProcessoWorkflow.id && !this.form.dirty)
            || (this.vinculacaoEspecieProcessoWorkflow.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoEspecieProcessoWorkflow});
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

    checkEspecieProcesso(): void {
        const value = this.form.get('especieProcesso').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieProcesso').setValue(null);
        }
    }

    selectEspecieProcesso(especieProcesso: EspecieProcesso): void {
        if (especieProcesso) {
            this.form.get('especieProcesso').setValue(especieProcesso);
        }
        this.activeCard = 'form';
    }

    showEspecieProcessoGrid(): void {
        this.activeCard = 'especie-processo-gridsearch';
    }

    checkWorkflow(): void {
        const value = this.form.get('workflow').value;
        if (!value || typeof value !== 'object') {
            this.form.get('workflow').setValue(null);
        }
    }

    selectWorkflow(workflow: Workflow): void {
        if (workflow) {
            this.form.get('workflow').setValue(workflow);
        }
        this.activeCard = 'form';
    }

    showWorkflowGrid(): void {
        this.activeCard = 'workflow-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
