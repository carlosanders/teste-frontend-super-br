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
import { Repositorio } from '@cdk/models/repositorio.model';
import {Pagination} from '@cdk/models/pagination';
import {ModalidadeRepositorio} from '@cdk/models/modalidade-repositorio.model';

@Component({
    selector: 'cdk-repositorio-form',
    templateUrl: './cdk-repositorio-form.component.html',
    styleUrls: ['./cdk-repositorio-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkRepositorioFormComponent implements OnChanges, OnDestroy {

    @Input()
    repositorio: Repositorio;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Repositorio>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    modalidadeRepositorioPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            'id': [null],
            'ativo': [null],
            'nome': [null, [Validators.required]],
            'modalidadeRepositorio': [null, [Validators.required]],
        });

        this.modalidadeRepositorioPagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['repositorio'] && this.repositorio && (!this.repositorio.id || (this.repositorio.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.repositorio});
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

    checkModalidadeRepositorio(): void {
        const value = this.form.get('modalidadeRepositorio').value;
        if (!value || typeof value !== 'object') {
            this.form.get('modalidadeRepositorio').setValue(null);
        }
    }

    selectModalidadeRepositorio(modalidadeRepositorio: ModalidadeRepositorio): void {
        this.form.get('modalidadeRepositorio').setValue(modalidadeRepositorio);
        this.activeCard = 'form';
    }

    showModalidadeRepositorioGrid(): void {
        this.activeCard = 'modalidade-repositorio-gridsearch';
    }

    submit(): void {
        if (this.form.valid) {
            this.save.emit(this.form.value);
        }
    }

    cancel(): void {
        this.activeCard = 'form';
    }

}
