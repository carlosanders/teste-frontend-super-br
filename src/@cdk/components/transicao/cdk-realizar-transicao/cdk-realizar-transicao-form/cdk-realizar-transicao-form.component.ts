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
import {ModalidadeTransicao, Pagination, Processo, Transicao} from '../../../../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {cdkAnimations} from '../../../../animations';

@Component({
    selector: 'cdk-realizar-transicao-form',
    templateUrl: './cdk-realizar-transicao-form.component.html',
    styleUrls: ['./cdk-realizar-transicao-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkRealizarTransicaoFormComponent
    implements OnInit, OnChanges {

    @Input()
    transicao: Transicao;

    @Input()
    processo: Processo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    mode = 'regular';

    @Output()
    save = new EventEmitter<Transicao>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoPagination: Pagination;

    @Input()
    modalidadeTransicao: ModalidadeTransicao;

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
    }

    loadForm(): void {
        this.form = this._formBuilder.group({
            id: [null],
            processo: [null, [Validators.required]],
            modalidadeTransicao: [null, [Validators.required]],
            metodo: [null, [Validators.required, Validators.maxLength(255)]],
            edital: [null, [Validators.maxLength(255)]],
            observacao: [null, [Validators.maxLength(255)]]
        });
    }

    ngOnInit(): void {
        if (this.mode !== 'bloco') {
            this.form.get('processo').enable();
        } else {
            this.form.get('processo').disable();
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['processo'] && this.processo && ((!this.processo.id && !this.form.dirty) || (this.processo.id !== this.form.get('processo').value?.id))) {
            this.form.get('processo').setValue(this.processo);
        }
        if (changes['modalidadeTransicao'] && this.modalidadeTransicao) {
            this.form.get('modalidadeTransicao').setValue(this.modalidadeTransicao);
            if (this.modalidadeTransicao.valor === 'ELIMINAÇÃO') {
                this.form.get('edital').setValidators([Validators.required, Validators.maxLength(255)]);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
