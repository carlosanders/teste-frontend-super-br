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
import {Atividade, Documento, DocumentoAvulso, Juntada, Pagination, Tarefa, Volume} from '@cdk/models';

@Component({
    selector: 'cdk-juntada-form',
    templateUrl: './cdk-juntada-form.component.html',
    styleUrls: ['./cdk-juntada-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkJuntadaFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    juntada: Juntada;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    actions: string[] = ['save', 'abort'];

    @Output()
    save = new EventEmitter<Juntada>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    @Input()
    documentoPagination: Pagination;

    @Input()
    volumePagination: Pagination;

    @Input()
    documentoAvulsoPagination: Pagination;

    @Input()
    atividadePagination: Pagination;

    @Input()
    tarefaPagination: Pagination;

    @Input()
    editDescricao = false;

    @Input()
    blocoEdit = {
        blocoEditDescricao: false
    };

    @Input()
    logEntryPagination: Pagination;

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
            numeracaoSequencial: [null],
            documento: [null, [Validators.required]],
            descricao: [null, [Validators.required , Validators.minLength(3), Validators.maxLength(4000)]],
            volume: [null, [Validators.required]],
            documentoAvulso: [null, [Validators.required]],
            atividade: [null, [Validators.required]],
            tarefa: [null, [Validators.required]]
        });

        this.documentoPagination = new Pagination();
        this.volumePagination = new Pagination();
        this.documentoAvulsoPagination = new Pagination();
        this.atividadePagination = new Pagination();
        this.tarefaPagination = new Pagination();
        this.logEntryPagination = new Pagination();
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
        if (changes['juntada'] && this.juntada && ((!this.juntada.id && !this.form.dirty) || (this.juntada.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.juntada});
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

    checkDocumento(): void {
        const value = this.form.get('documento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('documento').setValue(null);
        }
    }

    selectDocumento(documento: Documento): void {
        if (documento) {
            this.form.get('documento').setValue(documento);
        }
        this.activeCard = 'form';
    }

    showDocumentoGrid(): void {
        this.activeCard = 'documento-gridsearch';
    }

    checkVolume(): void {
        const value = this.form.get('volume').value;
        if (!value || typeof value !== 'object') {
            this.form.get('volume').setValue(null);
        }
    }

    showVolumeGrid(): void {
        this.activeCard = 'volume-gridsearch';
    }

    selectVolume(volume: Volume): void {
        if (volume) {
            this.form.get('volume').setValue(volume);
        }
        this.activeCard = 'form';
    }

    checkDocumentoAvulso(): void {
        const value = this.form.get('documentoAvulso').value;
        if (!value || typeof value !== 'object') {
            this.form.get('documentoAvulso').setValue(null);
        }
    }

    showDocumentoAvulsoGrid(): void {
        this.activeCard = 'documento-avulso-gridsearch';
    }

    selectDocumentoAvulso(documentoAvulso: DocumentoAvulso): void {
        if (documentoAvulso) {
            this.form.get('documentoAvulso').setValue(documentoAvulso);
        }
        this.activeCard = 'form';
    }

    checkAtividade(): void {
        const value = this.form.get('atividade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('atividade').setValue(null);
        }
    }

    selectAtividade(atividade: Atividade): void {
        if (atividade) {
            this.form.get('atividade').setValue(atividade);
        }
        this.activeCard = 'form';
    }

    showAtividadeGrid(): void {
        this.activeCard = 'atividade-gridsearch';
    }

    checkTarefa(): void {
        const value = this.form.get('tarefa').value;
        if (!value || typeof value !== 'object') {
            this.form.get('tarefa').setValue(null);
        }
    }

    selectTarefa(tarefa: Tarefa): void {
        if (tarefa) {
            this.form.get('tarefa').setValue(tarefa);
        }
        this.activeCard = 'form';
    }

    showTarefaGrid(): void {
        this.activeCard = 'tarefa-gridsearch';
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
