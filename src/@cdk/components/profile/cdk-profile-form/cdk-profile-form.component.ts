import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter, Input, OnChanges,
    OnDestroy,
    Output, SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Colaborador} from '@cdk/models/colaborador.model';

@Component({
    selector: 'cdk-profile-form',
    templateUrl: './cdk-profile-form.component.html',
    styleUrls: ['./cdk-profile-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkProfileFormComponent implements OnChanges, OnDestroy {

    @Input()
    colaborador: Colaborador;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Colaborador>();

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
            'username': [null],
            'nome': [null],
            'email': [null],
            'cargo': [null],
            'modalidadeColaborador': [null],
            'trocaSenha': [null],
            'password': [null, [Validators.required]],
            'password2': [null, [Validators.required]],
            'assinaturaHTML': [null, [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['colaborador'] && this.colaborador && ((!this.colaborador.id && !this.form.dirty) || (this.colaborador.id !== this.form.get('id').value))) {
            this.form.patchValue({
                'id': this.colaborador.id,
                'username': this.colaborador.usuario.username,
                'nome': this.colaborador.usuario.nome,
                'email': this.colaborador.usuario.email,
                'cargo': this.colaborador.cargo.nome,
                'modalidadeColaborador': this.colaborador.modalidadeColaborador.valor,
                'trocaSenha': false,
                'password': null,
                'password2': null,
                'assinaturaHTML': this.colaborador.usuario.assinaturaHTML
            });
        }

        if (this.errors && this.errors.status && this.errors.status === 422) {
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

    cancel(): void {
        this.activeCard = 'form';
    }

}
