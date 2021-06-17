import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Classificacao, Lembrete, Pagination, Processo} from '../../../models';
import {cdkAnimations} from '../../../animations';

@Component({
    selector: 'cdk-processo-arquivista-form',
    templateUrl: './cdk-processo-arquivista-form.component.html',
    styleUrls: ['./cdk-processo-arquivista-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkProcesssoArquivistaFormComponent implements OnInit, OnChanges {

    activeCard = 'form';
    form: FormGroup;

    @Input()
    processo: Processo;

    @Input()
    _classificacaoPagination: Pagination;

    @Input()
    logEntryPagination: Pagination;

    @Input()
    saving: boolean;

    @Input()
    valid: boolean = true;

    @Input()
    blocoEdit = {
        blocoEditClassificacao: false,
        blocoEditDataHoraProximaTransicao: false,
        blocoEditLembrete: false
    };

    @Input()
    mode = 'regular';

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Lembrete>();

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    loading: boolean;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.form = this._formBuilder.group({
            id: [null],
            dataHoraProximaTransicao: [null],
            classificacao: [null, [Validators.required]],
            lembreteArquivista: [null]
        });
        this._classificacaoPagination = new Pagination();
        this.logEntryPagination = new Pagination();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    ngOnInit(): void {
        if (this.mode === 'bloco-edit') {
            this.form.get('classificacao').disable();
            this.form.get('dataHoraProximaTransicao').disable();
            this.form.get('lembreteArquivista').disable();
        }
        if (this.blocoEdit.blocoEditClassificacao) {
            this.form.get('classificacao').enable();
        }
        if (this.blocoEdit.blocoEditDataHoraProximaTransicao) {
            this.form.get('dataHoraProximaTransicao').enable();
        }
        if (this.blocoEdit.blocoEditLembrete) {
            this.form.get('lembreteArquivista').enable();
        }
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

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['processo'] && this.processo && ((!this.processo.id && !this.form.dirty) || (this.processo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.processo});
            if (this.processo) {
                this.form.get('classificacao').setValidators(Validators.required);
                this.form.get('classificacao').setErrors(null);
            }
        }

        if (changes['blocoEdit']) {
            if (this.blocoEdit.blocoEditClassificacao) {
                this.form.get('classificacao').enable();
            } else {
                this.form.get('classificacao').disable();
            }
            if (this.blocoEdit.blocoEditDataHoraProximaTransicao) {
                this.form.get('dataHoraProximaTransicao').enable();
            } else {
                this.form.get('dataHoraProximaTransicao').disable();
            }
            if (this.blocoEdit.blocoEditLembrete) {
                this.form.get('lembreteArquivista').enable();
            } else {
                this.form.get('lembreteArquivista').disable();
            }
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

    checkClassificacao(): void {
        const value = this.form.get('classificacao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('classificacao').setValue(null);
        }
    }

    selectClassificacao(classificacao: Classificacao): void {
        if (classificacao) {
            this.form.get('classificacao').setValue(classificacao);
        }
        this.activeCard = 'form';
    }

    showClassificacaoGrid(): void {
        this.activeCard = 'classificacao-gridsearch';
    }

    showClassificacaoTree(): void {
        this.activeCard = 'classificacao-grid-tree';
    }

    showLogEntryGrid(target: string): void {
        const campo = {target: target};
        Object.assign(this.logEntryPagination.filter, campo);
        this.activeCard = 'logentry-gridsearch';
    }
}
