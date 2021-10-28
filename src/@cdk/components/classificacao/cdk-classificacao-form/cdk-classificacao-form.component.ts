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
import {Classificacao, ModalidadeDestinacao, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-classificacao-form',
    templateUrl: './cdk-classificacao-form.component.html',
    styleUrls: ['./cdk-classificacao-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkClassificacaoFormComponent implements OnChanges, OnDestroy {

    @Input()
    classificacao: Classificacao;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    modalidadeDestinacaoPagination: Pagination;

    @Input()
    classificacaoPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Output()
    save = new EventEmitter<Classificacao>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
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
            codigo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeDestinacao: [null, [Validators.required]],
            parent: [null],
            ativo: [null],
            permissaoUso: [null],
            prazoGuardaFaseCorrenteDia: [null],
            prazoGuardaFaseCorrenteMes: [null],
            prazoGuardaFaseCorrenteAno: [null],
            prazoGuardaFaseCorrenteEvento: [null],
            prazoGuardaFaseIntermediariaDia: [null],
            prazoGuardaFaseIntermediariaMes: [null],
            prazoGuardaFaseIntermediariaAno: [null],
            prazoGuardaFaseIntermediariaEvento: [null],
            observacao: [null, [Validators.maxLength(255)]]
        });
        this.modalidadeDestinacaoPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['classificacao'] && this.classificacao && ((!this.classificacao.id && !this.form.dirty) || (this.classificacao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.classificacao});
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

    checkModalidadeDestinacao(): void {
        const value = this.form.get('modalidadeDestinacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeDestinacao').setValue(null);
        }
    }

    checkClassificacao(): void {
        const value = this.form.get('parent').value;
        if (!value || typeof value !== 'object') {
            this.form.get('parent').setValue(null);
        }
    }

    selectModalidadeDestinacao(modalidadeDestinacao: ModalidadeDestinacao): void {
        if (modalidadeDestinacao) {
            this.form.get('modalidadeDestinacao').setValue(modalidadeDestinacao);
        }
        this.activeCard = 'form';
    }

    showModalidadeDestinacaoGrid(): void {
        this.activeCard = 'modalidade-destinacao-gridsearch';
    }

    selectClassificacao(classificacao: Classificacao): void {
        if (classificacao) {
            this.form.get('parent').setValue(classificacao);
        }
        this.activeCard = 'form';
    }

    showClassificacaoGrid(): void {
        this.activeCard = 'classificacao-gridsearch';
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
