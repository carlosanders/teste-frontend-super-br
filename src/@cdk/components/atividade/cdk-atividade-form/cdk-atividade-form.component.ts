import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Atividade } from '@cdk/models/atividade.model';
import { EspecieAtividade } from '@cdk/models/especie-atividade.model';
import {Usuario} from '@cdk/models/usuario.model';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Pagination} from '../../../models/pagination';

@Component({
    selector: 'cdk-atividade-form',
    templateUrl: './cdk-atividade-form.component.html',
    styleUrls: ['./cdk-atividade-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    providers: [
        {
            provide: MAT_DATETIME_FORMATS,
            useValue: {
                display: {
                    dateInput: 'L LT',
                    datetimeInput: 'L LT'
                }
            }
        }
    ]
})
export class CdkAtividadeFormComponent implements OnChanges, OnDestroy {

    @Input()
    atividade: Atividade;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Atividade>();

    @Input()
    especieAtividadePagination: Pagination;

    @Input()
    usuarioPagination: Pagination;

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
            'id': [null],
            'encerraTarefa': [null],
            'especieAtividade': [null, [Validators.required]],
            'dataHoraConclusao': [null, [Validators.required]],
            'usuario': [null, [Validators.required]],
            'observacao': [null, [Validators.maxLength(255)]],
            'documento': [null],
            'tarefa': [null]
        });
        this.especieAtividadePagination = new Pagination();
        this.usuarioPagination = new Pagination();


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['atividade'] && this.atividade && (!this.atividade.id || (this.atividade.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.atividade});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                const fields = Object.keys(data || {});
                fields.forEach((field) => {
                    const control = this.form.get(field);
                    control.setErrors({'formError': data[field].join(' - ')});
                });
            } catch (e) {
                this.form.setErrors({'rulesError': this.errors.error.message});
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

    checkEspecieAtividade(): void {
        const value = this.form.get('especieAtividade').value;
        if (!value || typeof value !== 'object') {
            this.form.get('especieAtividade').setValue(null);
        }
    }

    selectEspecieAtividade(especieAtividade: EspecieAtividade): void {
        if (especieAtividade) {
            this.form.get('especieAtividade').setValue(especieAtividade);
        }
        this.activeCard = 'form';
    }

    showEspecieAtividadeGrid(): void {
        this.activeCard = 'especie-atividade-gridsearch';
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

}
