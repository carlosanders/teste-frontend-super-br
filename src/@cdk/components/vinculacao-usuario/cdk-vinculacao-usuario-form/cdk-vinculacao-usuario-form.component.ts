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
import {VinculacaoUsuario} from '@cdk/models/vinculacao-usuario.model';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';

@Component({
    selector: 'cdk-vinculacao-usuario-form',
    templateUrl: './cdk-vinculacao-usuario-form.component.html',
    styleUrls: ['./cdk-vinculacao-usuario-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkVinculacaoUsuarioFormComponent implements OnChanges, OnDestroy, OnInit {

    @Input()
    vinculacaoUsuario: VinculacaoUsuario;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<VinculacaoUsuario>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    usuarioVinculadoPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            usuario: [null],
            usuarioVinculado: [null, [Validators.required]],
            encerraTarefa: [null]
        });

        this.usuarioVinculadoPagination = new Pagination();
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
        if (changes['vinculacaoUsuario'] && this.vinculacaoUsuario && ((!this.vinculacaoUsuario.id && !this.form.dirty)
            || (this.vinculacaoUsuario.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.vinculacaoUsuario});
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

    checkUsuarioVinculado(): void {
        const value = this.form.get('usuarioVinculado').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuarioVinculado').setValue(null);
        }
    }

    selectUsuarioVinculado(usuarioVinculado: Usuario): void {
        if (usuarioVinculado) {
            this.form.get('usuarioVinculado').setValue(usuarioVinculado);
        }
        this.activeCard = 'form';
    }

    showUsuarioVinculadoGrid(): void {
        this.activeCard = 'usuario-vinculado-gridsearch';
    }

    cancel(): void {
        this.activeCard = 'form';
    }
}
