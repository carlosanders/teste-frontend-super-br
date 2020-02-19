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
import { Localizador } from '@cdk/models/localizador.model';
import {Pagination} from '@cdk/models/pagination';
import {Template} from '@cdk/models/template.model';

@Component({
    selector: 'cdk-localizador-form',
    templateUrl: './cdk-localizador-form.component.html',
    styleUrls: ['./cdk-localizador-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkLocalizadorFormComponent implements OnChanges, OnDestroy {

    @Input()
    localizador: Localizador;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Localizador>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    templatePagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            ativo: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]]

        });

        this.templatePagination = new Pagination();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['localizador'] && this.localizador && (!this.localizador.id || (this.localizador.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.localizador});
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
