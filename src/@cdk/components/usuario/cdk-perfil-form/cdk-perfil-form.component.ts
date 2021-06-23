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
import {Usuario} from '@cdk/models';

@Component({
    selector: 'cdk-perfil-form',
    templateUrl: './cdk-perfil-form.component.html',
    styleUrls: ['./cdk-perfil-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkPerfilFormComponent implements OnChanges, OnDestroy {

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

    @Output()
    uploadImagemPerfilHandler = new EventEmitter();

    @Output()
    uploadImagemChancelaHandler = new EventEmitter();

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
            username: [null, [Validators.required, Validators.maxLength(255)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
            cargo: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeColaborador: [null, [Validators.required, Validators.maxLength(255)]],
            assinaturaHTML: [null, [Validators.required]],
            imgPerfil: [null],
            imgChancela: [null]
        });
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
                cargo: this.usuario.colaborador?.cargo.nome,
                modalidadeColaborador: this.usuario.colaborador?.modalidadeColaborador.valor,
                assinaturaHTML: this.usuario.assinaturaHTML
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
            this.save.emit({
                    assinaturaHTML: this.form.value.assinaturaHTML
                }
            );
        }
    }

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    doUploadImagemPerfil(): void
    {
        this.uploadImagemPerfilHandler.emit();
    }

    doUploadImagemChancela(): void
    {
        this.uploadImagemChancelaHandler.emit();
    }

}
