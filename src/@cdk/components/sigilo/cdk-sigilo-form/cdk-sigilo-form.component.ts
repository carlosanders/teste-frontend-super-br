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
import {ModalidadeCategoriaSigilo, Pagination, Sigilo, TipoSigilo} from '@cdk/models';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';

@Component({
    selector: 'cdk-sigilo-form',
    templateUrl: './cdk-sigilo-form.component.html',
    styleUrls: ['./cdk-sigilo-form.component.scss'],
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
export class CdkSigiloFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    sigilo: Sigilo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<Sigilo>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    modalidadeCategoriaSigiloPagination: Pagination;

    @Input()
    tipoSigiloPagination: Pagination;

    @Input()
    loading = false;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            processo: [null],
            documento: [null],
            desclassificado: [null],
            fundamentoLegal: [null, [Validators.required, Validators.maxLength(255)]],
            razoesClassificacaoSigilo: [null, [Validators.required, Validators.maxLength(255)]],
            dataHoraInicioSigilo: [null, [Validators.required]],
            modalidadeCategoriaSigilo: [null],
            tipoSigilo: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]]
        });

        this.processoPagination = new Pagination();
        this.modalidadeCategoriaSigiloPagination = new Pagination();
        this.tipoSigiloPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['sigilo'] && this.sigilo && ((!this.sigilo.id && !this.form.dirty) || (this.sigilo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.sigilo});
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

    checkModalidadeCategoriaSigilo(): void {
        const value = this.form.get('modalidadeCategoriaSigilo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeCategoriaSigilo').setValue(null);
        }
    }

    selectModalidadeCategoriaSigilo(modalidadeCategoriaSigilo: ModalidadeCategoriaSigilo): void {
        if (modalidadeCategoriaSigilo) {
            this.form.get('modalidadeCategoriaSigilo').setValue(modalidadeCategoriaSigilo);
        }
        this.activeCard = 'form';
    }

    showModalidadeCategoriaSigiloGrid(): void {
        this.activeCard = 'modalidade-categoria-sigilo-gridsearch';
    }

    checkTipoSigilo(): void {
        const value = this.form.get('tipoSigilo').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoSigilo').setValue(null);
        }
    }

    showTipoSigiloGrid(): void {
        this.activeCard = 'tipo-sigilo-gridsearch';
    }

    selectTipoSigilo(tipoSigilo: TipoSigilo): void {
        if (tipoSigilo) {
            this.form.get('tipoSigilo').setValue(tipoSigilo);
        }
        this.activeCard = 'form';
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
