import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy, OnInit,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Juntada} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {Documento} from '@cdk/models';
import {OrigemDados} from '@cdk/models';
import {DocumentoAvulso} from '@cdk/models';
import {Atividade} from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {Volume} from '@cdk/models';

@Component({
    selector: 'cdk-juntada-form',
    templateUrl: './cdk-juntada-form.component.html',
    styleUrls: ['./cdk-juntada-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkJuntadaFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    juntada: Juntada;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Juntada>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    documentoPagination: Pagination;

    @Input()
    origemDadosPagination: Pagination;

    @Input()
    volumePagination: Pagination;

    @Input()
    documentoAvulsoPagination: Pagination;

    @Input()
    atividadePagination: Pagination;

    @Input()
    tarefaPagination: Pagination;

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
            origemDados: [null, [Validators.required]],
            volume: [null, [Validators.required]],
            documentoAvulso: [null, [Validators.required]],
            atividade: [null, [Validators.required]],
            tarefa: [null, [Validators.required]]
        });

        this.documentoPagination = new Pagination();
        this.origemDadosPagination = new Pagination();
        this.volumePagination = new Pagination();
        this.documentoAvulsoPagination = new Pagination();
        this.atividadePagination = new Pagination();
        this.tarefaPagination = new Pagination();
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

    checkOrigemDados(): void {
        const value = this.form.get('origemDados').value;
        if (!value || typeof value !== 'object') {
            this.form.get('origemDados').setValue(null);
        }
    }

    selectOrigemDados(origemDados: OrigemDados): void {
        if (origemDados) {
            this.form.get('origemDados').setValue(origemDados);
        }
        this.activeCard = 'form';
    }

    showOrigemDadosGrid(): void {
        this.activeCard = 'origemDados-gridsearch';
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
}
