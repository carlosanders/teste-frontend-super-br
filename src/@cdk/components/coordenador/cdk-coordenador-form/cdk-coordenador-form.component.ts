import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination, Coordenador, ModalidadeOrgaoCentral, Setor} from '@cdk/models';

@Component({
    selector: 'cdk-coordenador-form',
    templateUrl: './cdk-coordenador-form.component.html',
    styleUrls: ['./cdk-coordenador-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCoordenadorFormComponent implements OnChanges, OnInit, OnDestroy {

    @Input()
    coordenador: Coordenador;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Coordenador>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    orgaoCentralPagination: Pagination;

    @Input()
    unidadePagination: Pagination;

    @Input()
    setorPagination: Pagination;

    @Input()
    tipos: any[] = [
        {
            id: '',
            label: 'Selecione o tipo'
        },
        {
            id: 'M',
            label: 'Órgão central'
        },
        {
            id: 'U',
            label: 'Unidade'
        },
        {
            id: 'S',
            label: 'Setor'
        },
    ];

    /**
     *
     * @param _changeDetectorRef
     * @param _formBuilder
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            tipo: [null],
            orgaoCentral: [null],
            unidade: [null],
            setor: [null],
        });

        this.orgaoCentralPagination = new Pagination();
        this.unidadePagination = new Pagination();
        this.setorPagination = new Pagination();
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
        if (changes['coordenador'] && this.coordenador && ((!this.coordenador.id && !this.form.dirty)
            || (this.coordenador.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.coordenador});
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

    doAbort(): void {
        this.abort.emit();
    }

    selectTipo(tipo: string): void {
        switch (tipo) {
            case 'M':
                this.form.get('unidade').setValue(null);
                this.form.get('setor').setValue(null);
                break;
            case 'U':
                this.form.get('orgaoCentral').setValue(null);
                this.form.get('setor').setValue(null);
                break;
            case 'S':
                this.form.get('orgaoCentral').setValue(null);
                this.form.get('unidade').setValue(null);
                break;
            default:
                this.form.get('orgaoCentral').setValue(null);
                this.form.get('unidade').setValue(null);
                this.form.get('setor').setValue(null);
                break;
        }
    }

    checkOrgaoCentral(): void {
        const value = this.form.get('orgaoCentral').value;
        if (!value || typeof value !== 'object') {
            this.form.get('orgaoCentral').setValue(null);
        }
    }

    selectOrgaoCentral(orgaoCentral: ModalidadeOrgaoCentral): void {
        if (orgaoCentral) {
            this.form.get('orgaoCentral').setValue(orgaoCentral);
        }
        this.activeCard = 'form';
    }

    showOrgaoCentralGrid(): void {
        this.activeCard = 'modalidade-orgao-central-gridsearch';
    }

    checkUnidade(): void {
        const value = this.form.get('unidade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('unidade').setValue(null);
        }
    }

    selectUnidade(unidade: Setor): void {
        if (unidade) {
            this.form.get('unidade').setValue(unidade);
        }
        this.activeCard = 'form';
    }

    showUnidadeGrid(): void {
        this.activeCard = 'unidade-gridsearch';
    }

    checkSetor(): void {
        const value = this.form.get('setor').value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
        }
    }

    selectSetor(setor: Setor): void {
        if (setor) {
            this.form.get('setor').setValue(setor);
        }
        this.activeCard = 'form';
    }

    showSetorGrid(): void {
        this.activeCard = 'setor-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
