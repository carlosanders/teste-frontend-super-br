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
import {EspecieProcesso, EspecieTarefa, Pagination, Workflow} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'cdk-workflow-form',
    templateUrl: './cdk-workflow-form.component.html',
    styleUrls: ['./cdk-workflow-form.component.scss']
})
export class CdkWorkflowFormComponent implements OnChanges, OnDestroy {

    @Input()
    workflow: Workflow;

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
    especieProcessoPagination: Pagination;

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
            especieTarefaInicial: [null, [Validators.required]],
            especieProcesso: [null, [Validators.required]],
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['workflow'] && this.workflow && ((!this.workflow.id && !this.form.dirty) || (this.workflow.id !== this.form.get('id').value))) {
            this.form.patchValue({
                ...this.workflow
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

    showEspecieTarefaGrid(): void {
        this.activeCard = 'especie-tarefa-gridsearch';
    }

    selectEspecieTarefa(especieTarefaInicial: EspecieTarefa): void {
        if (especieTarefaInicial) {
            this.form.get('especieTarefaInicial').setValue(especieTarefaInicial);
        }
        this.activeCard = 'form';
    }

    showEspecieProcessoGrid(): void {
        this.activeCard = 'especie-processo-gridsearch';
    }

    selectEspecieProcesso(especieProcesso: EspecieProcesso): void {
        if (especieProcesso) {
            this.form.get('especieProcesso').setValue(especieProcesso);
        }
        this.activeCard = 'form';
        
    }
}