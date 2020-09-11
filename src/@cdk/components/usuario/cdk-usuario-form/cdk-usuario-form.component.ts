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
import {Pagination, Usuario} from '@cdk/models';

@Component({
    selector: 'cdk-usuario-form',
    templateUrl: './cdk-usuario-form.component.html',
    styleUrls: ['./cdk-usuario-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkUsuarioFormComponent implements OnChanges, OnDestroy {

    @Input()
    usuario: Usuario;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<any>();

    @Output()
    abort = new EventEmitter<any>();

    @Input()
    form: FormGroup;

    activeCard = 'form';

    @Input()
    usuarioExterno = false;

    @Input()
    usuarioPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            username: [null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
            nivelAcesso: [0, [Validators.required, Validators.maxLength(2), Validators.max(4)]],
            enabled: [null],
            validado: [null],
            usuarioAux: [null]
        });

        this.usuarioPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['usuario'] && this.usuario && ((!this.usuario.id && !this.form.dirty) || (this.usuario.id !== this.form.get('id').value))) {
            this.form.patchValue({
                id: this.usuario.id,
                username: this.usuario.username,
                nome: this.usuario.nome,
                email: this.usuario.email,
                nivelAcesso: this.usuario.nivelAcesso,
                enabled: this.usuario.enabled,
                validado: this.usuario.validado
            });
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

    cancel(): void {
        this.activeCard = 'form';
    }

    // selectUsuario(usuario: Usuario): void {
    //     console.log('****selectUsuario', usuario);
    //     if (usuario) {
    //         console.log('****selectUsuario', usuario);
    //         this.form.get('usuario').setValue(usuario);
    //     }
    //     this.activeCard = 'form';
    // }
    //
    // showUsuarioGrid(): void {
    //     this.activeCard = 'usuario-gridsearch';
    // }
    //
    // checkUsuario(): void {
    //     const value = this.form.get('username').value;
    //     console.log('checkUsuario', value);
    //     console.log('Pagination', this.usuarioPagination);
    //     if (!value && value.trim().length==0) {
    //         console.log('checkUsuariotop IF', value);
    //         this.form.get('username').setValue(null);
    //     }
    // }


    checkUsuario(): void {
        const value = this.form.get('usuarioAux').value;
        if (!value || typeof value !== 'object') {
            this.form.get('usuarioAux').setValue(null);
        }
    }

    selectUsuario(usuario: Usuario): void {
        if (usuario) {
            this.form.get('usuarioAux').setValue(usuario);
        }
        this.activeCard = 'form';
    }

    showUsuarioGrid(): void {
        this.activeCard = 'usuario-gridsearch';
    }
}
