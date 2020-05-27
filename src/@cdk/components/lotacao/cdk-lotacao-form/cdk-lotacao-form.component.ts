import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pagination} from '@cdk/models/pagination';
import {Lotacao, Setor, Usuario, Colaborador} from "@cdk/models";

@Component({
    selector: 'cdk-lotacao-form',
    templateUrl: './cdk-lotacao-form.component.html',
    styleUrls: ['./cdk-lotacao-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLotacaoFormComponent implements OnChanges, OnDestroy {

    @Input()
    lotacao: Lotacao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    colaboradorPagination: Pagination;

    @Input()
    displayedColumnsGridSetor = ['id', 'nome', 'sigla', 'actions'];

    @Input()
    setorPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<Lotacao>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    usuario: Usuario;

    @Input()
    setor: Setor;

    form: FormGroup;

    activeCard = 'form';

    selectedSetor: Setor;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
       this.form = this._formBuilder.group({
            id: [null],
            colaborador: [null, [Validators.required]],
            setor: [null, [Validators.required]],
            principal: [null],
            coordenador: [null],
            distribuidor: [null],
            arquivista: [null],
            peso: ['100', [Validators.required]],
            centena: [null],
            digito: [null]
        });
       this.colaboradorPagination = new Pagination();
       this.setorPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['lotacao'] && this.lotacao && ((!this.lotacao.id && !this.form.dirty) || (this.lotacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.lotacao});
        }

        if (this.usuario) {
            this.form.get('colaborador').setValue(this.usuario.colaborador);
        }

        if (this.setor) {
            this.form.get('setor').setValue(this.setor);
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

    checkColaborador(): void {
        const value = this.form.get('colaborador').value;
        if (!value || typeof value !== 'object') {
            this.form.get('colaborador').setValue(null);
        }
    }

    selectColaborador(colaborador: Colaborador): void {
        if (colaborador) {
            this.form.get('colaborador').setValue(colaborador);
        }
        this.activeCard = 'form';
    }

    showColaboradorGrid(): void {
        this.activeCard = 'colaborador-gridsearch';
    }

    checkSetor(): void {
        const value = this.form.get('setor').value;
        this.selectedSetor = value;
        if (!value || typeof value !== 'object') {
            this.form.get('setor').setValue(null);
            this.selectedSetor = null;
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

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }
}
