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
import {Setor} from '@cdk/models/setor.model';
import {Pagination} from '@cdk/models/pagination';
import {EspecieSetor} from '@cdk/models/especie-setor.model';
import {Municipio} from '@cdk/models/municipio.model';

@Component({
    selector: 'cdk-setor-form',
    templateUrl: './cdk-setor-form.component.html',
    styleUrls: ['./cdk-setor-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkSetorFormComponent implements OnChanges, OnDestroy {

    @Input()
    setor: Setor;

    @Input()
    unidade: Setor;

    @Input()
    saving: boolean;

    @Input()
    isAdmin = false;

    @Input()
    errors: any;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<Setor>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    especieSetorPagination: Pagination;

    municipioPagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    requiredParent: boolean;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            ativo: [true],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            sigla: [null, [Validators.required, Validators.maxLength(255)]],
            prefixoNUP: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]{1,5}')]],
            endereco: [null],
            especieSetor: [null, [Validators.required]],
            municipio: [null, [Validators.required]],
            parent: [null],
            unidade: [this.unidade],
            distribuicaoCentena: [false],
            prazoEqualizacao: [7],
            divergenciaMaxima: [25],
            apenasDistribuidor: [null],
            sequenciaInicialNUP: [null],
            apenasDistribuicaoAutomatica: [null],
            comPrevencaoRelativa: [null],
        });

        this.especieSetorPagination = new Pagination();
        this.municipioPagination = new Pagination();
        this.setorPagination = new Pagination();
        this.requiredParent = true;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {

        if (changes['setor'] && this.setor && (!this.setor.id || (this.setor.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.setor});
        }

        this.form.get('unidade').setValue(this.unidade);

        if (this.requiredParent) {
            this.form.controls['parent'].setValidators(Validators.required);
        } else {
            this.form.controls['parent'].clearValidators();
            this.form.controls['parent'].setErrors(null);
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

    checkEspecieSetor(): void {
        const value = this.form.get('especieSetor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieSetor').setValue(null);
        }
    }

    selectEspecieSetor(especieSetor: EspecieSetor): void {
        if (especieSetor) {
            this.form.get('especieSetor').setValue(especieSetor);
        }
        this.activeCard = 'form';
    }

    showEspecieSetorGrid(): void {
        this.activeCard = 'especie-setor-gridsearch';
    }

    checkMunicipio(): void {
        const value = this.form.get('municipio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('municipio').setValue(null);
        }
    }

    selectMunicipio(municipio: Municipio): void {
        if (municipio) {
            this.form.get('municipio').setValue(municipio);
        }
        this.activeCard = 'form';
    }

    showMunicipioGrid(): void {
        this.activeCard = 'municipio-gridsearch';
    }

    checkSetor(): void {
        const value = this.form.get('parent').value;
        if (!value || typeof value !== 'object') {
            this.form.get('parent').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('parent').setValue(setor);
        }
        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
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

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }
}
