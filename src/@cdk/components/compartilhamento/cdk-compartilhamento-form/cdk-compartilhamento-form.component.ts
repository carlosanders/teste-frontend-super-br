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
import {FormBuilder, FormGroup} from '@angular/forms';
import {
    Compartilhamento,
    ModalidadeCompartilhamento,
    Pagination,
    Setor,
    Usuario
} from '@cdk/models';

@Component({
    selector: 'cdk-compartilhamento-form',
    templateUrl: './cdk-compartilhamento-form.component.html',
    styleUrls: ['./cdk-compartilhamento-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkCompartilhamentoFormComponent implements OnChanges, OnDestroy {

    @Input()
    compartilhamento: Compartilhamento;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    selected = false;
    selectedSetor = false;


    @Input()
    errors: any;

    @Input()
    usuarioPagination: Pagination;

    @Input()
    setoresPagination: Pagination;

    @Input()
    modalidadeCompartilhamentoPagination: Pagination;

    @Output()
    save = new EventEmitter<Compartilhamento>();

    @Output()
    abort = new EventEmitter<any>();

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
            processo: [null],
            tarefa: [null],
            usuario: [null],
            setor: [null],
            modalidadeCompartilhamento: [null]
        });
        this.usuarioPagination = new Pagination();
        this.setoresPagination = new Pagination();
        this.modalidadeCompartilhamentoPagination = new Pagination();

        this.form.get('usuario').valueChanges.subscribe((valor) => {
            this.selected = typeof valor === 'object';
        });
        this.form.get('setor').valueChanges.subscribe((valor) => {
            this.selectedSetor = typeof valor === 'object';
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['compartilhamento'] && this.compartilhamento && ((!this.compartilhamento.id && !this.form.dirty) || (this.compartilhamento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.compartilhamento});
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

    checkUsuario(): void {
        const value = this.form.get('usuario').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuario').setValue(null);
        }
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuario').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    checkModalidadeCompartilhamento(): void {
        const value = this.form.get('modalidadeCompartilhamento').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeCompartilhamento').setValue(null);
        }
    }

    selectModalidadeCompartilhamento(modalidadeCompartilhamento: ModalidadeCompartilhamento): void {
        if (modalidadeCompartilhamento) {
            this.form.get('modalidadeCompartilhamento').setValue(modalidadeCompartilhamento);
        }
        this.activeCard = 'form';
    }

    showModalidadeCompartilhamentoGrid(): void {
        this.activeCard = 'modalidade-compartilhamento-gridsearch';
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
}
