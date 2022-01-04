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

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination, TransicaoWorkflow, VinculacaoTransicaoWorkflow, Workflow} from '@cdk/models';

@Component({
    selector: 'cdk-vinculacao-transicao-workflow-form',
    templateUrl: './cdk-vinculacao-transicao-workflow-form.component.html',
    styleUrls: ['./cdk-vinculacao-transicao-workflow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoTransicaoWorkflowFormComponent implements OnChanges, OnDestroy {

    @Input()
    vinculacaoTransicaoWorkflow: VinculacaoTransicaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoTransicaoWorkflow>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    visibleFields: Array<string> = [
        'transicaoWorkflow',
        'workflow'
    ];

    activeCard = 'form';

    @Input()
    transicaoWorkflowPagination: Pagination;

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
            transicaoWorkflow: [null, [Validators.required]],
            workflow: [null, [Validators.required]],
        });

        this.transicaoWorkflowPagination = new Pagination();
        this.transicaoWorkflowPagination.populate = [
            'transicaoWorkflow',
            'transicaoWorkflow.especieAtividade',
            'transicaoWorkflow.especieTarefaFrom',
            'transicaoWorkflow.especieTarefaTo',
            'transicaoWorkflow.workflow',
        ];
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
        if (changes['vinculacaoTransicaoWorkflow'] && this.vinculacaoTransicaoWorkflow && ((!this.vinculacaoTransicaoWorkflow.id && !this.form.dirty)
            || (this.vinculacaoTransicaoWorkflow.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoTransicaoWorkflow});
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

    checkTransicaoWorkflow(): void {
        const value = this.form.get('transicaoWorkflow').value;
        if (!value || typeof value !== 'object') {
            this.form.get('transicaoWorkflow').setValue(null);
        }
    }

    selectTransicaoWorkflow(transicaoWorkflow: TransicaoWorkflow): void {
        if (transicaoWorkflow) {
            this.form.get('transicaoWorkflow').setValue(transicaoWorkflow);
        }
        this.activeCard = 'form';
    }

    showTransicaoWorkflowGrid(): void {
        this.activeCard = 'transicao-workflow-gridsearch';
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
