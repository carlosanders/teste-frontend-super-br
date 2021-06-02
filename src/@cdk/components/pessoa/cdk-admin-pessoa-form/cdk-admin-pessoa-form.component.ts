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
import {Pagination, Pessoa} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';

@Component({
    selector: 'cdk-admin-pessoa-form',
    templateUrl: './cdk-admin-pessoa-form.component.html',
    styleUrls: ['./cdk-admin-pessoa-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                display: {
                    dateInput: 'L LT',
                    datetimeInput: 'L LT'
                }
            }
        }
    ]
})
export class CdkAdminPessoaFormComponent implements OnChanges, OnDestroy {

    @Input()
    pessoa: Pessoa;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Pessoa>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    @Input()
    hidden: any;

    @Input()
    logEntryPagination: Pagination;

    @Input()
    modalidadeQualificacaoPessoaPagination: Pagination;

    @Input()
    modalidadeGeneroPessoaPagination: Pagination;

    @Input()
    paisPagination: Pagination;

    @Input()
    municipioPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            pessoaConveniada: [null, [Validators.required]],
            pessoaValidada: [null, [Validators.required]],

            modalidadeQualificacaoPessoa: [null, [Validators.required]],
            modalidadeGeneroPessoa: [null],
            dataNascimento: [null],
            dataObito: [null],
            profissao: [null, [Validators.maxLength(255)]],
            contato: [null, [Validators.maxLength(255)]],
            numeroDocumentoPrincipal: [null, [Validators.maxLength(255),
                Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')]],
            nomeGenitor: [null, [Validators.maxLength(255)]],
            nomeGenitora: [null, [Validators.maxLength(255)]],
            naturalidade: [null],
            nacionalidade: [null]
        });

        this.modalidadeQualificacaoPessoaPagination = new Pagination();
        this.modalidadeGeneroPessoaPagination = new Pagination();
        this.paisPagination = new Pagination();
        this.municipioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['pessoa'] && this.pessoa && ((!this.pessoa.id && !this.form.dirty) || (this.pessoa.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.pessoa});
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

    cancel(): void {
        this.activeCard = 'form';
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }
}
