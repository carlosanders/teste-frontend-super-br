import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange
} from '@angular/core';
import {ModalidadeTransicao, Pagination, Processo, Transicao} from '../../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'cdk-realizar-transicao-form',
    templateUrl: './cdk-realizar-transicao-form.component.html',
    styleUrls: ['./cdk-realizar-transicao-form.component.scss']
})
export class CdkRealizarTransicaoFormComponent
    implements OnInit, OnChanges {

    @Input()
    transicao: Transicao;

    @Input()
    processoId: number;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Transicao>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    modalidadeTransicaoPagination: Pagination;

    private processo: Processo;

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {
        this.loadForm();
        this.processoPagination = new Pagination();
        this.modalidadeTransicaoPagination = new Pagination();
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            id: [null],
            processo: [null, [Validators.required]],
            modalidadeTransicao: [null, [Validators.required]],
            metodo: [null, [Validators.required, Validators.maxLength(255)]],
            edital: [null, [Validators.required, Validators.maxLength(255)]],
            observacao: [null, [Validators.maxLength(255)]]
        });
    }

    ngOnInit(): void {
        this.setProcesso();
    }

    setProcesso(): void {
        const processoId = parseInt(String(this.processoId), 10);
        const processo = new Processo();

        processo.id = processoId;
        this.processo = processo;
        this.form.get('processo').setValue(processo);
    }


    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['transicao'] && this.transicao && ((!this.transicao.id && !this.form.dirty) || (this.transicao.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.transicao});
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
            this.saving = true;
        }

    }

    cancel(): void {
        this.activeCard = 'form';
    }

    checkModalidadeTransicao(): void {
        const value = this.form.get('modalidadeTransicao').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeTransicao').setValue(null);
        }
    }

    showModalidadeTransicaoGrid(): void {
        this.activeCard = 'modalidade-transicao-gridsearch';
    }

    selectModalidadeTransicao(modalidadeTransicao: ModalidadeTransicao): void {
        if (modalidadeTransicao) {
            this.form.get('modalidadeTransicao').setValue(modalidadeTransicao);
        }
        this.activeCard = 'form';
    }

}
