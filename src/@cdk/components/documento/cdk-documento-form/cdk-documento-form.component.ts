import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy, OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Documento, ModalidadeCopia, Pagination, Pessoa, Setor, TipoDocumento} from '@cdk/models';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'cdk-documento-form',
    templateUrl: './cdk-documento-form.component.html',
    styleUrls: ['./cdk-documento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoFormComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input()
    documento: Documento;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    tipoDocumentoPagination: Pagination;

    @Input()
    processoPagination: Pagination;

    @Input()
    setorOrigemPagination: Pagination;

    @Input()
    procedenciaPagination: Pagination;

    @Input()
    modalidadeCopiaPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Input()
    actions: string[] = ['save', 'abort'];

    @Output()
    save = new EventEmitter<Documento>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            tipoDocumento: [null, [Validators.required]],
            outroNumero: [null, [Validators.maxLength(255)]],
            copia: [null],
            numeroFolhas: [null],
            autor: [null, [Validators.maxLength(255)]],
            redator: [null, [Validators.maxLength(255)]],
            destinatario: [null, [Validators.maxLength(255)]],
            procedencia: [null],
            modalidadeCopia: [null],
            localizadorOriginal: [null, [Validators.maxLength(255)]],
            dataHoraProducao: [null],
            setorOrigem: [null],
            observacao: [null, [Validators.maxLength(255)]],
            dependenciaSoftware: [null, [Validators.maxLength(255)]],
            dependenciaHardware: [null, [Validators.maxLength(255)]],
        });
        this.processoPagination = new Pagination();
        this.tipoDocumentoPagination = new Pagination();
        this.setorOrigemPagination = new Pagination();
        this.procedenciaPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        this.modalidadeCopiaPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['documento'] && this.documento && ((!this.documento.id && !this.form.dirty) || (this.documento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.documento});
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    ngAfterViewInit(): void {
        this.form.get('copia').valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
            )
            .subscribe((value) => {
            if (!value) {
                this.form.get('localizadorOriginal').setValue(null);
                this.form.get('modalidadeCopia').setValue(null);
            }
        })
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

    selectCopiaParam(valor: String): void {
        this.form.get('copia').setValue(valor);
    }

    selectTipoDocumento(tipoDocumento: TipoDocumento): void {
        if (tipoDocumento) {
            this.form.get('tipoDocumento').setValue(tipoDocumento);
        }
        this.activeCard = 'form';
    }

    showTipoDocumentoGrid(): void {
        this.activeCard = 'tipo-documento-list-gridsearch';
    }

    checkTipoDocumento(): void {
        const value = this.form.get('tipoDocumento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tipoDocumento').setValue(null);
        }
    }

    checkProcedencia(): void {
        const value = this.form.get('procedencia').value;
        if (!value || typeof value !== 'object') {
            this.form.get('procedencia').setValue(null);
        }
    }

    checkModalidadeCopia(): void {
        const value = this.form.get('modalidadeCopia').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeCopia').setValue(null);
        }
    }

    selectProcedencia(procedencia: Pessoa): void {
        this.form.get('procedencia').setValue(procedencia);
        this.activeCard = 'form';
    }

    selectModalidadeCopia(modalidadeCopia: ModalidadeCopia): void {
        this.form.get('modalidadeCopia').setValue(modalidadeCopia);
        this.activeCard = 'form';
    }

    showProcedenciaGrid(): void {
        this.activeCard = 'procedencia-gridsearch';
    }

    showModalidadeCopiaGrid(): void {
        this.activeCard = 'modalidade-copia-gridsearch';
    }

    checkSetorOrigem(): void {
        const value = this.form.get('setorOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setorOrigem').setValue(null);
        }
    }

    selectSetorOrigem(setorOrigem: Setor): void {
        this.form.get('setorOrigem').setValue(setorOrigem);
        this.activeCard = 'form';
    }

    showSetorOrigemGrid(): void {
        this.activeCard = 'setor-origem-gridsearch';
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
