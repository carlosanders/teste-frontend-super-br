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
import {ModalidadeTemplate, Pagination, Template, TipoDocumento} from '@cdk/models';

@Component({
    selector: 'cdk-template-form',
    templateUrl: './cdk-template-form.component.html',
    styleUrls: ['./cdk-template-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTemplateFormComponent implements OnChanges, OnDestroy {

    @Input()
    template: Template;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeTemplatePagination: Pagination;

    @Input()
    tipoDocumentoPagination: Pagination;

    @Input()
    documento: Pagination;

    @Output()
    save = new EventEmitter<Template>();

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
            ativo: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            modalidadeTemplate: [null, [Validators.required]],
            tipoDocumento: [null, [Validators.required]]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['template'] && this.template && (!this.template.id || (this.template.id !== this.form.get('id').value))) {
            this.form.patchValue(
                {
                    id: this.template.id,
                    nome: this.template.nome,
                    descricao: this.template.descricao,
                    modalidadeTemplate: this.template.modalidadeTemplate,
                    tipoDocumento: this.template.documento?.tipoDocumento,
                    ativo: this.template.ativo,
                }
            );
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

    checkModalidadeTemplate(): void {
        const value = this.form.get('modalidadeTemplate').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeTemplate').setValue(null);
        }
    }

    selectModalidadeTemplate(modalidadeTemplate: ModalidadeTemplate): void {
        if (modalidadeTemplate) {
            this.form.get('modalidadeTemplate').setValue(modalidadeTemplate);
        }
        this.activeCard = 'form';
    }

    showModalidadeTemplateGrid(): void {
        this.activeCard = 'modalidadeTemplate-gridsearch';
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
}
