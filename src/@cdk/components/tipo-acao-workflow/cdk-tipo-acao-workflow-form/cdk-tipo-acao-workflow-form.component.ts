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
import {TipoAcaoWorkflow} from '../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-tipo-acao-workflow-form',
    templateUrl: './cdk-tipo-acao-workflow-form.component.html',
    styleUrls: ['./cdk-tipo-acao-workflow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoAcaoWorkflowFormComponent implements OnChanges, OnDestroy {

    @Input()
    tipoAcaoWorkflow: TipoAcaoWorkflow;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

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
            valor: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required]],
            trigger: [null, [Validators.required]]
        });
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['tipoAcaoWorkflow'] && this.tipoAcaoWorkflow &&
            ((!this.tipoAcaoWorkflow.id && !this.form.dirty)
            || (this.tipoAcaoWorkflow.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.tipoAcaoWorkflow.id,
                valor: this.tipoAcaoWorkflow.valor,
                descricao: this.tipoAcaoWorkflow.descricao,
                trigger: this.tipoAcaoWorkflow.trigger,
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

    cancel(): void {
        this.activeCard = 'form';
    }

    doAbort(): void {
        this.abort.emit();
    }

}
