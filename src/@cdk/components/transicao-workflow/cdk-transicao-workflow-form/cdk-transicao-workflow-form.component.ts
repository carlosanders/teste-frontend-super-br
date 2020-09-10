import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChange
} from '@angular/core';
import {EspecieAtividade, EspecieTarefa, Pagination, TransicaoWorkflow, Workflow} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'cdk-transicao-workflow-form',
    templateUrl: './cdk-transicao-workflow-form.component.html',
    styleUrls: ['./cdk-transicao-workflow-form.component.scss']
})
export class CdkTransicaoWorkflowFormComponent implements OnChanges, OnDestroy {

    @Input()
    transicaoWorkflow: TransicaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    especieTarefaPagination: Pagination;

    @Input()
    workflowPagination: Pagination;

    @Input()
    especieAtividadePagination: Pagination;

    controlInputTarefa: any;

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
            workflow: [null, [Validators.required]],
            especieAtividade: [null, [Validators.required]],
            especieTarefaFrom: [null, [Validators.required]],
            especieTarefaTo: [null, [Validators.required]],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['transicaoWorkflow'] && this.transicaoWorkflow && ((!this.transicaoWorkflow.id && !this.form.dirty) || (this.transicaoWorkflow.id !== this.form.get('id').value))) {
            this.form.patchValue({
                ...this.transicaoWorkflow
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

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

    showWorkflowGrid(): void {
        this.activeCard = 'workflow-gridsearch';
    }

    selectWorkflow(workflow: Workflow): void {
        if (workflow) {
            this.form.get('workflow').setValue(workflow);
        }
        this.activeCard = 'form';
    }

    showEspecieTarefaGrid(input: string): void {
        this.controlInputTarefa = input;
        this.activeCard = 'especie-tarefa-gridsearch';
    }

    selectEspecieTarefa(especieTarefa: EspecieTarefa): void {
        debugger
        if (especieTarefa) {
            if (this.controlInputTarefa === 'from') {
                this.form.get('especieTarefaFrom').setValue(especieTarefa);
            } else {
                this.form.get('especieTarefaTo').setValue(especieTarefa);
            }
        }
        this.activeCard = 'form';
    }


    showEspecieAtividadeGrid(): void {
        this.activeCard = 'especie-atividade-gridsearch';
    }

    selectEspecieAtividade(especieAtividade: EspecieAtividade): void {
        if (especieAtividade) {
            this.form.get('especieAtividade').setValue(especieAtividade);
        }
        this.activeCard = 'form';

    }
}