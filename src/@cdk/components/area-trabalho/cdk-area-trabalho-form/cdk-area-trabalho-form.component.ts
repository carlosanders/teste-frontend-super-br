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
import {AreaTrabalho} from '@cdk/models/area-trabalho.model';
import {Usuario} from '@cdk/models/usuario.model';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-area-trabalho-form',
    templateUrl: './cdk-area-trabalho-form.component.html',
    styleUrls: ['./cdk-area-trabalho-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkAreaTrabalhoFormComponent implements OnChanges, OnDestroy {

    @Input()
    areaTrabalho: AreaTrabalho;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Input()
    usuarioPagination: Pagination;

    @Output()
    save = new EventEmitter<AreaTrabalho>();

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
            usuario: [null, [Validators.required]],
            dono: [null, [Validators.required]],
            documento: [null, [Validators.required]]
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
        if (changes['areaTrabalho'] && this.areaTrabalho && ((!this.areaTrabalho.id && !this.form.dirty) || (this.areaTrabalho.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.areaTrabalho});
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
