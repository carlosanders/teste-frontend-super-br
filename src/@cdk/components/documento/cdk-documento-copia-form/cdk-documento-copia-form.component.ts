import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChange,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Documento, Pagination, Processo} from '@cdk/models';

@Component({
    selector: 'cdk-documento-copia-form',
    templateUrl: './cdk-documento-copia-form.component.html',
    styleUrls: ['./cdk-documento-copia-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkDocumentoCopiaFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    documento: Documento;

    @Input()
    saving: boolean;

    @Input()
    valid = true;

    @Input()
    errors: any;

    @Output()
    save = new EventEmitter<Documento>();

    @Output()
    abort = new EventEmitter<any>();

    form: FormGroup;

    activeCard = 'form';

    @Input()
    processoOrigemPagination: Pagination;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder
    ) {

        this.form = this._formBuilder.group({
            id: [null],
            processoOrigem: [null, [Validators.required]],
        });

        this.processoOrigemPagination = new Pagination();
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
        if (changes['documento'] && this.documento && (!this.documento.id || (this.documento.id !== this.form.get('id').value))) {
            this.form.patchValue({...this.documento});
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

    doAbort(): void {
        this.abort.emit();
    }

    cancel(): void {
        this.activeCard = 'form';
    }

    checkProcessoOrigem(): void {
        const value = this.form.get('processoOrigem').value;
        if (!value || typeof value !== 'object') {
            this.form.get('processoOrigem').setValue(null);
        }
    }

    selectProcesso(processoOrigem: Processo): void {
        if (processoOrigem) {
            this.form.get('processoOrigem').setValue(processoOrigem);
        }
        this.activeCard = 'form';
    }

    showProcessoOrigemGrid(): void {
        this.activeCard = 'processo-destino-gridsearch';
    }
}
