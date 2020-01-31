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
import {Processo} from '@cdk/models/processo.model';
import {MAT_DATETIME_FORMATS} from '@mat-datetimepicker/core';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-processo-aproveitar-dados-form',
    templateUrl: './cdk-processo-aproveitar-dados-form.component.html',
    styleUrls: ['./cdk-processo-aproveitar-dados-form.component.scss'],
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
export class CdkProcessoAproveitarDadosFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    processo: Processo;

    @Input()
    saving: boolean;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Processo>();

    @Input()
    processoPagination: Pagination;

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
            processoOrigem: [null, Validators.maxLength(21)],
        });
        this.processoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
 
    ngOnInit(): void {
         this.form.get('processoOrigem').enable();
    }

    /**
     * On change
     */
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['processo'] && this.processo && (!this.processo.id || (this.processo.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.processo});
        }

        if (this.errors && this.errors.status && (this.errors.status === 400 || this.errors.status === 422)) {
            try {
                const data = JSON.parse(this.errors.error.message);
                data.forEach((field) => {
                    const control = this.form.get(field.propertyPath);
                    control.setErrors({formError: data.message});
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
    checkProcesso(): void {
        const value = this.form.get('processoOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processoOrigem').setValue(null);
        }
    }

    showProcessoGrid(): void {
        this.activeCard = 'processo-gridsearch';
    }

    selectProcesso(processo: Processo): void {
        if (processo) {
            this.form.get('processoOrigem').setValue(processo);
        }
        this.activeCard = 'form';
    }

    cancel(): void {
        this.activeCard = 'form';
    }


}
